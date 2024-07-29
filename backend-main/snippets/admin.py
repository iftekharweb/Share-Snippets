from django.contrib import admin
from .models import Snippet

@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'language', 'isPrivate']
    search_fields = ['title', 'language', 'code']
    list_filter = ['isPrivate', 'user', 'language']
