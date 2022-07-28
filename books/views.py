from django.shortcuts import render

from bookle.utils import ApiView
from books.models import Book


class BooksApi(ApiView):
    safe = False

    def cache_timeout(self):
        return 60 * 60 * 24 * 5

    def get(self, request):
        return [
            {
                'id': b.id,
                'title': b.title,
                'author': b.author.name,
                'year': b.pub_year,
            }
            for b in Book.objects.all()
        ]