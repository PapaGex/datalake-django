from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.filters import OrderingFilter

from .models import Customer
from.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'phone', 'address']
    filterset_fields = ['status', 'user']
    ordering_fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'status', 'user']


    # Filter queryset by user
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_superuser:
            return queryset
        if user.is_authenticated:
            return queryset.filter(user=user)
 