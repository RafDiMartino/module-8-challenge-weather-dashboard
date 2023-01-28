const API = "7064144a9fb66ec04495c5ff9bb9d495";
const weatherToday = $("#today");
const weatherForecast = $("#forecast");
const pastSearches = $("#history");
var cityName = ""
var searches = []

//ajax call
function getCurrentCity(){
    var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + API;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        console.log(data)
        var city = data.city.name
        var todayDate = moment().format('ddd Do MMMM YYYY')
        var weatherIcon ="http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
        var weatherIconAlt = data.list[0].weather[0].main
        var temperature = data.list[0].main.temp - 273.15
        var windSpeed = data.list[0].wind.speed
        var humidity = data.list[0].main.humidity
        
        weatherToday.html(`
            <h2>${city}</h2>
            <h2>${todayDate}</h2>
            <img src="${weatherIcon}" alt="${weatherIconAlt}">
            <p>Temp: ${temperature.toFixed(2)} °C</p>
            <p>Wind: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
        `)
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
    console.log(searches);
    getCurrentCity();
    addBtnPastSearch()
});

// Adds a click event to all the buttons wiht a class of past-search 
$(document).on('click', '.past-search', theFuncToCall);

// Function to re-display the current weather based on the click of past-searches buttons
function theFuncToCall(){
    cityName = $(this).attr("data-city")
    console.log(cityName);
    getCurrentCity()
}

// Function to display past searches buttons 
function addBtnPastSearch(){
    for (let i = 0; i < searches.length; i++) {
        const element = searches[i];
        if (searches[i].includes(cityName)) {
            pastSearches.append($(`<button class="past-search" data-city="${element}">`).text(element));
        }
        
    }
}
