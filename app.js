const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
   });

app.post("/",function(req,res){
    // console.log(req.body.cityName);
    
   const query=req.body.cityName;
   const apiKey="62f41d711dd38f3e2b7f3cbb2d1f1375";
   const unit="metric";
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
   https.get(url,function(response){
      console.log(response.statusCode);
      
      response.on("data",function(data){
     const weatherData=JSON.parse(data);
     const temp=weatherData.main.temp;
     const waeatherIcon=weatherData.weather[0].icon;
     const tempMin=weatherData.main.temp_min;
     const tempMax=weatherData.main.temp_max;
     const feelsLike=weatherData.main.feels_like;

     const imageURL=" https://openweathermap.org/img/wn/"+waeatherIcon+"@2x.png";

     const weatherDiscription=weatherData.weather[0].description;

   //  const image="https://www.w3schools.com/bootcamp/assets/map.png";
     
      res.write("<p align='center'><span style='color: white'>weather is currently "+weatherDiscription+"</span></p>");
      res.write("<center><h1><span style='color: white'>The temperature in "+query+" is "+ temp +" &deg;C</span></h1></center>");
      res.write("<style> body { background-image: url('https://cdn.pixabay.com/photo/2013/11/09/20/22/clouds-208000_1280.jpg');}</style>");
      res.write("<center><img src="+imageURL+"></center>");
      res.write("<center><h2><span style='color: white'> Min temperature: "+tempMin+" &deg;C</span></h2></center>");
      res.write("<center><h2><span style='color: white'> Max temperature: "+tempMax+" &deg;C</span></h2></center>");
      res.write("<center><h2><span style='color: white'>Temperature feels like: "+feelsLike+" &deg;C</span></h2></center>")
      res.send();   
   
   //  weatherData.style.textAlign = "center";
   


      
   });

  
   }) ;
   // res.send("server is up and running.")

});

// app.post("/",function(req,res){
//     console.log("Post request recieved");
// })



   // res.send("server is up and running.")










app.listen(3000,function(){
    console.log("Server is running on port 3000");
})












