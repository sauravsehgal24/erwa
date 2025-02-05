from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import path

@api_view(["GET"])
def admin_view(request):
   return JsonResponse({"message": "admin list"})

# Define subroutes
user_patterns = [
    path("get_admin_list", admin_view, name="admin_view"),
]