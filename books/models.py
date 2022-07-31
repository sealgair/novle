from django.db import models


def norm(num):
    return int(num / abs(num))


class Author(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    pub_year = models.IntegerField(null=True)
    opening = models.TextField(blank=True)

    @property
    def lines(self):
        return self.opening.split('\n')

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def compare(self, other):
        return {
            'book': other == self,
            'author': other.author == self.author,
            'year': norm(other.pub_year - self.pub_year),
        }

