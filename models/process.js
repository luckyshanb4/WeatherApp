const express = require("express");
const axios = require('axios');
const dbOperations =require("./dbOperations");

     function getData() {
        
        
            axios.get("http://localhost:5000/",  { crossdomain: true }).then(response => {
                  
                       
                let weather = response.data;
                console.log(weather);

                dbOperations.addData(weather);
                
               
              }) .catch(function (error) {
                console.log('Error ' + error.message)
              }) ;


              

            
      }
      
      setInterval(getData, 10000);
      

    module.exports = setInterval;
    