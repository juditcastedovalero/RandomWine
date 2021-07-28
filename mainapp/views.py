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
        bodega = Bodega.objects.all()
        wines = Vino.objects.filter(
            precio_medio__lte=price, 
            tipo_id=tipo_vino)
        wines_count = Vino.objects.filter(
            precio_medio__lte=price, 
            tipo_id=tipo_vino).count()
        wines_pk = []
        random_position = 0
        if wines_count > 0:
            for wine in wines:
                wines_pk.append(wine.id)
                random_position = random.choice(wines_pk)
            # Random id de la consulta de vinos después de filtrar
            return JsonResponse({"wines": random_position})


