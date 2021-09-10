require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true});

//weather schema
const weatherSchema = new mongoose.Schema ({
    dateTime:String,
    humidity:Number,
    temperature:Number,
    min_temperature:Number,
    max_temperature:Number
    
  });

  const WeatherData = new mongoose.model("WeatherData", weatherSchema);

  module.exports = {
    addData: function(data) {
      const newData=new WeatherData({

        dateTime:new Date().toLocaleString(),
        humidity:data.humidity,
        temperature:data.temperature,
        min_temperature:data.min_temperature,
        max_temperature:data.max_temperature
      });
  
      //save new weather data
      newData.save();
    },
    getModel:WeatherData
};
