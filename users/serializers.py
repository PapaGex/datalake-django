from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        # fields = [
        #     'id', 'username', 'email', 'first_name', 'last_name',
        #     'phone', 'address', 'photo', 'password', 
        # ]
        # extra_kwargs = {
        #     'password': {'write_only': True},
        # }