// ############################################## //
// ############### - Confession - ############### //
// ############################################## //

require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const User = require("./models/user");
const port = process.env.PORT || 8080;
const app = express();

app.use(cors({origin: ['http://localhost:4200'], credentials: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./dist/confessions-manager"));

// ################ ROUTERS ################# //

const confessions = require("./routes/confessions");
const login = require("./routes/login");

// ################## API ################### //

app.use("/login", login);
app.use("/confessions", confessions);
app.get("/app", (req, res, next) => { res.send({name: process.env.APP_NAME})});
app.get("/*", (req, res, next) => { res.sendFile("index.html", { root: "dist/confessions-manager/" })});
app.use((err, req, res, next) => {
  console.error("Handled", err);
  res.status(500).send({ message: "Something went wrong", status: "failed" });
});

// ############# Start Server ############### //

mongoose.connect(process.env.DB_URI).then(
  () => {
    app.listen(port, err => {
      err ? console.error(err) : console.log("Server is up, Port: " + port);
      User.find().then(res => {
          if(res.length === 0){
              User.create({username:'admin', password: process.env.ADMIN_PASSWORD});
          }
      })
    });
  },
  err => {
    console.error("err", err);
  }
);

