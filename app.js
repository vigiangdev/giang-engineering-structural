const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.enable("trust proxy");
app.disable("x-powered-by");

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const emailRouter = require("./routes/emailRouter");

app.use("/api/v1/mail", emailRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public/`));
  app.get(/.*/, (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
}

module.exports = app;
