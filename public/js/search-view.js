const d = document;
export default function searchView(){
    const $searchView = d.querySelector('.search-view');

    d.addEventListener('click',(e)=> {
        if(e.target.matches('#search')){
            $searchView.classList.remove('none');
        }
        if(e.target.matches('#btn-back')){
            $searchView.classList.add('none')
            
        }
    })
}

        