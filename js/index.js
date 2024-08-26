// today variables
let todayName = document.getElementById('today-data-day-name')
let todayNumber = document.getElementById('today-data-day-number')
let todayMonth = document.getElementById('today-data-month')
let todayLocation = document.getElementById('today-location')
let todayTemp = document.getElementById('today-temp')
let todayConditionImg = document.getElementById('today-condition-img')
let todayConditionText = document.getElementById('today-condition-text')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let windDirection = document.getElementById('wind-direction')

// next data
let nextDay = document.getElementsByClassName('next_day_name')
let nextMaxTemp = document.getElementsByClassName('next_max_temp')
let nextMinTemp = document.getElementsByClassName('next_min_temp')
let nextConditionImg = document.getElementsByClassName('next_condition_img')
let nextConditionText = document.getElementsByClassName('next_condition_text')

// search input
let searchInput = document.getElementById('search')

// API data
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

// Display today data
function displayTodayData(data) {
    let today = new Date();
    todayName.innerHTML = today.toLocaleDateString('en-US', { weekday: 'long' });
    todayNumber.innerHTML = today.getDate(); 
    todayMonth.innerHTML = today.toLocaleDateString('en-US', { month: 'long' }); 
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute('src', data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir
}

// Display next days data
function displayNextData(data) {
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDate = new date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString('en-US',{weekday:'long'})
        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
        nextConditionImg[i].setAttribute('src', forecastData[i + 1].day.condition.icon) 
        nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text
    }
}

// Start app
async function startApp(city= 'cairo') {
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
  
}

startApp()


//search

searchInput.addEventListener('input',function(){
startApp(searchInput.value)
})




















