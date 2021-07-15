require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyPArser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.use(bodyPArser({ extended: false }));
app.use(cors());
app.use(express.static("public"));

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId(),
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      refs: "Exercise",
    },
  ],
});
const User = mongoose.model("User", userSchema);

const exerciseSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

app
  .route("/api/users")
  .post((req, res) => {
    let userName = req.body.username;
    res.json({ username: userName, _id: "fwecghnczlmokjmo" });
  })
  .get((req, res) => {
    res.json({});
  });

app.route("/api/users/:id/exercises").post((req, res) => {
  let userId = req.params.id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date || new Date();
  res.json({});
});

app.get("/api/users/:id/logs", (req, res) => {
  let userId = req.params.id;
  res.json({});
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
