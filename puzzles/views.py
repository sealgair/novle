from datetime import timezone, timedelta, datetime

from django.db.models import Count

from bookle.utils import ApiView
from books.models import Book
from puzzles.models import Solution


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
            book = Book.objects.annotate(usages=Count('solutions')).order_by('usages', '?').first()
            solution = Solution.objects.create(date=date, book=book)
        return {
            'book': solution.book.id,
            'lines': solution.book.lines
        }