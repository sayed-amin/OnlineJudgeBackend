const { dateTimeNowFormated, logger } = require('./utils/logging');

// If not in production
if (process.env.NODE_ENV !== "production" || process.env.CONTAINERIZED === "true") {
    require('dotenv').config(); // .env file variables -> process.env
}
logger.log(`In ${process.env.NODE_ENV} env !`);

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const explore = require('./routes/explore');
const user = require('./routes/user');
const notes = require('./routes/notes');
const path = require('path');
const http = require('http');
const experimental = require('./routes/experimental');
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require('hpp');
const rateLimit = require("express-rate-limit");
const { connectDB } = require('./DataBase/connectDB');
const { Socket } = require('./socketHandler');
const questions = require('./routes/questions'); 
const codeExecutorDir = `./CodeExecuter/codeExecutor${(process.env.NO_DOCKER ? "_nodockerv" : "_dockerv")}`;
const { initAllDockerContainers } = require(codeExecutorDir);

// Establish Connection to Database
connectDB();
// Initiate All Docker Containers
initAllDockerContainers();

// parse json request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(cors({ origin: true, credentials: true }));
app.use(mongoSanitize());
app.use(hpp());
app.use(helmet());
app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 500
}));

// creating a http server
const server = http.createServer(app);
// setup socket connection
Socket.registerSocketServer(server);


// api route to get questions and verdicts
app.use('/api/explore', explore);

// api route to get and post notes
app.use('/api/notes', notes);

// api route for user login and register
app.use('/api/user', user);

// api to add questions
app.use('/api/questions', questions);

// experimental routes
app.use('/api/experimental', experimental);
// Serve Static Assets In Production
// if (process.env.NODE_ENV === "production") {
// Set Static Folder
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);
// }

const port = process.env.PORT || 8080;
server.listen(port, () => {
    logger.log(`Server running on PORT ${port}`, dateTimeNowFormated());
});
