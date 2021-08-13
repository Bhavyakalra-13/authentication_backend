const express = require("express");
const mongoose = require("mongoose");
const app = express();
import bodyParser from 'body-parser';
const authenticationroutes = require("./routes/auth.js");
const cors = require('cors')

// endpoints to test
// http://localhost:8080/signup
// http://localhost:8080/signin

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db connection
mongoose
  .connect("mongodb+srv://Bhavya_13:Bhavya13@bhavya-cluster.ahfee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch(() => {
    console.log("NOT CONNECTED TO DB");
  });

// middlewares
app.use(express.json());

// My Routes
app.use(authenticationroutes);

const port = process.env.PORT || 5000;

// starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
