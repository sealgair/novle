import re

from django.db import models


def norm(num):
    if num == 0:
        return 0
    return int(num / abs(num))


class Author(models.Model):
    name = models.CharField(max_length=256, unique=True)

    def __str__(self):
        return self.name


HAS_OPENING_REGEX = r'(\S+.*(\n|$)){6}'


class BookQuerySet(models.QuerySet):

    def has_opening(self):
        return self.filter(opening__iregex=HAS_OPENING_REGEX)

    def needs_opening(self):
        return self.filter(skip_puzzle=False).exclude(opening__iregex=HAS_OPENING_REGEX)


class BookManager(models.Manager):

    def get_queryset(self):
        return BookQuerySet(self.model, using=self._db)

    def has_opening(self):
        return self.get_queryset().has_opening()

    def needs_opening(self):
        return self.get_queryset().needs_opening()


class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    pub_year = models.IntegerField(null=True)
    opening = models.TextField(blank=True)
    skip_puzzle = models.BooleanField(default=False)

    objects = BookManager()

    class Meta:
        ordering = ['author__name', '-pub_year', 'title']

    @property
    def lines(self):
        lines = []
        if self.opening.strip():
            indent = True
            for line in self.opening.split('\n'):
                line = re.sub(r"_(.+?)_", r'<em>\1</em>', line)
                line = re.sub(r"\s+/\s+", '\n\t', line)
                line = line.strip()
                if line and len(lines) < 6:
                    if indent:
                        line = '\t' + line
                    lines.append(line+' ')
                else:
                    if line == '':
                        line = '\n'
                    lines[-1] += line
                indent = line.endswith('\n')
        return lines

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def compare(self, other):
        return {
            'book': other == self,
            'author': other.author == self.author,
            'year': norm(other.pub_year - self.pub_year),
        }

