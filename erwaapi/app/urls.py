from django.urls import path, include
from .views import admin_view, user_view, hello_view

urlpatterns = [
    path('user/', include((user_view.user_patterns, "app"), namespace="user")),
    path('admin/', include((admin_view.user_patterns, "app"), namespace="admin")),
    path('hello', hello_view.hello),
]