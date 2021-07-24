from django.shortcuts import render
from mainapp.models import Bodega, Variedad, Tipo, Vino
# NEW
# from django.template.loader import render_to_string
from django.http import HttpResponse
import json
from django.core import serializers
from django.http import JsonResponse
# END NEW

# https://engineertodeveloper.com/how-to-save-ajax-data-to-the-database-in-django/

# Create your views here.
def index(request):
    return render(request, 'index.html')

def renderWine(request):
    if request.method == 'GET':
        # response = Tipo.objects.all().values_list('tipo_vino', flat=True)
        response = Tipo.objects.raw("SELECT id, tipo_vino FROM mainapp_tipo")
        # response = Tipo.objects.all()
        data = serializers.serialize('json', list(response))
        return HttpResponse(json.dumps(data))
        # return JsonResponse({"tipo":data})
        # return HttpResponse(
        #     json.dumps(response),
        #     content_type="application/json"
        # )


    # public function renderBlog() {
    #     try{
    #         DB::beginTransaction();
    #         $query='SELECT `id`, `titulo`, `descripcion`, `img_antes`, `img_despues` FROM `tbl_blog`';
    #         $entries = DB::select($query);
    #         DB::commit();
    #         return response()->json($entries, 200);
    #     }catch(\Throwable $th){
    #         DB::rollBack();
    #         echo $th;
    #     }
    # }