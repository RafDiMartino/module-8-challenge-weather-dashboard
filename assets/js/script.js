

const API = "7064144a9fb66ec04495c5ff9bb9d495";
const weatherToday = $("#today");
const weatherForecast = $("#forecast");
var cityName = ""

// function for the click event
$("#search-button").click(function(e) {
    e.preventDefault()
    cityName = $("#search-input").val();
    console.log(cityName)
    getCity()
});

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
