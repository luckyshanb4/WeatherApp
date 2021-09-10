const axios = require('axios');
const dbOperations =require("./weatherDb");

     function getData() {      
            axios.get("http://demo4567044.mockable.io/weather",  { crossdomain: true }).then(response => {         
                let weather = response.data;
               
                //add to weather db
                dbOperations.addData(weather);
                          
              }) .catch(function (error) {
                console.log('Error ' + error.message)
              }) ;
    
      }
      
      setInterval(getData, 10000);
    module.exports = setInterval;
    