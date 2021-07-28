from django.shortcuts import render
from mainapp.models import Bodega, Variedad, Tipo, Vino

from django.core import serializers
from django.http import JsonResponse

# NEW
import random

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
        wines_filter = Vino.objects.filter(
            precio_medio__lte=price, 
            tipo_id=tipo_vino)
        wines_count = Vino.objects.filter(
            precio_medio__lte=price, 
            tipo_id=tipo_vino).count()
        wines_pk = []
        random_wine_id = 0
        # Si hay al menos un vino...
        if wines_count > 0:
            # Recorremos los vinos
            for wine in wines_filter:
                # Conseguimos el id de los vinos
                wines_pk.append(wine.id)
                # Escogemos un vino aleatorio gracias al id
                random_wine_id = random.choice(wines_pk)
                bodega = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE mainapp_vino.id = {random_wine_id}")
                tipo_vino = Tipo.objects.raw(f"SELECT mainapp_tipo.id, tipo_vino FROM mainapp_tipo INNER JOIN mainapp_vino ON mainapp_tipo.id = mainapp_vino.tipo_id WHERE mainapp_vino.id = {random_wine_id}")
            # Buscamos el vino con ese id
            wine = Vino.objects.filter(pk=random_wine_id)
            data_bodega = serializers.serialize('json', bodega)
            data_wine = serializers.serialize('json', wine)
            data_tipo = serializers.serialize('json', tipo_vino)
            return JsonResponse({"wine": data_wine, "bodega": data_bodega, "tipo": data_tipo})


