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
    # if request.method == 'POST':
    #     tipo_vino = int(request.POST['tipo_vino'])
    #     price = int(request.POST['price'])
    #     wines_filter = Vino.objects.filter(
    #         precio_medio__lte=price, 
    #         tipo_id=tipo_vino)
    #     wines_count = Vino.objects.filter(
    #         precio_medio__lte=price, 
    #         tipo_id=tipo_vino).count()
    #     wines_pk = []
    #     random_wine_id = 0
    #     # Si hay al menos un vino...
    #     if wines_count > 0:
    #         # Recorrer los vinos
    #         for wine in wines_filter:
    #             # Conseguir el id de los vinos
    #             wines_pk.append(wine.id)
    #         # Escoger un vino aleatorio gracias al id
    #         random_wine_id = random.choice(wines_pk)
    #         # Buscar la bodega que corresponde con ese id de vino
    #         bodega = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE mainapp_vino.id = {random_wine_id}")
    #         # Buscar el tipo de vino que corresponde con ese id de vino
    #         tipo_vino = Tipo.objects.raw(f"SELECT mainapp_tipo.id, tipo_vino FROM mainapp_tipo INNER JOIN mainapp_vino ON mainapp_tipo.id = mainapp_vino.tipo_id WHERE mainapp_vino.id = {random_wine_id}")
    #         variedad = Variedad.objects.raw(f"SELECT mainapp_variedad.id, mainapp_variedad.nombre_variedad FROM mainapp_variedad INNER JOIN mainapp_vino_variedad ON mainapp_variedad.id = mainapp_vino_variedad.variedad_id INNER JOIN mainapp_vino ON mainapp_vino_variedad.vino_id = mainapp_vino.id WHERE mainapp_vino.id = {random_wine_id}")
    #         # Buscar el vino con ese id
    #         wine = Vino.objects.filter(pk=random_wine_id)
    #         data_bodega = serializers.serialize('json', bodega)
    #         data_wine = serializers.serialize('json', wine)
    #         data_tipo = serializers.serialize('json', tipo_vino)
    #         data_variedad = serializers.serialize('json', variedad)
    #         return JsonResponse({"wine": data_wine, "bodega": data_bodega, "tipo": data_tipo, "variedad": data_variedad})

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
            # Recorrer los vinos
            for wine in wines_filter:
                # Conseguir el id de los vinos
                wines_pk.append(wine.id)
            # Escoger un vino aleatorio gracias al id
            random_wine_id = random.choice(wines_pk)
            # Buscar el vino con ese id
            vino = Vino.objects.get(pk=random_wine_id)
            # Buscar las variedades que corresponde con ese id de vino
            variedades = vino.variedad.all()
            # Buscar la bodega que corresponde con ese id de vino
            bodega = Bodega.objects.raw(f"SELECT mainapp_bodega.id, nombre_bodega FROM mainapp_bodega INNER JOIN mainapp_vino ON mainapp_bodega.id = mainapp_vino.bodega_id WHERE mainapp_vino.id = {random_wine_id}")
            # Buscar el tipo de vino que corresponde con ese id de vino
            tipo_vino = Tipo.objects.raw(f"SELECT mainapp_tipo.id, tipo_vino FROM mainapp_tipo INNER JOIN mainapp_vino ON mainapp_tipo.id = mainapp_vino.tipo_id WHERE mainapp_vino.id = {random_wine_id}")

            wines = Vino.objects.raw(f"SELECT id, url_imagen FROM `mainapp_vino` WHERE mainapp_vino.id = {random_wine_id}")
            data_wine = serializers.serialize('json', wines)
            data_variedad = serializers.serialize('json', variedades)
            data_bodega = serializers.serialize('json', bodega)
            data_tipo = serializers.serialize('json', tipo_vino)
            return JsonResponse({"vinos": data_wine, "bodega": data_bodega, "tipo": data_tipo, "variedad": data_variedad})

