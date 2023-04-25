const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const wordsRouter = require("./routes/api/wordsRoute");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://learn-english-words-api.onrender.com/api",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/words", wordsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
