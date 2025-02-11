from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
import time
from django.conf import settings
import jwt
import bcrypt
from django.views.decorators.csrf import csrf_exempt

users=[
    {"username":"jam", "role":"USER"},
    {"username":"sam", "role":"ADMIN"}
]


def generate_token(user):
    # Set expiration time for the access token (e.g., 15 minutes)
    expiration = time.time() + settings.JWT["exp"]
    print(expiration)
    # Create JWT payload (user details + role)
    payload = {
        'email': user["username"],
        'role': user["role"],  
        'exp': expiration,
        'iat': time.time(),
    }
    access_token = jwt.encode(payload, settings.JWT["secret"], algorithm='HS256')
    return access_token

# Login API
@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    # Query your existing user table
    # with connection.cursor() as cursor:
    #     cursor.execute("SELECT username, role FROM user_table WHERE username=%s AND password=%s", [username, password])
    #     user_data = cursor.fetchone()
    user_data = [user for user in users if user["username"] == username][0]
    print(user_data)
    if user_data:
        return Response({
            "access": generate_token({"username": user_data["username"], "role": user_data["role"]}),
            "role": user_data["role"]
        })
    
    return Response({"error": "Invalid credentials"}, status=400)


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Save the user to the database
        # user = User.objects.create(username=username, password=hashed_password)

        return JsonResponse({"message": "User registered successfully"})
    return JsonResponse({"error": "Invalid request"}, status=400)