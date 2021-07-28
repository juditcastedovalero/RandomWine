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
        wines = Vino.objects.filter(
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
            for wine in wines:
                # Conseguimos el id de los vinos
                wines_pk.append(wine.id)
                # Escogemos un vino aleatorio gracias al id
                random_wine_id = random.choice(wines_pk)
            # Buscamos el vino con ese id
            wine = Vino.objects.filter(pk=random_wine_id)
            data_wine = serializers.serialize('json', wine)
            return JsonResponse({"wines": data_wine})


