let appId = "7011eefab70811b208a381b9f73d0c50";
let units = "metric";
let searchMethod;
const tempElement = document.getElementById("temperature-degree");
const locationElement = document.getElementById("location-timezone");
let itemContainer = document.getElementById("itemcontainer");
const degreeElement = document.getElementById("degree-section");
const searchContainer = document.getElementById("searchContainer");
let today = new Date().getHours();

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip";
    else
        searchMethod = "q";
}

function backgroundColor(){
    if (today >= 21 && today <= 6) {
        document.body.style.background = "linear-gradient(rgb(0, 0, 102), rgb(50, 49, 63))";}
        else if(today>6 && today <= 17){
        document.body.style.background = "linear-gradient(rgb(47,150,163), rgb(48,62,143))";}
        else {
        document.body.style.background = "linear-gradient(rgb(255, 204, 0), rgb(47,150,163))";
        }
}

function searchWeather(searchTerm) {
    backgroundColor();
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}&lang=de`).then(result => {
        return result.json();
    }).then(result => {
        init(result)
    })
}

function init(resultFromServer) {
    itemContainer.style.display = "flex";
    searchContainer.style.opacity = 0.3;
    setIcons(resultFromServer.weather[0].main);
    tempElement.textContent = Math.round(resultFromServer.main.temp);
    locationElement.textContent = resultFromServer.name;
}

function setIcons(weatherCondition) {
    const skycons = new Skycons({ color: "white" });
    let iconDom = document.getElementById("icon");
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

