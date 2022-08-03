import re

from urllib.parse import quote as urlquote

from django.contrib import admin
from django.contrib.admin.templatetags.admin_urls import add_preserved_filters
from django.db import models
from django.forms import TextInput
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import gettext as _

from books.models import Author, Book


class BookInline(admin.TabularInline):
    model = Book
    fields = ['title', 'pub_year']
    extra = 6


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    exclude = []
    inlines = [BookInline]


class NeedsOpeningFilter(admin.SimpleListFilter):
    title = "Needs Opening"
    parameter_name = 'opening'

    def lookups(self, request, model_admin):
        return (
            ('True', 'Yes'),
            ('False', 'No'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'True':
            return queryset.has_opening(invert=True)
        elif self.value() == 'False':
            return queryset.has_opening()


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    fieldsets = (
        (None, {
            'fields': (
                'title',
                'author',
                'pub_year',
                'goole_books',
                'opening',
            )
        }),
    )
    readonly_fields = ('lines', 'goole_books')
    list_display = ['title', 'author', 'lines']
    search_fields = ['title', 'author']
    list_filter = [NeedsOpeningFilter]
    formfield_overrides = {
        models.IntegerField: {'widget': TextInput},
    }

    def render_change_form(self, request, context, add=False, change=False, form_url="", obj=None):
        context.update({
            'show_save_and_edit_next': Book.objects.has_opening(invert=True).exists()
        })
        return super().render_change_form(request, context, add, change, form_url, obj)

    def response_change(self, request, obj):
        response = super().response_change(request, obj)
        opts = self.model._meta
        preserved_filters = self.get_preserved_filters(request)
        msg_dict = {
            "name": opts.verbose_name,
            "obj": format_html('<a href="{}">{}</a>', urlquote(request.path), obj),
        }
        if "_editnext" in request.POST:
            try:
                next = Book.objects.has_opening(invert=True).first()
            except Book.DoesNotExist:
                msg = format_html(
                    _("There are no more books missing opening lines. Congratulations!"),
                )
                self.message_user(request, msg, messages.SUCCESS)
                return response
            msg_dict['next'] = next
            msg = format_html(
                _(
                    "You may edit {next} below."
                ),
                **msg_dict,
            )
            self.message_user(request, msg, messages.SUCCESS)
            redirect_url = reverse(
                "admin:%s_%s_change" % (opts.app_label, opts.model_name),
                kwargs={'object_id': next.id},
                current_app=self.admin_site.name,
            )
            redirect_url = add_preserved_filters(
                {"preserved_filters": preserved_filters, "opts": opts}, redirect_url
            )
            return HttpResponseRedirect(redirect_url)
        else:
            return response

    def lines(self, obj):
        return len([
            l for l in re.split(r'\s*\n+\s*', obj.opening)
            if l
        ])

    def goole_books(self, obj):
        """
        https://www.google.com/search?q=intitle:%22Great+Expectations%22+inauthor:%22Charles+Dickens%22&sxsrf=ALiCzsbHQGpnJ25Zm1mKZ5n6S14lZUCz1Q:1659452384381&source=lnms&tbm=bks&sa=X&ved=2ahUKEwjn4ZHvtaj5AhWLhIkEHTceCLEQ_AUoAnoECAIQBA&biw=1440&bih=762&dpr=2
        """
        url = f'https://www.google.com/search?tbm=bks&q=intitle:%22{obj.title}%22+inauthor:%22{obj.author.name}%22'
        return format_html("""<a href="{url}" target="_blank">search google books</a>""", url=url)