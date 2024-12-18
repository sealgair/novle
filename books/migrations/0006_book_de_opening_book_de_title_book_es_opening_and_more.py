# Generated by Django 4.0.6 on 2022-08-12 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0005_book_alternate_titles_book_coauthors_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='de_opening',
            field=models.TextField(blank=True, verbose_name='opening (Deutsche)'),
        ),
        migrations.AddField(
            model_name='book',
            name='de_title',
            field=models.CharField(blank=True, max_length=256, verbose_name='title (Deutsche)'),
        ),
        migrations.AddField(
            model_name='book',
            name='es_opening',
            field=models.TextField(blank=True, verbose_name='opening (Español)'),
        ),
        migrations.AddField(
            model_name='book',
            name='es_title',
            field=models.CharField(blank=True, max_length=256, verbose_name='title (Español)'),
        ),
        migrations.AddField(
            model_name='book',
            name='fr_opening',
            field=models.TextField(blank=True, verbose_name='opening (Français)'),
        ),
        migrations.AddField(
            model_name='book',
            name='fr_title',
            field=models.CharField(blank=True, max_length=256, verbose_name='title (Français)'),
        ),
        migrations.AddField(
            model_name='book',
            name='ru_opening',
            field=models.TextField(blank=True, verbose_name='opening (русский)'),
        ),
        migrations.AddField(
            model_name='book',
            name='ru_title',
            field=models.CharField(blank=True, max_length=256, verbose_name='title (русский)'),
        ),
    ]
