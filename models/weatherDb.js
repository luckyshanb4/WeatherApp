require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true});

//weather schema
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
  
      //save new weather data
      newData.save();
    },
    getData: async()=> {
      // Empty `filter` means "match all documents"
      const filter = {};
      const all = await WeatherData.find(filter);
      console.log(all);
      return all;
    },
};
