from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import path
from django.utils.timezone import now

from ..models.ExpenseModel import Expense
from ..models.UserModel import User
from ..util.user_serializer import UserSerializer
from ..util.expense_serializer import ExpenseSerializer

## 

# 
@api_view(["GET"])
def get_ocr_json(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# Define subroutes
user_patterns = [
    path("get_ocr_json", get_ocr_json, name="get_ocr_json")
]