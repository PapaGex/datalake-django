from django.contrib import admin
from .models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CustomUser._meta.fields]
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'address')
    ordering = ('first_name', 'last_name')
    list_per_page = 25

admin.site.register(CustomUser, CustomUserAdmin)

