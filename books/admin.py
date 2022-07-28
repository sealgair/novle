from django.contrib import admin
from django.db import models
from django.forms import TextInput

from books.models import Author, Book


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    exclude = []


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'title',
                'author',
                'pub_year',
                'opening'
            )
        }),
    )
    list_display = ['title', 'author']
    formfield_overrides = {
        models.IntegerField: {'widget': TextInput},
    }