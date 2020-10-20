// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)
const APIkey = "95d6b760ca648908e702eff5f26d03c8";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const APIciudad = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=95d6b760ca648908e702eff5f26d03c8";
let boton = document.getElementById("searchButton");
let entrada = document.getElementById("searchInput");

//incluido nuevo............
/*const mapboxglAccessToken = "pk.eyJ1IjoiamNhbWlsbzcyMSIsImEiOiJja2dkbHlwdGQwa2VkMnhvN2ZtaDJwMWxiIn0.ML2cRs2To_8T_FKR1wRh7A";
let map;
// TAREA: centrar el mapa cuando haga click en el container del weather.
const createMarker = (longitude, latitude) => new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);​
const createMap = (latitude, longitude) => {
    const mapDiv = document.getElementById("map");
    mapDiv.style.width = "700px";
    mapDiv.style.height = "700px";​
    mapboxgl.accessToken = mapboxglAccessToken;​
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 8
    });​
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);​
    return map;
};
//hasta aqui nuevo incluido---........-----..---......------.....-----*/

const changeMap = (lat, lon) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZ2VzcjkyIiwiYSI6ImNrZzhiNG8weTBma2syeW52dDNrbDh0bzgifQ.f17Czkz9pV4iYe33N9g0PQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 9
    });
    // const createMarker = new mapboxgl.Marker().setLgnLat([lon, lat]).addTo(map);
};
//creando search

const onSuccess = position => {
    const {
        coords: { latitude, longitude }
    } = position;
    callWeather(latitude, longitude);
    changeMap(latitude, longitude);
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
// revisar esta funcion

let cities = []; //deberia quedarse aqui este const.....
const searchResultsList = results => {
    const resultsList = document.getElementById("results");
    cities.push({
        results
    });
    console.log("aqui", cities);
    cities.map(city => {
        console.log("==>>>", city);
        const {
            main: { temp },
            name,
            sys: { country },
            weather: [{ description, icon }]
        } = city.results;

        console.log("array", cities.length);
        ///ojo hacer aqui el if y else

        const listItem = document.createElement("li");
        listItem.innerHTML = `${name}, ${country}, ${description}, ${convertKelvinToCelsius(temp)}°C`;
        const img = document.createElement("img");
        img.src = `icons/${icon}.png`;
        listItem.appendChild(img);
        resultsList.appendChild(listItem);
        const busqueda = document.getElementsByClassName("busqueda");
        // inclui esta linea...........
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
    });
};
//Agregar los datos de temperatureDescriptionDiv, locationDiv
//Centrar el mapa cuando haga click en el container del weather.
//Borrar los elementos de la lista cada vez que se haga una nueva búsqueda
//Don't Repeat Yourself. Encontrar la manera de que no sea necesario ShowWeatherInfo, sino que nos 
//muestre la información con el método addElementToList (pista: tendrás que refactorizar el código, 
//hasta que addElementToList haga lo que se hace actualmente en 2 funciones.
//Modifica el CSS para que se vea mejor

// clonacion del container y la inclusion del id para mostrar

/*const addElementToList = city => {
    const {
        id,
        main: { temp },
        name,
        sys: { country },
        weather: [{ description, icon }]
    } = city;

    const container = document.getElementById("container");
    const clone = container.cloneNode(true);
    clone.id = `container-${name}-${id}`;

    console.log("addElementToList", city, clone);
    const list = document.getElementsByClassName("list")[0];
    list.appendChild(clone);
};*/
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
//handleOnSearch();

const searchCityWeather = () => {
    const ciudad = entrada.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=95d6b760ca648908e702eff5f26d03c8`)
        .then(response => response.json())
        .then(weatherSearchInfo => {
            console.log(weatherSearchInfo.name);
            searchResultsList(weatherSearchInfo)
        })
        //{console.log(weatherSearchInfo.coord.lat) })
        .catch((error) => console.log(error));
};

// recien incluido
boton.addEventListener("click", () => {
    handleOnSearch();
})

navigator.geolocation.getCurrentPosition(onSuccess, onError);

//fetch(URL).then(onSuccess()).catch(onError());