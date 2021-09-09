const express = require("express");
const process=require('./models/process')
const app = express();

const userRoute=require('./routes/User')
app.use('/user',userRoute)


process.setInterval;


app.listen(3000, function() {
    console.log("Server started successfully");
   });