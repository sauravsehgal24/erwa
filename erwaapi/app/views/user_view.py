from django.urls import path
import bcrypt
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from app.models.UserModel import User
from app.util import auth_util
from app.util.auth_util import generate_token, decode_token
import json

# Register View
@api_view(['POST'])
def register(request):
    # data = json.loads(request.body)
    # print("in user auth", data)
    data = request.data
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    # Check if email is already registered
    if User.objects.filter(email=email).exists():
        return JsonResponse({"message": "Email already exists"}, status=400)

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create new user
    user = User.objects.create(
        email=email,
        password=hashed_password.decode('utf-8'),  # Save the hashed password
        role=role
    ) 

    User.save(user)

    # Create JWT Access Token
    access_token = generate_token(user)

    # Return the response with the access token
    return JsonResponse(
        {
            "email": user.email,
            "role": user.role,
            "access_token": access_token
        },
        status=200
    )


@api_view(["GET"])
def get_user_by_email(request):
    email = request.email if request.email else request.GET.get("email")
    if email:
        user = User.objects.filter(email=email).first()
        if not user:
            return JsonResponse({"message": "Invalid credentials"}, status=400)
        else:
             return JsonResponse(
                {
                    "email": user.email,
                    "role": user.role,
                },
                status=200
            )
    else:
        return JsonResponse({"message": "Unauthorized"}, status=403)

# Login View
@csrf_exempt  # Disables CSRF for testing, use token-based authentication in production
@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    # Check if user exists
    user = User.objects.filter(email=email).first()
    if not user:
        return JsonResponse({"message": "Invalid credentials"}, status=400)

    # Check if the provided password matches the stored hashed password
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return JsonResponse({"message": "Invalid credentials"}, status=400)

    # Create JWT Access Token
    access_token = generate_token(user)

    # Return the response with the access token
    return JsonResponse(
        {
            "email": user.email,
            "role": user.role,
            "access_token": access_token
        },
        status=200
    )


# Define subroutes
user_patterns = [
    path("login", login, name="login"),
    path("register", register, name="register"),
    path("get_user_by_email", get_user_by_email, name="get_user_by_email")
]
