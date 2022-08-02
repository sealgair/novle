import re

from django.contrib import admin
from django.db import models
from django.forms import TextInput
from django.utils.html import format_html

from books.models import Author, Book


class BookInline(admin.TabularInline):
    model = Book
    fields = ['title', 'pub_year']
    extra = 6


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    exclude = []
    inlines = [BookInline]


class NeedsOpeningFilter(admin.SimpleListFilter):
    title = "Needs Opening"
    parameter_name = 'opening'

    def lookups(self, request, model_admin):
        return (
            ('True', 'Yes'),
            ('False', 'No'),
        )

    def queryset(self, request, queryset):
        regex = r'(\S+.*(\n|$)){6}'
        if self.value() == 'True':
            return queryset.exclude(opening__iregex=regex)
        elif self.value() == 'False':
            return queryset.filter(opening__iregex=regex)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    class Media:
        js = ('//code.jquery.com/jquery-3.6.0.min.js', '/admin/js/inventory/line_counter.js',)

    fieldsets = (
        (None, {
            'fields': (
                'title',
                'author',
                'pub_year',
                'goole_books',
                'opening',
            )
        }),
    )
    readonly_fields = ('lines', 'goole_books')
    list_display = ['title', 'author', 'lines']
    search_fields = ['title', 'author']
    list_filter = [NeedsOpeningFilter]
    formfield_overrides = {
        models.IntegerField: {'widget': TextInput},
    }

    def lines(self, obj):
        return len([
            l for l in re.split(r'\s*\n+\s*', obj.opening)
            if l
        ])

    def goole_books(self, obj):
        """
        https://www.google.com/search?q=intitle:%22Great+Expectations%22+inauthor:%22Charles+Dickens%22&sxsrf=ALiCzsbHQGpnJ25Zm1mKZ5n6S14lZUCz1Q:1659452384381&source=lnms&tbm=bks&sa=X&ved=2ahUKEwjn4ZHvtaj5AhWLhIkEHTceCLEQ_AUoAnoECAIQBA&biw=1440&bih=762&dpr=2
        """
        url = f'https://www.google.com/search?tbm=bks&q=intitle:%22{obj.title}%22+inauthor:%22{obj.author.name}%22'
        return format_html("""<a href="{url}" target="_blank">search google books</a>""", url=url)