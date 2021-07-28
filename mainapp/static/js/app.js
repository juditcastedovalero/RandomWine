
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
    let imageContainer = document.getElementById('image')
    vino = JSON.parse(response.wine);
    bodega = JSON.parse(response.bodega);
    tipo_response = JSON.parse(response.tipo);
    console.log('vino', vino)
    console.log('bodega:', bodega)
    console.log('tipo:', tipo_response)

    var currentUrl = window.location.href;
    let img = document.createElement('img')
    img.setAttribute('src', currentUrl + 'media/' + vino[0]['fields']['url_imagen'])
    console.log(currentUrl)

    while (imageContainer.firstChild) { // borrem tots els fills
        imageContainer.removeChild(imageContainer.firstChild);
    }

    imageContainer.appendChild(img)
}

// def searchWine(request):
//     if request.method == 'POST':
//         tipo_vino = int(request.POST['tipo_vino'])
//         price = int(request.POST['price'])
//         wines = Vino.objects.filter(
//             precio_medio__lte=price, 
//             tipo_id=tipo_vino)
//         bodegas = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE precio_medio <= {price} AND tipo_id = {tipo_vino}")
//         data_wines = serializers.serialize('json', wines)
//         data_bodegas = serializers.serialize('json', bodegas)
//         return JsonResponse({"wines": data_wines, "bodegas": data_bodegas})



// def searchWine(request):
//     if request.method == 'POST':
//         tipo_vino = int(request.POST['tipo_vino'])
//         price = int(request.POST['price'])
//         wines = Vino.objects.filter(
//             precio_medio__lte=price, 
//             tipo_id=tipo_vino)
//         bodegas = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE precio_medio <= {price} AND tipo_id = {tipo_vino}")
//         data_wines = serializers.serialize('json', wines)
//         data_bodegas = serializers.serialize('json', bodegas)
//         return JsonResponse({"wines": data_wines, "bodegas": data_bodegas})




// RANDOM
// wines_pk = []
// for wine in wines:
//     wines_pk.append({
//         'pk': wine.id
//     })
// vinos_id = {
//     'wine_pk': wines_pk
// }
// # Random id de la consulta de vinos después de filtrar
// vino_id = vino_id = vinos_id['wine_pk'][random_position]