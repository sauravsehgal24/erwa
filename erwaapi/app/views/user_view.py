from django.urls import path
import bcrypt
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from app.models.UserModel import User
from app.models.ExpenseModel import Expense
from app.util import auth_util
from app.util.auth_util import generate_token, decode_token
import json

# Register View
@api_view(['POST'])
def register(request):
    # data = json.loads(request.body)
    data = request.data
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    job = data.get('job')
    role = data.get('role')

    # Check if email is already registered
    if User.objects.filter(email=email).exists():
        return JsonResponse({"message": "Email already exists"}, status=400)

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create new user
    user = User.objects.create(
        email=email,
        full_name=full_name,
        job=job,
        password=hashed_password.decode('utf-8'),  # Save the hashed password
        role=role,
    ) 

    User.save(user)

    # Create JWT Access Token
    access_token = generate_token(user)

    # Return the response with the access token
    return JsonResponse(
        {
            "email": user.email,
            "role": user.role,
            "access_token": access_token,
            "job": user.job,
            "full_name":user.full_name
        },
        status=200
    )

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

    print(user.full_name)

    # Return the response with the access token
    return JsonResponse(
        {
            "email": user.email,
            "role": user.role,
            "job": user.job,
            "full_name":user.full_name,
            "access_token": access_token
        },
        status=200
    )


## Functions to support all actions of an Employee Role User (Create, Read) of Expenses AND Get its own User Info

# Get user info by user_id
@api_view(["GET"])
def get_user_by_id(request):
    user_id = request.GET.get("user_id")
    
    if not user_id:
        return JsonResponse({"message": "user_id is required"}, status=400)

    user = User.objects.filter(user_id=user_id).first()
    
    if not user:
        return JsonResponse({"message": "User not found"}, status=404)

    return JsonResponse(
        {
            "user_id": user.user_id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "active": user.active,
            "job":user.job,
            "created_date": user.created_date,
            "updated_date": user.updated_date
        },
        status=200
    )

# Get expenses by user_id
@api_view(["GET"])
def get_expenses_by_user(request):
    user_id = request.GET.get("user_id")
    
    if not user_id:
        return JsonResponse({"message": "user_id is required"}, status=400)

    expenses = Expense.objects.filter(user_id=user_id).values(
        "expense_id", "amount", "status", "file_url", "submitted_date", "updated_date"
    )

    return JsonResponse(list(expenses), safe=False, status=200)


# Get user by email
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
                    "user_id": user.user_id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "active": user.active,
            "job":user.job,
            "created_date": user.created_date,
            "updated_date": user.updated_date
                },
                status=200
            )
    else:
        return JsonResponse({"message": "Unauthorized"}, status=403)

@api_view(["POST"])
def submit_expense(request):
    data = request.data
    user_id = data.get("user_id")
    full_name = data.get("full_name")
    email = data.get("email")
    amount = data.get("amount")
    file_url = data.get("file_url")

    # Validate required fields
    if not all([user_id, full_name, email, amount, file_url]):
        return JsonResponse({"message": "All fields are required"}, status=400)

    # Check if user exists
    user = User.objects.filter(user_id=user_id).first()
    if not user:
        return JsonResponse({"message": "Invalid user_id"}, status=400)

    # Create new expense record with default values
    expense = Expense.objects.create(
        user=user,
        full_name=full_name,
        email=email,
        amount=amount,
        file_url=file_url,
        ocr_json="{}",  # Set OCR JSON as empty
        approved_by=None,  # Ensure approved_by is NULL
        status="Pending"  # Always set status to "Pending"
    )

    return JsonResponse(
        {"message": "Expense submitted successfully", "expense_id": expense.expense_id},
        status=201
    )


# Define subroutes
user_patterns = [
    path("login", login, name="login"),
    path("register", register, name="register"),
    path("get_user_by_id", get_user_by_id, name="get_user_by_id"),
    path("get_expenses_by_user", get_expenses_by_user, name="get_expenses_by_user"),
    path("get_user_by_email", get_user_by_email, name="get_user_by_email"),
    path("submit_expense", submit_expense, name="submit_expense")
]
