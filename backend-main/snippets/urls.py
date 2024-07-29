from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet)

snippet_list = SnippetViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
snippet_detail = SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
user_snippet_list = SnippetViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
user_snippet_detail = SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', include(router.urls)),
    path('users/<int:user_id>/snippets/', user_snippet_list, name='user-snippet-list'),
    path('users/<int:user_id>/snippets/<int:pk>/', user_snippet_detail, name='user-snippet-detail'),
]
