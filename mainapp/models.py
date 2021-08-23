from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.

class Bodega(models.Model):
    nombre_bodega = models.CharField(max_length=150, verbose_name="Bodega")
    def __str__(self):
        return self.nombre_bodega

class Variedad(models.Model):
    nombre_variedad = models.CharField(max_length=150, verbose_name="Variedad")
    class Meta:
        verbose_name_plural = "Variedades"
    def __str__(self):
        return self.nombre_variedad

class Tipo(models.Model):
    tipo_vino = models.CharField(max_length=150, verbose_name="Tipo")
    def __str__(self):
        return self.tipo_vino

class Vino(models.Model):
    nombre_vino = models.CharField(max_length=150, verbose_name='Nombre del vino')
    bodega = models.ForeignKey(Bodega, verbose_name="Bodega", on_delete=CASCADE)
    variedad = models.ManyToManyField(Variedad, verbose_name="Variedad", blank=True)
    tipo = models.ForeignKey(Tipo, verbose_name="Tipo", on_delete=CASCADE)
    precio_medio = models.DecimalField(max_digits=8, decimal_places=2)
    url_imagen = models.URLField()
    def __str__(self):
        return f"{self.nombre_vino} de {self.bodega}"
