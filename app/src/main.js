const express = require("express");
const bodyParser = require("body-parser");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const tourismRouter = require("./tourism/tourism");
const authRouter = require("../auth/auth_router");

const dotenv = require("dotenv");

dotenv.config({
    path: "./env",
});

const app = express();

const rateLimiter = new RateLimiterMemory({
    points: 100, // Number of requests allowed
    duration: 1, // Per 1 second
});

// CORS middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use your routers
app.use("/tourism", tourismRouter);
// app.use("/users", usersRouter);

// Rate limiter middleware
app.use(async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip); // Adjust this based on your rate limiting needs
        next();
    } catch (error) {
        res.status(429).send("Rate limit exceeded");
    }
});

// Start the Express server
const port = process.env.PORT || 3000; // You can set your preferred port
app.listen(port, () => {});
