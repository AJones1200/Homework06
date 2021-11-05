var inputField = document.querySelector("#city")
var button = document.querySelector("#get-weather")

function fetchData(){
    document.getElementById("todayWeather").innerHTML='';
    var cityName = inputField.value
    var apiKey = "2eee9c3f6b64ba32b5110b438933027a"
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    
    fetch(requestUrl)
    .then(function(response){
        return response.json()
        })
        .then(function(weatherData){
            console.log(weatherData)
            var lat = weatherData.coord.lat
            var long = weatherData.coord.lon
            var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + long + "&exclude=hourly,minutely&appid=" + "2eee9c3f6b64ba32b5110b438933027a"
            fetch(queryUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(data) {
                console.log(data)
                console.log("hit")

                
            var uvi = data.daily[0].uvi
            var humidity = data.daily[0].humidity
            var wind = data.daily[0].wind_speed
            var icon = "http://openweathermap.org/img/wn/"+ data.daily[0].weather[0].icon + "@2x.png" 

            for (let i = 0; i < 5; i++) {
                var fiveDayContainer = document.querySelector("#fiveDayForecast")
                var cardIcon = fiveDayContainer.children[i].children[0];
                var iconLink = "http://openweathermap.org/img/wn/"+ data.daily[i+1].weather[0].icon + "@2x.png" 
                cardIcon.setAttribute("src", iconLink )

                var cardDate = fiveDayContainer.children[i].children[1];
                cardDate.innerHTML = moment().add(i+1,"day").format("L")
                
                var cardTemp = fiveDayContainer.children[i].children[2];
                var dailyKTemp = data.daily[i+1].temp.day;
                var dailyFTemp = ((dailyKTemp-273.15)*9/5 + 32).toFixed(2);
                cardTemp.innerHTML = "Temp: " + dailyFTemp;

                var cardHumidity = fiveDayContainer.children[i].children[3];
                cardHumidity.innerHTML = "Humidity: " + data.daily[i+1].humidity;

                var cardWind = fiveDayContainer.children[i].children[4];
                cardWind.innerHTML = "Wind Speed: " + data.daily[i+1].wind_speed
                
                var cardUvi = fiveDayContainer.children[i].children[5];
                cardUvi.innerHTML = "UVI: " + data.daily[i+1].uvi
                
            
              }

            console.log(uvi)
            console.log(humidity)
            console.log(wind)
            console.log(icon)

            var Ktemp = data.daily[0].temp.day
            var Ftemp = ((Ktemp-273.15)*9/5 + 32).toFixed(2)
            console.log(typeof Ftemp)

            var dateTitle = document.createElement('h4')
            var tempTitle = document.createElement('h4');
            var humidityTitle = document.createElement('h4');
            var windTitle = document.createElement('h4');
            var uviTitle = document.createElement('h4');
            var todayWeather = document.createElement('div');
            
            todayWeather.setAttribute("class" , "row")
            todayWeather.setAttribute("id" , "todayWeather")

            dateTitle.textContent = moment().format("LLLL")
            tempTitle.textContent = "Temperature:"
            humidityTitle.textContent = "Humidity:"
            windTitle.textContent = "Wind Speed:"
            uviTitle.textContent = "UVI:"
            
            var tempEl = document.createElement("p");
            var humidityEl = document.createElement("p");
            var windEl = document.createElement("p");
            var uviEl = document.createElement("span");
            console.log(Ftemp)
            console.log(Ktemp)
            


            tempEl.textContent = Ftemp
            humidityEl.textContent = humidity
            windEl.textContent = wind
            uviEl.textContent = uvi


            document.getElementById("todayWeather").append(dateTitle);
            document.getElementById("todayWeather").append(tempTitle);
            document.getElementById("todayWeather").append(humidityTitle);
            document.getElementById("todayWeather").append(windTitle);
            document.getElementById("todayWeather").append(uviTitle);

            tempTitle.append(tempEl);
            humidityTitle.append(humidityEl);
            windTitle.append(windEl);
            uviTitle.append(uviEl);
            
            if (uvi >= 8) {
              span.style.backgroundColor = "red";

              } else if (uvi < 8 && uvi >= 3) {
                span.style.backgroundColor = "yellow";

              } else {
                span.style.backgroundColor = "green";
              }

            document.querySelector('#fiveDayTitle').removeAttribute('hidden')
            document.querySelector('#fiveDayForecast').removeAttribute('hidden')
            

            })
            
            
           
            
        })
	}
    
    button.addEventListener("click", fetchData)