from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = [
        (None, {'fields': ['email', 'password']}),
        ('Personal info', {'fields': ['name']}),
        ('Permissions', {'fields': ['is_admin', 'is_active']}),
    ]
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['email', 'name', 'password1', 'password2'],
        }),
    ]
    list_display = ['email', 'name', 'is_admin']
    list_filter = ['is_admin']
    search_fields = ['email', 'name']
    ordering = ['email']
    filter_horizontal = []

admin.site.unregister(Group)
