from django.contrib import admin
from .models import Customer

class CustomerAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Customer._meta.fields]
    list_filter = ('status', 'user')
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'address')
    ordering = ('first_name', 'last_name')
    list_per_page = 25

admin.site.register(Customer, CustomerAdmin)

