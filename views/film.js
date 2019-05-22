

 function getComments(){
    $.get(`/comments/film/${$('#filmId').val()}`, resp => {
        let resStr = '';
        resp.forEach(el => {

            resStr += ` <p style="margin-left: 10%;  margin-right: auto ">
                            <img src=${el.user.photo} height = 35 width = 35 style="border: solid 1px transparent;border-radius: 50%;height: 90%;margin: 0.2% 0 0 0.2%;position: relative;"/>
                            ${el.user.first_name}
                            ${getDate(el.updatedAt)}
                            <br>
                            ${el.message}
                        <p/>`;
        });
        $('#comments').empty().append(resStr);
    });
 }

 function sendComment(){
     if($('#commArea').val() != '') {
        axios.post(`/comments`, {
            filmId: `${$('#filmId').val()}`,
            userId: `${$('#userId').val()}`,
            message: `${$('#commArea').val()}`
        })
        .then((resp) =>{
            $('#commArea').empty().append('');
            getComments();
        });
     }
     else
        alert('Введите текст комментария');
 }

 function addVideo(){
    if($('#filmId').val()!=''&& $('#link').val()!=''&& $('#preview_text').val()!='') {
        axios.post('/videos', {
            filmId:         $('#filmId').val(),
            link:           $('#link').val(),
            preview_text:   $('#preview_text').val(),
        })
        .then((resp) => {
            console.log(resp);
            let iframe = `
            <iframe width="640" height="360" src="${resp.data.link}" allowfullscreen="allowfullscreen"></iframe>
            <br>
            <small>${resp.data.preview_text}</small><br>
            `;
            $('#videoPlace').append(iframe);
        })
        .catch((err) => {alert(err)});
    }
    else
        alert('все поля должны быть заполнены');
 }

function getDate(dateStr) {
    let date = new Date(dateStr);
    var options = { year:"numeric", month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit" };
    return date.toLocaleDateString('en-US', options);
} 

function updateFilm (){
    // body = {
    //     name: $('#name'),
    //     genre: $('#genre'),
    //     country: $('#country'),
    //     age_limit: $('#age_limit'),
    //     plot: $('#plot'),
    //     release_date: $('#release_date'),
    //     release_bel: $('#release_bel'),
    //     release_rus: $('#release_rus'),
    //     in_roles: $('#in_roles'),
    //     director: $('#director'),
    // }
    let formData = new FormData();
    formData.append('name',         $('#name').val());
    formData.append('genre',        $('#genre').val());
    formData.append('country',      $('#country').val());
    formData.append('age_limit',    $('#age_limit').val());
    formData.append('plot',         $('#plot').val());
    formData.append('release_date', $('#release_date').val());
    formData.append('release_bel',  $('#release_bel').val());
    formData.append('release_rus',  $('#release_rus').val());
    formData.append('in_roles',     $('#in_roles').val());
    formData.append('director',     $('#director').val());
    formData.append('file', document.getElementById('file').files[0]);

    $.ajax({
        url: `/films/${$('#filmId')}`,
        contentType: 'multipart/form-data',
        type: "PUT",
        dataType : "json",
        data: formData,
        success: function(data){
            $('#filmName') = data.name;
            console.log(data);
        }
    });
}
