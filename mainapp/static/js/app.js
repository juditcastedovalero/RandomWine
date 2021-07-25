
window.addEventListener('DOMContentLoaded', (event) => {
    kindOfWine()
});

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function kindOfWine() {
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            response = JSON.parse(ajax.responseText);
            vino = JSON.parse(response.wines);
            console.log(vino)
            drawWine(vino)
            // console.log(vino[0]["fields"]["tipo_vino"])
        }
    }
    ajax.open('get', '/kindOfWine', true);
    ajax.send();
}

function drawWine(vino) {
    let selecTipoVino = document.querySelector('#tipo')
    for (let i = 0; i < vino.length; i++) {
        let option = document.createElement("option")
        option.setAttribute('value', vino[i]['pk'])
        option.textContent = vino[i]['fields']['tipo_vino']
        selecTipoVino.appendChild(option)
    }
}

function searchWines() {
    const csrftoken = getCookie('csrftoken');
    var datasend = new FormData();
    
    let tipo_vino = document.getElementById('tipo').value
    let max_price = document.getElementById('price').value

    datasend.append('csrfmiddlewaretoken', csrftoken);

    datasend.append('tipo_vino', tipo_vino);
    datasend.append('price', price);

    console.log('token:', csrftoken)

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            response = JSON.parse(ajax.responseText);
            console.log(response)
        }
    }
    ajax.open('POST', '/searchWine/', true);
    ajax.send(datasend);
}

//  path('searchWine/', mainapp.views.searchWine, name="search-wine"),


// function renderBlog() {
//     let titulo = document.querySelector('.container--titulo input');
//     let descripcion = document.querySelector('.container--descripcion input');
//     let imgAntes = document.querySelector('.container--img-antes input');
//     let imgDespues = document.querySelector('.container--img-despues input');
//     if (titulo) {
//         titulo.value = "";
//     }
//     if (descripcion) {
//         descripcion.value = "";
//     }
//     if (imgAntes) {
//         imgAntes.value = "";
//     }
//     if (imgDespues) {
//         imgDespues.value = "";
//     }

//     var ajax = new objetoAjax();
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             entries = JSON.parse(ajax.responseText);
//             drawBlog(entries);
//         }
//     }
//     ajax.open('get', 'renderBlog', true);
//     ajax.send();
// }

// function drawBlog(entries) {
//     let divContainerBlog = document.querySelector('.container--blog');
//     while (divContainerBlog.firstChild) { // borrem tots els fills
//         divContainerBlog.removeChild(divContainerBlog.firstChild);
//     }
//     for (let i = 0; i < entries.length; i++) {
//         const containerTitleBlog = document.createElement('div');
//         containerTitleBlog.classList.add('container--title-blog');
//         divContainerBlog.appendChild(containerTitleBlog);
//         // h2 titulo
//         const tituloBlog = document.createElement('h2');
//         tituloBlog.textContent = entries[i].titulo;
//         containerTitleBlog.appendChild(tituloBlog);
//         // Eliminar
//         const iTrash = document.createElement('i');
//         iTrash.classList.add('fas');
//         iTrash.classList.add('fa-trash');
//         iTrash.setAttribute('onclick', 'onClickDropEntry(event,' + entries[i].id + ')');
//         containerTitleBlog.appendChild(iTrash);
//     }
// }
