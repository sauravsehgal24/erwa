from django.urls import path, include
from .views import admin_view, user_view, hello_view, ocr_view

urlpatterns = [
    path('user/', include((user_view.user_patterns, "app"), namespace="user")),
    path('admin/', include((admin_view.user_patterns, "app"), namespace="admin")),
    path('ocr/', include((ocr_view.ocr_patterns))),
    path('hello', hello_view.hello),
]