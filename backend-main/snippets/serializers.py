from rest_framework import serializers
from .models import Snippet
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']

class SnippetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Snippet
        fields = ['id', 'user', 'title', 'description', 'code', 'isPrivate']
        read_only_fields = ['user']
