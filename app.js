const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const {
  wordsRouter,
  authRouter,
  statisticsRouter,
  sendMessageRouter,
} = require("./routes");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/words", wordsRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/send", sendMessageRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
