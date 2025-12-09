const jwt = require("jsonwebtoken");
const InvalidToken = require("../models/InvalidToken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const expiration = "24h";
async function authMiddleware(req, res, next) {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body?.token || req.query?.token || req.headers?.authorization;
  // We split the token string into an array and return actual token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: "No token found!" });
  }
  // If token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  try {
    const { data, jti } = jwt.verify(token, secret, { maxAge: expiration });

    if (!data) {
      return res.status(401).json({ message: "No access granted!" });
    }

    const invalidToken = await InvalidToken.findOne({tokenId: jti});
    if (invalidToken) {
      return res
        .status(401)
        .json({ message: "You have been signed out. Please sign back in!" });
    }

    req.user = data;
    req.jti = jti;
    next();
  } catch {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token" });
  }
}

// A middleware to check for admin role
function adminOnly(req, res, next) {
  console.log(req.user);
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}

module.exports = {
  authMiddleware,
  adminOnly,
};
