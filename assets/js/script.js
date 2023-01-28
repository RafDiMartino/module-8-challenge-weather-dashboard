

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
function getCity(){
    var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + API;
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(data) {
            console.log(data)

    });
}
