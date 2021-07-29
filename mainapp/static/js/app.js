
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

// Obtener todos los tipos de vinos
function kindOfWine() {
    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            response = JSON.parse(ajax.responseText);
            vino = JSON.parse(response.wines);
            console.log('tipos de vinos', vino)
            drawForm(vino)
            // console.log(vino[0]["fields"]["tipo_vino"])
        }
    }
    ajax.open('get', '/kindOfWine', true);
    ajax.send();
}

// Dibujar el formulario para buscar el vino
function drawForm(vino) {
    let selecTipoVino = document.querySelector('#tipo')
    for (let i = 0; i < vino.length; i++) {
        let option = document.createElement("option")
        option.setAttribute('value', vino[i]['pk'])
        option.textContent = vino[i]['fields']['tipo_vino']
        selecTipoVino.appendChild(option)
    }
}

// Manda los datos para buscar resultados de los valores pasados por el formulario
function searchWines() {
    const csrftoken = getCookie('csrftoken');
    var datasend = new FormData();
    
    let tipo_vino = document.getElementById('tipo').value
    let max_price = document.getElementById('price').value

    datasend.append('csrfmiddlewaretoken', csrftoken);

    datasend.append('tipo_vino', tipo_vino);
    datasend.append('price', max_price);

    console.log('token:', csrftoken)

    var ajax = new objetoAjax();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if(ajax.status==200) {
                response = JSON.parse(ajax.responseText);
                drawWine(response)
            }
        }
    }
    ajax.open('POST', '/searchWine/', true);
    ajax.send(datasend);
}

// Dibuja el vino resultado de la query
function drawWine(response) {
    let wineContainer = document.getElementById('container-wine')
    let imageContainer = document.getElementById('image')
    let bodegaContainer = document.getElementById('bodega')
    let tipoContainer = document.getElementById('tipo_vino')
    let uvaContainer = document.getElementById('uva')

    vino_response = JSON.parse(response.wine);
    bodega_response = JSON.parse(response.bodega);
    tipo_response = JSON.parse(response.tipo);
    variedad_response = JSON.parse(response.variedad);
    console.log('vino', vino)
    console.log('bodega:', bodega_response)
    console.log('tipo:', tipo_response)
    console.log('variedad:', variedad_response)

    var currentUrl = window.location.href;
    let img = document.createElement('img')
    img.setAttribute('src', currentUrl + 'media/' + vino_response[0]['fields']['url_imagen'])
    console.log(currentUrl)

    wineContainer.setAttribute('class', 'container-wine')

    let pBodega = document.createElement('p')
    pBodega.textContent = "Bodega: "
    let spanBodega = document.createElement('span')
    let pTipo = document.createElement('p')
    pTipo.textContent = 'Tipo: '
    let spanTipo = document.createElement('span')

    spanBodega.textContent = bodega_response[0]['fields']['nombre_bodega']
    spanTipo.textContent = tipo_response[0]['fields']['tipo_vino']

    while (imageContainer.firstChild) { // borrem tots els fills
        imageContainer.removeChild(imageContainer.firstChild);
    }
    while (bodegaContainer.firstChild) { // borrem tots els fills
        bodegaContainer.removeChild(bodegaContainer.firstChild);
    }
    while (tipoContainer.firstChild) { // borrem tots els fills
        tipoContainer.removeChild(tipoContainer.firstChild);
    }
    while (uvaContainer.firstChild) { // borrem tots els fills
        uvaContainer.removeChild(uvaContainer.firstChild);
    }

    imageContainer.appendChild(img)
    bodegaContainer.appendChild(pBodega)
    pBodega.appendChild(spanBodega)
    tipoContainer.appendChild(pTipo)
    pTipo.appendChild(spanTipo)
    let pUva = document.createElement('p')
    pUva.textContent = 'Uva: '
    uvaContainer.appendChild(pUva)

    for (let i = 0; i < variedad_response.length; i++) {
        let spanUva = document.createElement('span')
        if (i == variedad_response.length - 1) {
            spanUva.textContent = variedad_response[i]['fields']['nombre_variedad']
        } else {
            spanUva.textContent = variedad_response[i]['fields']['nombre_variedad'] + ', '
        }
        pUva.appendChild(spanUva)
    }
}
