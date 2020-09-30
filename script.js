const form = document.querySelector('#js-search-form');
form.addEventListener('submit', handleSubmit);

// current day
var WDate = document.querySelector("#WDate");
var temperture = document.querySelector("#temperture");
temperture = (($("#temperture") -273.15)*1.8)+32;
var humidity = document.querySelector("#humidity");
var WindSpeed = document.querySelector("#WindSpeed");
var UVindex = document.querySelector("#UVindex");


//getting my five days 
var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");

//API key 
var APIKey = "e3c45f467d23763d9f125bcdf0ad47ec";



function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const inputValue = document.querySelector('#js-search-input').value;
    // remove whitespace from the input
    const searchQuery = inputValue.trim();
    // print `searchQuery` to the console
    console.log(searchQuery);
    dayOfWeather(searchQuery);

}

// searching weather Map
async function dayOfWeather(searchQuery) {
    console.log(APIKey);
    const endpoint =  "https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + 
    "&appid=" + APIKey ;
    console.log(endpoint);


    $.ajax({
        url: endpoint,
        method: "get"
    }).then(function(response){
        console.log(response);
        $("#WDate").append(" " + response.name);
        // change to F
        $("#temperture").append(" " + response.main.feels_like + "K");
        WindSpeed.append(" " + response.wind.speed + "MPH");
        humidity.append(" " +response.main.humidity + "%");
    });


    // setting api
    const endpoint2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchQuery + 
    "&appid=" + APIKey;
    console.log(endpoint2);
// 5 DAY Ahead 
    $.ajax({
        url: endpoint2,
        method: "get"
    }).then(function(magic){
        console.log(magic)
        //day 1
        day1 = [
            $("#day1").append("Temperture: " + magic.list[0].main.temp + "k"),
            $("#day1").append("humidity" + magic.list[0].main.humidity + "%")
        ];
        // day 2    
        day2.append(
            "Temperture: " + magic.list[1].main.temp + "k"
            );
            $("#day2").append("humidity" + magic.list[1].main.humidity + "%");
        // day 3    
        day3.append(
            "Temperture: " + magic.list[2].main.temp + "k"
            );
            $("#day3").append("humidity" + magic.list[2].main.humidity + "%");
        // day 4    
        day4.append(
            "Temperture: " + magic.list[3].main.temp + "k",
            "humidity" + magic.list[3].main.humidity + "%"
            );

        // day 5
        day5.append(
            "Temperture: " + magic.list[4].main.temp + "k",
            "humidity" + magic.list[4].main.humidity + "%"
            );
    })

    
}


