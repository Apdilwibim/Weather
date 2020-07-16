'use strict';

let lat = '60.15';
let lon = '37.58';

fetchRequest();

function fetchRequest() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=2068202d68704f0ce0cb814433e76b86`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            currentWeather(data);
            weatherForDays(data);
        })
        .catch(function () {

        });
}

let currentDate = document.querySelector('.current__date');
let currentTemp = document.querySelector('.current__temp');
let currentHum = document.querySelector('.current__humidity');
let currentIcon = document.querySelector('.current__icon');
let currentCity = document.querySelector('.current-city');

let chooseCity = document.querySelector('.choose-city');
let cities = document.querySelectorAll('.choose-city__item');

let weatherItem = document.querySelectorAll('.weather__item');
let weatherDate = document.querySelectorAll('.weather__date');
let weatherTemp = document.querySelectorAll('.weather__temp');
let weatherIcon = document.querySelectorAll('.weather__icon');


let days = {
    'mon': 'Monday',
    'tue': 'Tuesday',
    'wed': 'Wednesday',
    'thu': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday'
}

function compareDays(string, days) {
    for (let key in days) {
        if (key == string) {
            return days[key];
        }
    }
}

function currentWeather(data) {
    let day = ((moment.unix(data.current.dt))['_d']).toDateString();
    currentDate.innerHTML = `${compareDays((day.slice(0, 3)).toLowerCase(), days)} ${day.slice(4, day.length)}`;
    currentIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[0].weather[0]['icon']}@2x.png`);
    currentTemp.innerHTML = `${Math.floor(data.current.temp - 273.15)} &deg;`;
    currentHum.innerHTML = `Humidity ${data.current.humidity} &#37;`;
}

chooseCity.onclick = function () {
    chooseCity.classList.toggle('city-active');
    for (let i = 0; i < cities.length; i++) {
        cities[i].classList.toggle('choose-city__item--active');
    }
}

for (let i = 0; i < cities.length; i++) {
    cities[i].addEventListener('click', function (event) {
        event.preventDefault();
        currentCity.textContent = this.textContent;
        lat = this.getAttribute('datalat');
        lon = this.getAttribute('datalon');
        for (let i = 1; i < weatherItem.length; i++) {
            weatherItem[i].classList.add('weather-anim');
            setTimeout(() => {
                weatherItem[i].classList.remove('weather-anim');
            }, 1500);
        }
        fetchRequest();
    });
}

function weatherForDays(data) {
    for (let i = 1; i < weatherItem.length; i++) {
        let day = ((moment.unix(data.daily[i].dt))['_d']).toDateString();
        weatherDate[i - 1].textContent = `${compareDays((day.slice(0, 3)).toLowerCase(), days)} ${day.slice(4, 10)}`;
        weatherTemp[i - 1].innerHTML = `${Math.floor(data.daily[i].temp.day - 273.15)} &deg;`;
        weatherIcon[i - 1].setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[i].weather[0]['icon']}@2x.png`);
    }
}




