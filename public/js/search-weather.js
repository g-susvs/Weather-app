const d = document;

export default function searchWeather () {
    const $searchView = d.querySelector(".search-view");
    const $location = d.querySelector(".location"); // header
    const $imgWeather = d.querySelector("#img-weather");
    const $weatherTemp = d.querySelector(".weather-temp"); // header
    
    const $wind = d.querySelector('#wind');
    const $humidity = d.querySelector('#humidity');
    const $visibility = d.querySelector('#visibility');
    const $airPressure = d.querySelector('#air-pressure');

    const url = (window.location.hostname.includes('localhost'))
    ?'http://localhost:8080'
    :'https://wther-app.herokuapp.com';

    d.addEventListener('click', async (e) => {
        console.clear()

        if (e.target.matches('.location-item')) {
            const lon = e.target.getAttribute('data-lon');
            const lat = e.target.getAttribute('data-lat');
            await getWeather(lat, lon);
            
            $searchView.classList.add("none");
            localStorage.setItem("location",JSON.stringify({lat,lon})); 
        }
    })

    const getWeather = async (lat, lon) => {
        
        
        try {
            const resp = await fetch(url + `/api/weather?lat=${lat}&lon=${lon}&lang=es&units=metric`);
            const json = await resp.json();
            
            const hour = Number(`${new Date().getHours()}.${new Date().getMinutes()}`);

            if(json.weather.id >= 200 && json.weather.id <= 232){
                $imgWeather.setAttribute('src','./assets/storm.png');
            }
            else if(json.weather.id >= 300 && json.weather.id <= 322){
                $imgWeather.setAttribute('src','./assets/drizzle.png');
            }
            else if(json.weather.id >= 500 && json.weather.id <= 531){
                $imgWeather.setAttribute('src','./assets/rain.png');
            }
            else if(json.weather.id >= 600 && json.weather.id <= 622){
                $imgWeather.setAttribute('src','./assets/snow.png');
            }
            else if(json.weather.id >= 700 && json.weather.id <= 781){
                $imgWeather.setAttribute('src','./assets/mist.png');
            }
            else if(json.weather.id == 800){
                if(hour >= 5 && hour < 6){
                    $imgWeather.setAttribute('src','./assets/clear_day.png');
                }
                else if(hour >= 6 && hour < 17){
                    $imgWeather.setAttribute('src','./assets/clear_day.png');
                }
                else if(hour > 17 && hour <19){
                    $imgWeather.setAttribute('src','./assets/clear_night.png');
                }
                else if((hour > 19 && hour <= 24)||(hour >= 0 && hour < 5)){
                    $imgWeather.setAttribute('src','./assets/clear_night.png');

                }
                
            }
            else if(json.weather.id >= 801){
                if(hour >= 6 && hour <18){

                    $imgWeather.setAttribute('src','./assets/cloudy_day.png');
                }else{

                    $imgWeather.setAttribute('src','./assets/cloudy_night.png');
                }

            }
            else{
                console.log('nothing');
            }

            $location.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <h1>${json.name}</h1>`;

            $weatherTemp.innerHTML = `
                <h3>${json.temp.temp} °C</h3>
                <span>${json.weather.description}</span>
            `;

            $wind.innerHTML = `
                <span>${json.wind.speed}</span>
                <span>mph</span>`;

            $humidity.innerHTML = `
                <span>${json.humidity}</span>
                <span>%</span>
                <div class="humidity-bar">
                    <div style="width: ${json.humidity}%; height: 100%;"></div>
                </div>
            `;
            $visibility.innerHTML = `
                <span>${covertToMiles(json.visibility)}</span>
                <span>millas</span>
            `;

            $airPressure.innerHTML = `
                <span>${json.pressure}</span>
                <span>mb</span>
            `;


        } catch (error) {
            console.log(error);

        }
    }
}




const covertToMiles = (metros) => {
    const milles = ((1 / 1609) * metros).toFixed(1);
    return milles
}

