"""Novle URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.urls import path, re_path

from books.views import BooksApi
from puzzles.views import DayView, GuessView


def static_root(request, *args, **kwargs):
    path = request.path if request.path.strip('/') else 'index.html'
    return serve(request, path)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('books.json', BooksApi.as_view(), name='books'),
    path('today.json', DayView.as_view(), name='solution'),
    path('guess.json', GuessView.as_view(), name='solution'),
] + static(settings.FONT_URL, document_root=settings.FONT_ROOT) + [
    re_path('.*', static_root),
]
