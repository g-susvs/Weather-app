// import searchView from "./search-view";

import searchLocation from "./search-location.js";
import searchView from "./search-view.js";
import searchWeather from "./search-weather.js";
import start from "./start.js";

const d = document;
d.addEventListener('DOMContentLoaded',()=>{
    start();
    searchLocation("#input-search","#btn-search","#locations");
    searchWeather();
    
})

searchView();


