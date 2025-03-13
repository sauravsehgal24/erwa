from rest_framework import serializers
from ..models.UserModel import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']  # Exclude password field for security
