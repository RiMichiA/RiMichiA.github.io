let appId = "7011eefab70811b208a381b9f73d0c50";
let units = "metric";
let searchMethod;
//const tempElement = document.getElementById("temperature-degree");
const locationElement = document.getElementById("location-timezone");
let itemContainer = document.getElementById("itemcontainer");
const searchContainer = document.getElementById("searchContainer");
let today = new Date().getHours();

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip";
    else
        searchMethod = "q";
    return searchMethod;
}

function backgroundColor() {
    if (today >= 21 && today <= 6) {
        document.body.style.background = "linear-gradient(rgb(0, 0, 102), rgb(50, 49, 63))";
    }
    else if (today > 6 && today <= 17) {
        document.body.style.background = "linear-gradient(rgb(47,150,163), rgb(48,62,143))";
    }
    else {
        document.body.style.background = "linear-gradient(rgb(255, 204, 0), rgb(47,150,163))";
    }
}

// function getLat(searchTerm) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}&lang=de`).then(result => {
//         return result.json();
//     }).then(result => {
//         var lat = result.coord.lat
//         return lat;
//     })
// }


function getWeather(searchTerm) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}&lang=de`).then(result => {
        return result.json();
    }).then(result => {
        initCity(result)
        getForecast(result.coord.lat, result.coord.lon);
    })
}

function searchWeather(searchTerm) {
    backgroundColor();
    getSearchMethod(searchTerm);
    getWeather(searchTerm)
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&&APPID=${appId}&units=${units}&lang=de`).then(resultOneCall => {
        return resultOneCall.json();
    }).then(resultOneCall => {
        for (weekday = 1; weekday < resultOneCall.daily.length; weekday++) {
            init(resultOneCall, weekday);
        }
    })
}

function initCity(resultFromServer) {
    locationElement.textContent = resultFromServer.name;
}

function init(resultFromServer, weekday) {
    itemContainer.style.display = "flex";
    searchContainer.style.opacity = 0.3;
    console.log(resultFromServer);
    setTemp(resultFromServer.daily[weekday].temp.day, weekday);
    setIcons(resultFromServer.daily[weekday].weather[0].main, weekday);
    // tempElement.textContent = Math.round(resultFromServer.main.temp);
}

function setTemp(tempData, weekday) {
    let tempElement = document.getElementById(`temperature-degree${weekday}`);
    console.log(tempElement);
    console.log(tempData);
    tempElement.textContent = Math.round(tempData);
}

function setIcons(weatherCondition, weekday) {
    const skycons = new Skycons({ color: "white" });
    let iconDom = document.getElementById(`icon${weekday}`);
    switch (weatherCondition) {
        case "Clear":
            skycons.add(iconDom, Skycons.CLEAR_DAY);
            break;

        case "Clouds":
            skycons.add(iconDom, Skycons.CLOUDY);

            break;

        case "Rain":
            skycons.add(iconDom, Skycons.RAIN);
            break;

        case "Drizzle":
            skycons.add(iconDom, Skycons.FOG);
            break;

        case "Snow":
            skycons.add(iconDom, Skycons.SNOW);
            break;

        default:
            skycons.add(iconDom, Skycons.WIND);
            console.log(`${weatherCondition}`);
    };
    skycons.play();
}

document.getElementById("seachBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("seachInput").value;
    if (searchTerm)
        searchWeather(searchTerm);
})

