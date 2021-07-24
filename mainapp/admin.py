from django.contrib import admin
from .models import Bodega, Variedad, Tipo, Vino


# Configuración extra
class PageBodega(admin.ModelAdmin):
    ordering = ('nombre_bodega',)

class PageVariedad(admin.ModelAdmin):
    ordering = ('nombre_variedad',)

class PageTipo(admin.ModelAdmin):
    ordering = ('tipo_vino',)

class PageVino(admin.ModelAdmin):
    ordering = ('nombre_vino',)

# Register your models here.
admin.site.register(Bodega, PageBodega)
admin.site.register(Variedad, PageVariedad)
admin.site.register(Tipo, PageTipo)
admin.site.register(Vino, PageVino)

# Configurar título y subtítulo del panel
title = "Random Wine"
admin.site.site_header = title
admin.site.site_title = title
admin.site.index_title = "Panel de gestión"