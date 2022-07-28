from django.contrib import admin

from puzzles.models import Solution


@admin.register(Solution)
class AuthorAdmin(admin.ModelAdmin):
    fields = ['book', 'date']
    list_display = ['book', 'date', 'order']
