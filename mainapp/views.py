from django.shortcuts import render
from mainapp.models import Bodega, Variedad, Tipo, Vino

from django.core import serializers
from django.http import JsonResponse

# NEW
from django.db.models import Subquery

# END NEW

# https://engineertodeveloper.com/how-to-save-ajax-data-to-the-database-in-django/

# Create your views here.
def index(request):
    return render(request, 'index.html')

# Busca tipos de vinos
def kindOfWine(request): 
    if request.method == 'GET':
        response = Tipo.objects.raw("SELECT id, tipo_vino FROM mainapp_tipo ORDER BY tipo_vino")
        data = serializers.serialize('json', response)
        return JsonResponse({"wines": data})



def searchWine(request):
    if request.method == 'POST':
        tipo_vino = int(request.POST['tipo_vino'])
        price = int(request.POST['price'])
        wines = Vino.objects.filter(
            precio_medio__lte=price, 
            tipo_id=tipo_vino)
        bodegas = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE precio_medio <= {price} AND tipo_id = {tipo_vino}")
        data_wines = serializers.serialize('json', wines)
        data_bodegas = serializers.serialize('json', bodegas)
        return JsonResponse({"wines": data_wines, "bodegas": data_bodegas})

