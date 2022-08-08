from datetime import timezone, timedelta, datetime

from django.db.models import Count
from django.shortcuts import get_object_or_404

from bookle.utils import ApiView
from books.models import Book
from puzzles.models import Solution


class GuessView(ApiView):
    def cache_vary(self, request, *args, **kwargs):
        return [
            request.GET.get('puzzle', 'None'),
            request.GET.get('book', 'None')
        ]

    def get(self, request):
        guess = get_object_or_404(Book, id=request.GET.get('book', None))
        solution = get_object_or_404(Solution, id=request.GET.get('puzzle', None))
        hint = guess.compare(solution.book)
        return {
            'success': hint['book'],
            'book': guess.title,
            'extra': guess.alternate_titles,
            'authors': [
                author.name for author in guess.all_authors()
            ],
            'year': guess.pub_year,
            'hint': hint,
        }


class DayView(ApiView):
    def get_date(self, request):
        tzoff = request.GET.get('tz', 0)
        tz = timezone(timedelta(minutes=-int(tzoff)))
        return datetime.now(tz).date()

    def cache_vary(self, request, *args, **kwargs):
        return [
            str(self.get_date(request))
        ]

    def get(self, request):
        date = self.get_date(request)
        try:
            solution = Solution.objects.get(date=date)
        except Solution.DoesNotExist:
            try:
                book = Book.objects.has_opening().exclude(skip_puzzle=True)\
                    .annotate(usages=Count('solutions')).order_by('usages', '?').first()
                solution = Solution.objects.create(date=date, book=book)
            except Book.DoesNotExist:
                return {
                    'lines': ["There are no books set up yet. Please try back later."]
                }

        return {
            'id': solution.id,
            'order': solution.order,
            'book': solution.book.id,
            'lines': solution.book.lines,
        }