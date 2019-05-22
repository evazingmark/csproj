
function getFilms(page = 1)
{
    $.get('/films', { "page":page }, resp => {
        let resStr = '';
        let paginationStr = `<ul class="pagination pagination-md justify-content-center">`;
        resp.data.forEach(el => {
            resStr += addLinkFilm(el);
        });
        
        for(let index = 1; index < resp.meta.pages + 1; index++){
            paginationStr += `<li class="page-item`;
            if(index === page) paginationStr += ` disabled">`;
            else paginationStr += `">`;
            paginationStr += `<button class="page-link" onclick="getFilms(${index})">${index}</button></li>`;
        }
        paginationStr += '</ul>'
        $('#pagination').empty().append(paginationStr);
        $('#films').empty().append(resStr);
    });
}

function searchFilm(){
    $.get('/films/find', {"name": $('#search').val()}, data => {
        let resStr = '';
        if(data.length > 0){
            data.forEach(el => {
                resStr += addLinkFilm(el);
            });
        }
        else
            resStr = 'Ничего не найдено';
        
        $('#films').empty().append(resStr);
    });
}


function addLinkFilm(film){
    let date = new Date(film.release_date);
    return  `
    <table class="table table-borderless ">
    <tr>
        <td>
        <a href = '/films/${film.id}/videos'>
            <img  class="rounded float-left" src = '/images/films/${film.preview_path}' height = 300 width = 200 />
            
        </a>
        </td>
        <td  class="align-baseline">
        <a href = '/films/${film.id}/videos'>
            <b>${film.name} (${date.getFullYear()})</b>
            
        </a>
        <br>
        <small>${film.genre}</small>
        <p >${film.plot}</p>
        </td>
    </tr>
    </table><br>`;
}