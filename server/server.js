const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
const logger = require("morgan");
const router = require("express").Router();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const db = require("./config/config").get(process.env.NODE_ENV);

const _class = require("./routes/class");
const teacher = require("./routes/teacherSignup");
const student = require("./routes/studentSignup");
const order = require("./routes/order");
const notification = require("./routes/notification");
const review = require("./routes/review");
const chat = require("./routes/chat");
const schedule = require("./routes/schedule");

const app = express();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const directory = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(directory));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  },
);

app.use("/class", _class);
app.use("/teacher", teacher);
app.use("/student", student);
app.use("/order", order);
app.use("/notification", notification);
app.use("/review", review);
app.use("/chat", chat);
app.use("/schedule", schedule);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html"),
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
