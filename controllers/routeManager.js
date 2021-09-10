require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyparser = require('body-parser');

const User = require("../models/userDb");
const auth = require("../middleware/auth");
const weatherDB= require("../models/weatherDb");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));



app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password )) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
        email: email,
      password: encryptedPassword
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user.save();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      user.save();

      // user
      res.status(200).json(user);
    }
  else{
    res.status(400).send("Invalid Credentials");
  }
    
  } catch (err) {
    console.log(err);
  }
});

//after authentication, acces to weather data
app.get("/weatherdata", auth, (req, res) => {
  res.status(200).send(weatherDB.getData());
});



module.exports = app;
