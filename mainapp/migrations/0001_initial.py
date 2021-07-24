# Generated by Django 3.0.5 on 2021-07-24 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bodega',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_bodega', models.CharField(max_length=150, verbose_name='Bodega')),
            ],
        ),
        migrations.CreateModel(
            name='Tipo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_vino', models.CharField(max_length=150, verbose_name='Tipo')),
            ],
        ),
        migrations.CreateModel(
            name='Variedad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_variedad', models.CharField(max_length=150, verbose_name='Variedad')),
            ],
        ),
        migrations.CreateModel(
            name='Vino',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_vino', models.CharField(max_length=150, verbose_name='Nombre del vino')),
                ('precio_medio', models.DecimalField(decimal_places=2, max_digits=8)),
                ('bodega', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.Bodega', verbose_name='Bodega')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.Tipo', verbose_name='Tipo')),
                ('variedad', models.ManyToManyField(blank=True, to='mainapp.Variedad', verbose_name='Variedad')),
            ],
        ),
    ]
