const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/weatherDB", {useNewUrlParser: true});


const weatherSchema = new mongoose.Schema ({
    dateTime:String,
    humidity:Number,
    temperature:Number,
    min_tenperature:Number,
    max_tenperature:Number
    
  });

  const WeatherData = new mongoose.model("WeatherData", weatherSchema);

  module.exports = {
    addData: function(data) {
      const newData=new WeatherData({

        dateTime:new Date().toLocaleString(),
        humidity:data.humidity,
        temperature:data.temperature,
        min_tenperature:data.min_tenperature,
        max_tenperature:data.max_tenperature
      });
  
      newData.save();
    },
    // otherMethod: function() {},
};
