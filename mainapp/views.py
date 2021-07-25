from django.shortcuts import render
from mainapp.models import Bodega, Variedad, Tipo, Vino

# NEW
from django.core import serializers
from django.http import JsonResponse



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
        data = 'OK'
        return JsonResponse({"todo bien": data})