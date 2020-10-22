// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)
const APIkey = "95d6b760ca648908e702eff5f26d03c8";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const APIciudad = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=95d6b760ca648908e702eff5f26d03c8";
let boton = document.getElementById("searchButton");
let entrada = document.getElementById("searchInput");
let map = null;
const changeMap = (lat, lon) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZ2VzcjkyIiwiYSI6ImNrZzhiNG8weTBma2syeW52dDNrbDh0bzgifQ.f17Czkz9pV4iYe33N9g0PQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 9
    });
    // 
};
//creando search
const onSuccess = position => {
    const {
        coords: { latitude, longitude }
    } = position;
    callWeather(latitude, longitude);
    changeMap(latitude, longitude);
    console.log(latitude + "," + longitude);
    let marker1 = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
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
let cities = [];
const searchResultsList = newCity => {
    const resultsList = document.getElementById("results");
    cities.push({
        newCity
    });
    const {
        main: { temp },
        coord: { lat, lon },
        name,
        sys: { country },
        weather: [{ description, icon }]
    } = newCity;
    const listItem = document.createElement("li");
    listItem.innerHTML = `${name}, ${country}, ${description}, ${convertKelvinToCelsius(temp)}°C`;
    resultsList.appendChild(listItem);
    const busqueda = document.getElementsByClassName("busqueda");
    busqueda.createElement = busqueda;
    const iconElement = document.getElementById("icon2");
    iconElement.src = `icons/${icon}.png`;
    const temperatura = document.getElementById("temperatura2");
    temperatura.innerText = convertKelvinToCelsius(temp);
    const clima = document.getElementById("clima2");
    clima.innerText = description;
    const ubicacion = document.getElementById("ubicacion2");
    ubicacion.innerText = name;
    const pais = document.getElementById("pais2");
    pais.innerText = country;
    console.log("lista", listItem);
    console.log("UL", resultsList);
    console.log(lat + "," + lon);
    let createMarker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
};
const callWeather = (latitude, longitude) => {
    const call = fetch(`${baseURL}lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    call.then(response => response.json()).then(weatherInfo => showWeatherInfo(weatherInfo));
    call.catch(error => console.error(error));
};

function handleOnSearch() {
    const text = entrada.value;
    if (text) {
        searchCityWeather(text.toLowerCase());
    }
    console.log(entrada.value)
    return text;
};
const searchCityWeather = () => {
    const ciudad = entrada.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=95d6b760ca648908e702eff5f26d03c8`)
        .then(response => response.json())
        .then(weatherSearchInfo => {
            console.log(weatherSearchInfo.name);
            searchResultsList(weatherSearchInfo)
        })
        .catch((error) => console.log(error));
};
boton.addEventListener("click", () => {
    handleOnSearch();
})
navigator.geolocation.getCurrentPosition(onSuccess, onError);