# Online-Judge | Online-Coding-Platform (MERN-Based Website)

## Description
**Online-Judge** is a platform that securely runs and compiles user-submitted code for programming problems. It judges whether the code is correct or incorrect, allowing users to track their submissions through a leaderboard and submission history.

## 🌍 Live Demo
Check out the live version of my portfolio:
👉 **[Live Demo](https://onlinejudge.sayedamin.in/)**

![Online Judge Preview](public/onlinejudge.png)

### Features:
- **Secure Code Execution**: Runs and compiles code using Docker and Sandboxing techniques to ensure a safe environment.
- **Handles Multiple Requests**: Utilizes Polling and Queue systems to manage multiple user requests efficiently.
- **Scalability**: Horizontally scalable to handle a growing number of users and submissions.

## How to Run the Project Locally

### 1. **Client Side (React: Vite)**

   - Navigate to the `OnlineJudgeFrontend` directory:
     ```bash
     cd OnlineJudgeFrontend
     ```
   - Install all dependencies:
     ```bash
     npm install
     ```
   - Start the OnlineJudgeBackend (React app) on **PORT 5137**:
     ```bash
     npm start
     ```
   - Frontend repository: [OnlineJudgeFrontend](https://github.com/sayed-amin/OnlineJudgeFrontend)

### 2. **Server Side (Node.js with Docker and Redis)**

   - Navigate to the `OnlineJudgeFrontend` directory:
     ```bash
     cd OnlineJudgeFrontend
     ```
   - Install all dependencies:
     ```bash
     npm install
     ```
   - Backend repository: [OnlineJudgeBackend](https://github.com/sayed-amin/OnlineJudgeBackend)

### 3. **Required Tools:**
   - **Docker** and **Redis** (version >= 2.8.18)
   - **WSL** (Windows Subsystem for Linux) for running Redis-server on Windows
   - **Docker-Desktop** for Docker usage on Windows
   - **MongoDB** (local or MongoDB Atlas)

### 4. **Environment Variables:**
   
   - If you're using **MongoDB Atlas**, create a `.env` file in the `server` directory and define the following:
     ```env
     DB_URL=<your-atlas-url>
     JWT_SECRET=<your-jwt-secret>
     ```

   - If you're using **local MongoDB**, there's no need to set `DB_URL`.

### 5. **Run the Server:**
   
   After setting up the `.env` file and installing dependencies, start the server:
   ```bash
   npm start
