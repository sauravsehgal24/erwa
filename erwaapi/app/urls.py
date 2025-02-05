from django.urls import path, include
from .views import login_view, admin_view, user_view, hello_view

urlpatterns = [
    path('login', login_view.login_view),
    path('user/', include((user_view.user_patterns, "app"), namespace="user")),
    path('admin/', include((admin_view.user_patterns, "app"), namespace="admin")),
    path('hello', hello_view.hello),
]