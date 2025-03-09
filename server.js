import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import color from "colors";
import gitRouter from "./routes/index.routes.js";
const app = express();


app.use(morgan("dev"));
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

color.setTheme({
    info: "green",
    warn: "yellow",
    db: "bgYellow",
    error: "bgRed",
    debug: "blue",
    connected: "bgCyan",
});

app.use("/github",gitRouter)

app.get("/", (req, res) => {
    try {
        const message = "Welcome to the Cacto Github API 🚀";
        res.status(200).json({ id: 1, environment: process.env.NODE_ENV, message });
    } catch (error) {
        res.status(500).json({ id: 0, message: "Server Temporarily Down" });
    }
});

export default app;