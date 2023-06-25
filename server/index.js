const express = require("express");
const mongoose = require("mongoose");
const contacts = require("./routes/contacts");
const cors = require("cors");

const app = express();

// i've used mongoDB instead of a json file (fs,path)

mongoose.connect("mongodb://127.0.0.1:27017/contacts", {
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(cors());

app.use("/api/contacts", contacts);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Connected on ${port}`));

module.exports = server;
