from django.db import models

from books.models import Book


class Solution(models.Model):
    book = models.ForeignKey(Book, null=True, on_delete=models.SET_NULL, related_name='solutions')
    date = models.DateField(null=False)

    @property
    def order(self):
        return Solution.objects.filter(date__lte=self.date).count()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
