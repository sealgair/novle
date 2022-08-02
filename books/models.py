from django.db import models


def norm(num):
    if num == 0:
        return 0
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

    class Meta:
        ordering = ['author__name', '-pub_year', 'title']

    @property
    def lines(self):
        lines = []
        for line in self.opening.split('\n'):
            line = line.strip()
            if line and len(lines) < 6:
                lines.append(line+' ')
            else:
                if line == '':
                    line = '\n'
                lines[-1] += line
        return lines

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def compare(self, other):
        return {
            'book': other == self,
            'author': other.author == self.author,
            'year': norm(other.pub_year - self.pub_year),
        }

