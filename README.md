# Project Management API

A backend API for managing users, projects, and tasks. This app handles user authentication using JWTs, stores data in MongoDB, and enforces authorization rules ensuring users can only access their own data. Users own projects, and projects have tasks. Each user can only access their own tasks by logging in.

## Features

* **User Authentication**: Secure registration and login are implemented using bcrypt for password hashing and JSON Web Tokens for session management. An additional layer of protection is added through token invalidation after logout. When a user logs out, their token is stored in an invalid-token list in the database, ensuring that even if an attacker obtains the token, it can no longer be used. Each invalid token entry automatically expires based on the token’s lifespan.
* **Modular Design**: Clean architecture separating concerns into routes, models, and configuration.
* **Full CRUD Operations**: Complete functionality for creating, reading, updating, and deleting projects and tasks.
* **Strict Authorization**: All project and task routes are protected, verifying ownership before allowing access or modification.
* **Environment Configuration**: Uses dotenv to manage sensitive environment variables securely, such as JWT secret, PORT number, and base URL.

## Routes 

| Method | Path | Action |
| --- | --- | --- |
| POST | /api/users/login | logs in the user and returns token |
| POST | /api/users/register | registers a new user using email, username, and password |
| POST | /api/users/logout | stores the user’s token in the invalid-token storage for future validation checks
| POST | /api/projects | creates a new project |
| GET | /api/projects | gets all projects owned by the currently logged-in user. |
| GET | /api/projects/:id | gets a single project by its ID |
| PUT | /api/projects/:id | updates a project |
| DELETE | /api/projects/:id | deletes a project |
| POST | /api/projects/:projectId/tasks | creates a new task for a specific project |
| GET | /api/projects/:projectId/tasks | gets all tasks for a specific project |
| PUT | /api/tasks/:taskId | updates a single task |
| DELETE | /api/tasks/:taskId | deletes a single task |

## Setting up and Running Locally 

Clone the project and install dependencies by running the following commands:

```
git clone https://github.com/Aram-1999/pro-tasker-backend.git <project_name>
cd <project_name>
npm i
```
Create a .env file and set up the following variables: 
```
MONGO_URI=<a link to the MongoDB database>
JWT_SECRET=<any string>
PORT=<a port number, such as 4000>
FRONTEND_URL=<frontend URL such as http://localhost:5173>
```
Finally, run the server from the terminal:
```
npm run dev
```
