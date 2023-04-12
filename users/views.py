from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.filters import OrderingFilter

from .models import CustomUser
from.serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    fields = "__all__"
    # fields = ["id", "username", "email", "first_name", "last_name", "photo", "address"]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = ["id", "username", "email", "first_name", "last_name", "photo", "address"]
    filterset_fields = []
    ordering_fields = ['first_name', 'last_name', 'email', 'phone', 'address']

    # Filter queryset by user
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return CustomUser.objects.filter(id=self.request.user.id)
        else:
            return CustomUser.objects.none()
