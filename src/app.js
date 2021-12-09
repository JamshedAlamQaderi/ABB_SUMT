require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./router/api");
const app = express();

//app.use(cors({ origin: "http://localhost:4200", optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public/frontend"));
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: 'public/frontend' });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server started at (port " + process.env.SERVER_PORT + ")...");
});
