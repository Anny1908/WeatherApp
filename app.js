// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)
const APIkey = "95d6b760ca648908e702eff5f26d03c8";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const APIciudad = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=95d6b760ca648908e702eff5f26d03c8"
const onSuccess = position => {
    const {
        coords: { latitude, longitude }
    } = position;
    callWeather(latitude, longitude);
    console.log("position", longitude);
};
const onError = error => {
    console.error(error.message);
    const notification = document.createElement("p");
    notification.innerText = error.message;
    const divNotification = document.getElementsByClassName("notification")[0];
    divNotification.style.display = "block";
    divNotification.appendChild(notification);
};
const convertKelvinToCelsius = kelvin => Math.round(kelvin - 273.15);
const showWeatherInfo = info => {
    const {
        main: { temp },
        name,
        sys: { country },
        weather: [{ description, icon }]
    } = info;
    console.log("info que necesito", convertKelvinToCelsius(temp), name, country, description, icon);
    const iconElement = document.getElementById("icon");
    iconElement.src = `icons/${icon}.png`;
    const temperatura = document.getElementById("temperatura");
    temperatura.innerText = convertKelvinToCelsius(temp);
    const clima = document.getElementById("clima");
    clima.innerText = description;
    const ubicacion = document.getElementById("ubicacion");
    ubicacion.innerText = name;
    const pais = document.getElementById("pais");
    pais.innerText = country;
};
const callWeather = (latitude, longitude) => {
    const call = fetch(`${baseURL}lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    call.then(response => response.json()).then(weatherInfo => showWeatherInfo(weatherInfo));
    call.catch(error => console.error(error));
};
navigator.geolocation.getCurrentPosition(onSuccess, onError);
//fetch(URL).then(onSuccess()).catch(onError());