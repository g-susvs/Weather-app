const d = document;

export default function selectTempValue(btnC, btnF){
    const $btnC = d.querySelector(btnC);
    const $btnF = d.querySelector(btnF);
    
    d.addEventListener('click', (e)=>{
        if(e.target == $btnF){
            e.preventDefault();
            localStorage.setItem("temperature_value","imperial");
            console.log(localStorage.getItem('temperature_value'))
        }
        if(e.target == $btnC){
            e.preventDefault();
            localStorage.setItem("temperature_value","metric");
            console.log(localStorage.getItem('temperature_value'));
        }
    })
}
