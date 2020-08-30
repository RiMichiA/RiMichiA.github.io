// window.addEventListener("load", () => {
//     let long;
//     let lat;


//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const proxy = 'https://cors-anywhere.herokuapp.com/';
//             const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

//             fetch(api)
//             .then(response =>{
//                 return response.json();
//             })
//             .then(data =>{
//                 console.log(data)
//             });
//         });
//     }
// });

let appId = "7011eefab70811b208a381b9f73d0c50";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip";
    else
        searchMethod = "q";
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result)
    })
}

function init(resultFromServer) {
    //console.log(resultFromServer);
    console.log(resultFromServer.weather[0].main);
    setIcons(resultFromServer.weather[0].main);
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