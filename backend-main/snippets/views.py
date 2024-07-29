from rest_framework import viewsets, permissions
from .models import Snippet
from .serializers import SnippetSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        if 'user_id' in self.kwargs:
            return Snippet.objects.filter(user_id=self.kwargs['user_id'])
        return Snippet.objects.filter(isPrivate=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
