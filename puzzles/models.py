from django.db import models

from books.models import Book, HAS_OPENING_REGEX


class Solution(models.Model):
    book = models.ForeignKey(Book, null=True, on_delete=models.SET_NULL, related_name='solutions',
                             limit_choices_to={'opening__iregex': HAS_OPENING_REGEX})
    date = models.DateField(null=False)

    @property
    def order(self):
        return Solution.objects.filter(date__lte=self.date).count()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.book.title} for {self.date}"
