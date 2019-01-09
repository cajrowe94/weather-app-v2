//http://api.openweathermap.org/data/2.5/weather?lat=40.9874513&lon=-86.2867407
//open weather API url
let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?'; //add lat={lat}&lon={lon} onto end to get weather
//apiKey
const key = '3abbc520bb52503aacaac2323c78cc4f';

//latitude and longitude variables
let lat;
let lon;
//holds weather data
let localWeather = {};
//coordinates for around the world cities
let londonCoords = {id: 2643743, lati:51.507351, long:-0.127758, data:{}};
let capetownCoords = {id: 3369157, lati:-33.924870, long:18.424055, data:{}};
let berlinCoords = {id: 6545310, lati:52.520008, long:13.404954, data:{}};
let beijingCoords = {id: 2038349, lati:39.904202, long:116.407394, data:{}};
let guatemalacityCoords = {id: 3598132, lati:14.641980, long:-90.513237, data:{}};
let dcCoords = {id: 4138106, lati:38.907192, long:-77.036873, data:{}};


$(document).ready(function(){
    
    //get location
	askLocation();
    
    setInterval(draw, 10000);
});

function draw(){
    getWeather(lat, lon);
    //get weather data for each city
    londonCoords.data = getWeatherByID(londonCoords.id);
    console.log(londonCoords.data);
//    capetownCoords.data = getWeatherByID(capetownCoords.id);
//    berlinCoords.data = getWeatherByID(berlinCoords.id);
//    beijingCoords.data = getWeatherByID(beijingCoords.id);
//    guatemalacityCoords.data = getWeatherByID(guatemalacityCoords.id);
//    dcCoords.data = getWeatherByID(dcCoords.id);
    showData();
}

//gets the location of the user
function askLocation(){
	//ask the browser for the latitude and longitude
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
        	var location = pos.coords;
        	lat = location.latitude;
        	lon = location.longitude;
        	console.log("Location found, here are your coordinates:")
        	console.log("latitude: " + lat);
        	console.log("longitude: " + lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};
//get the weather with lat and lon variables
function getWeather(latitude, longitude){
    var weatherData = {};
	weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
	var addtoUrl = "lat=" + latitude + "&lon=" + longitude;
	//add all queries to URL
	weatherUrl+=addtoUrl;
	weatherUrl+="&units=metric&id=524901&APPID=";
	weatherUrl+=key;
	weatherUrl+="&callback=?";
	//get JSON with weatherURL
	$.getJSON(weatherUrl, function(data) {
		logLocalData(data.main.temp, data.main.humidity, data.weather[0].main, data.weather[0].description, data.name);
  		//console.log(data);
	});
    //return the weather data for selected city
    return weatherData;
};

//get the weather with lat and lon variables
function getWeatherByID(id){
    var weatherData = {};
	weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
	var addtoUrl = "id=" + id;
	//add all queries to URL
	weatherUrl+=addtoUrl;
	weatherUrl+="&units=metric&id=524901&APPID=";
	weatherUrl+=key;
	weatherUrl+="&callback=?";
	//get JSON with weatherURL
	$.getJSON(weatherUrl, function(data) {
		weatherData = logCityData(data.main.temp, data.main.humidity, data.weather[0].main, data.weather[0].description, data.name);
  		//console.log(data);
	});
    //return the weather data for selected city
    return weatherData;
};

//saves the weather data into the localWeather variable
function logLocalData(temp, hum, main, desc, name){
	//assign all variables to data
	localWeather = {
		"cTemp": Math.floor(temp) + "&deg c",
		"fTemp": Math.floor(temp*(9/5)+32) + "&deg f",
		"humidity": hum + "%",
		"overview": main,
		"description": desc,
		"location": name
	};
    showData();
}

//saves the city weather data into the city object
function logCityData(temp, hum, main, desc, name){
	//assign all variables to data
	return {
		"cTemp": Math.floor(temp) + "&deg c",
		"fTemp": Math.floor(temp*(9/5)+32) + "&deg f",
		"humidity": hum + "%",
		"overview": main,
		"description": desc,
		"location": name
	};
}
//assign data to the html elements
function showData(){
    //animate them in
	$("#user-loc").fadeIn("slow");
	$("#user-temp").fadeIn("slow");
	$("#user-cond").fadeIn("slow");
    //assign name of location
    //console.log(localWeather.location);
	$("#user-loc").html(localWeather.location);
	$("#user-temp").html(localWeather.fTemp);
	$("#user-cond").html(localWeather.description);
	
}




