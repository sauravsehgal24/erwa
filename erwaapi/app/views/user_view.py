from django.http import JsonResponse
from django.urls import path
from django.views import View
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_users(request):
    return JsonResponse({"message": "User base route"})

@api_view(['GET'])
def get_profile(request):
    return JsonResponse({"message": "User Profile"})

@api_view(['POST'])
def post_settings(request):
    return JsonResponse({"message": "User Settings"})

@api_view(['POST'])
def login(request):
    return JsonResponse({"message": "User Settings"})

@api_view(['POST'])
def register(request):
    return JsonResponse({"message": "User Settings"})


# Define subroutes
user_patterns = [
    path("login", login, name="login"),
    path("register", login, name="register"),
    path("users", get_users, name="get_users"),
    path("settings", post_settings, name="post_settings"),
    path("profile", get_profile, name="get_profile"),
]
