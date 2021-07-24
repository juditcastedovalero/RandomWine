
window.addEventListener('DOMContentLoaded', (event) => {
    renderWine()
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

function renderWine() {
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            vino = JSON.parse(ajax.responseText);
            drawBlog(vino);
            console.log('todo bien')
        }
    }
    ajax.open('get', '/renderWine', true);
    ajax.send();
}

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
