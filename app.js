const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authenticationroutes = require("./routes/auth.js");
var cors = require('cors')

// endpoints to test
// http://localhost:8080/signup
// http://localhost:8080/signin

app.use(cors())

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

const port = 5000;

// starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
