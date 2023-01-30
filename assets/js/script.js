const API = "7064144a9fb66ec04495c5ff9bb9d495";
const weatherToday = $("#today");
const weatherForecast = $("#forecast");
const forecastTitle = $("#forecast-title")
const pastSearches = $("#history");
var cityName = "";
var searches = [];

// Function to get the current city weather
function getCurrentCity(){
    var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + API;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        var latitude = data.city.coord.lat; // pulls in lat
        var longitude = data.city.coord.lon; // pulls in lon
        var city = data.city.name
        var todayDate = moment().format('ddd Do MMMM YYYY')
        var weatherIcon ="http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
        var weatherIconAlt = data.list[0].weather[0].main
        var temperature = data.list[0].main.temp - 273.15
        var windSpeed = data.list[0].wind.speed
        var humidity = data.list[0].main.humidity
        
        forecastTitle.append(`
        <h3>5 Day Forecast</h3>
        `);

        weatherToday.html(`
            <div class="today-weather">
                <h2 class="text-shadow">${city}</h2>
                <div class="date-wrapper">
                    <h3 class="text-shadow">${todayDate}</h3>
                    <img src="${weatherIcon}" alt="${weatherIconAlt}">
                </div>
                <p class="text-shadow">Temp: ${temperature.toFixed()} °C</p>
                <p class="text-shadow">Wind: ${windSpeed} m/s</p>
                <p class="text-shadow">Humidity: ${humidity}%</p>
            </div>
        `)
        get5DaysForecast(latitude, longitude)
    });
    
}
// Function to get 5 days forecast weather
function get5DaysForecast(latitude, longitude){
    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + API;
    $.ajax({
        url: queryURL5days,
        method: "GET"
    }).then(function(data) {
        var weatherIcon ="http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
        var weatherIconAlt = data.list[0].weather[0].main
        // console.log(data)
        // console.log(latitude)
        // console.log(longitude);
        for (let i = 8; i < data.list.length; i++) {
            if (i % 8 === 0 || i === data.list.length - 1) {
            weatherForecast.append(`
                    <div class="card forecast-card">
                        <p class="text-shadow">${moment(data.list[i].dt_txt).format('ddd Do')}</p>
                        <img src="${weatherIcon}" alt="${weatherIconAlt}">  
                        <p class="text-shadow">Temp: ${(data.list[i].main.temp - 273.15).toFixed()} °C</p>
                        <p class="text-shadow">Wind: ${data.list[i].wind.speed} m/s</p>
                        <p class="text-shadow">Humidity: ${data.list[i].main.humidity}%</p>
                    </div>
            `);
            }
        };
    });
}

// function for the click event search button 
$("#search-button").click(function(e) {
    e.preventDefault()
    cityName = $("#search-input").val();
    if (searches.includes(cityName) || cityName === "") {
        return
    }else{
        searches.push(cityName)
    } 
    getCurrentCity();
    addBtnPastSearch()
    weatherForecast.empty()
    forecastTitle.empty()
});

// Adds a click event to all the buttons wiht a class of past-search 
$(document).on('click', '.past-search', theFuncToCall);

// Function to re-display the current weather based on the click of past-searches buttons
function theFuncToCall(){
    cityName = $(this).attr("data-city")
    getCurrentCity()
    weatherForecast.empty()
    forecastTitle.empty()
}

// Function to display past searches buttons 
function addBtnPastSearch(){
    for (let i = 0; i < searches.length; i++) {
        const element = searches[i];
        if (searches[i].includes(cityName)) {
            pastSearches.prepend($(`<button class="past-search btn btn-secondary mb-2" data-city="${element}">`).text(element));
        } 
    }
}