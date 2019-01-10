//http://api.openweathermap.org/data/2.5/weather?lat=40.9874513&lon=-86.2867407
//open weather API url
let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?'; //add lat={lat}&lon={lon} onto end to get weather
//apiKey
const key = 'eb2cf1b88e289f6b27b78658bd43f65e';

//latitude and longitude variables
let lat;
let lon;
//holds weather data
let localWeather = {};
//info for each city in around the world section
let londonCoords = {id: 2643743, lati:51.507351, long:-0.127758, title: "london-title", temp: "london-temp", description: "london-desc"};
let capetownCoords = {id: 3369157, lati:-33.924870, long:18.424055, title: "capetown-title", temp: "capetown-temp", description: "capetown-desc"};
let berlinCoords = {id: 6545310, lati:52.520008, long:13.404954, title: "berlin-title", temp: "berlin-temp", description: "berlin-desc"};
let beijingCoords = {id: 2038349, lati:39.904202, long:116.407394, title: "beijing-title", temp: "beijing-temp", description: "beijing-desc"};
let guatemalacityCoords = {id: 3598132, lati:14.641980, long:-90.513237, title: "guat-title", temp: "guat-temp", description: "guat-desc"};
let dcCoords = {id: 4138106, lati:38.907192, long:-77.036873, title: "wash-title", temp: "wash-temp", description: "wash-desc"};

//array to hold all the cities
var citiesInformation = [londonCoords, capetownCoords, berlinCoords, beijingCoords, guatemalacityCoords, dcCoords];


$(document).ready(function(){
    //get location of user
	askLocation();
    
    //loop through each city and assign it's data to it's html element
    for (var i = 0; i < citiesInformation.length; i++){
        //send the function the ID, temp, and description tag names
        getWeatherByID(citiesInformation[i].id, citiesInformation[i].title, citiesInformation[i].temp, citiesInformation[i].description);
    }
    
    
});

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
            getWeatherByCoords(lat, lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};
//get the weather with lat and lon variables
function getWeatherByCoords(latitude, longitude){
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
function getWeatherByID(cityID, titleID, tempID, descID){
    var titleTag = titleID;
    var tempTag = tempID;
    var descTag = descID;
	weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
	var addtoUrl = "id=" + cityID;
	//add all queries to URL
	weatherUrl+=addtoUrl;
	weatherUrl+="&units=metric&id=524901&APPID=";
	weatherUrl+=key;
	weatherUrl+="&callback=?";
	//get JSON with weatherURL
	$.getJSON(weatherUrl, function(data) {
        $("#" + titleTag).html(data.name);
        $("#" + tempTag).html(data.main.temp + "<span>&degC</span>");
        $("#" + descTag).html(data.weather[0].description);
		//data.main.temp, data.main.humidity, data.weather[0].main, data.weather[0].description, data.name
	});
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
		"cTemp": Math.floor(temp) + "<span>&deg C</span>",
		"fTemp": Math.floor(temp*(9/5)+32) + "<span>&deg F</span>",
		"humidity": hum + "%",
		"overview": main,
		"description": desc,
		"location": name
	};
}
//assign data to the html elements
function showData(){
    //assign name of location
    //console.log(localWeather.location);
	$("#user-loc").html(localWeather.location);
	$("#user-temp").html(localWeather.fTemp);
	$("#user-cond").html(localWeather.description);
	
}




