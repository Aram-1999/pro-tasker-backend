const User = require("../models/User");
const jwt = require("jsonwebtoken");
const InvalidToken = require("../models/InvalidToken");

async function getAllUsers(req, res) {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "You must be logged in to see this!" });
  }
  const users = await User.find();
  res.json(users);
}

function getUserById(req, res) {
  res.send(`Data for user: ${req.params.id}`);
}

async function registerUser(req, res) {
  try {
    const dbUser = await User.findOne({ email: req.body.email });
    if (dbUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const passwordMatched = await dbUser.isCorrectPassword(password);
    if (!passwordMatched) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const payload = {
      _id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
    };

    const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, {
      expiresIn: "24h", jwtid: crypto.randomUUID()
    });

    res.json({ token, username: dbUser.username, email: dbUser.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const logoutUser = async (req, res) => {
  try {
    if (req.user) {
      const tokenId = await InvalidToken.create({tokenId: req.jti});
      res.json({ message: "Successfully signed out!" });
    } else {
      res.status(400).json({ message: "You are not signed in!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
};
