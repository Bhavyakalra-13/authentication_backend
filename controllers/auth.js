const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
   console.log("REQ BODY", req.body);
  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "failed to register try again",
      });
    }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
  
    res.json({
      id: user._id,
      email: user.email,
      password: user.password,
    });
  });
};

exports.signin = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    const checkPassword = await bcrypt.compare(body.password, user.password);
    if (checkPassword) {
      res.status(200).json({
        message: "Login successful",
      });
    } else {
      res.status(400).json({ error: "Check your password again" });
    }
  } else {
    res.status(401).json({ error: "Not registered yet" });
  }
};


