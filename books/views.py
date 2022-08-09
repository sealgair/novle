from django.shortcuts import render

from novle.utils import ApiView
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
                'alternate_titles': b.alternate_titles,
                'authors': [
                    author.name for author in b.all_authors()
                ],
                'year': b.pub_year,
            }
            for b in Book.objects.all()
        ]