from django.db import models
from django.core.validators import validate_email
from users.models import CustomUser 
import uuid


class Customer(models.Model):

    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]

    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, validators=[validate_email])
    phone = models.CharField(max_length=20, unique=True)
    address = models.TextField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='Active', max_length=20)
    photo = models.URLField(help_text='https://', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CustomUser, related_name="customers", on_delete=models.CASCADE, null=True, blank=True)

    # get_full_name
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
