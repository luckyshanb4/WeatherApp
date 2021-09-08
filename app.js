const express = require("express");
const app = express();

const userRoute=require('./routes/User')
app.use('/user',userRoute)









app.listen(3000, function() {
    console.log("Server started successfully");
   });