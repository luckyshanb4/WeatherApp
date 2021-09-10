const express = require("express");
const process=require('./models/weatherHandle')
const app = express();

const userRoute=require('./controllers/routeManager')

process.setInterval;

app.use('/',userRoute);


app.listen(3000, function() {
    console.log("Server started successfully");
   });