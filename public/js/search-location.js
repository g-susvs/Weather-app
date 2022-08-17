const d = document;
export default function searchLocation(input, btnSearch,ul){
    
    const $input = d.querySelector(input);
    const $btnSearch = d.querySelector(btnSearch);
    const $ul = d.querySelector(ul);
    const $loader = d.querySelector(".loader");

    const url = (window.location.hostname.includes('localhost'))
    ?'http://localhost:8080'
    :'https://wther-app.herokuapp.com';


    d.addEventListener('click', async (e)=>{
        console.clear()
        if(e.target.matches(btnSearch)){
            if($input.value == '') return;
            console.log($input.value);
            await getLocations();
            
        }
    })
    const getLocations = async () => {
        $btnSearch.disabled = true;
        
        $loader.style.visibility = 'visible' 
        $ul.innerHTML = '';
        try {
            const resp = await fetch(url+`/api/geo/${$input.value}?limit=5&lang=es`);
            const json = await resp.json();
            
            let content = '';

            json.forEach( location => {
                content += `
                    <li class="location-item" data-lon="${location.lon}" data-lat="${location.lat}">
                    ${location.place_name}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                    </li>`;
            });
            $ul.innerHTML=content;
            $btnSearch.disabled = false;
            $loader.style.visibility = 'hidden' 
        } catch (error) {
            console.log(error);
        }
    }
    
}