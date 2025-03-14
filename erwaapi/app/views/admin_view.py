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

## Function for CRUD operations for Admin User

# Get list of All Users
@api_view(["GET"])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Get list of Expenses
@api_view(["GET"])
def get_expenses(request):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

# Update Expense Status (Admin Only)
@api_view(["POST"])
def update_expense_status(request):
    data = request.data
    expense_id = data.get("expense_id")
    status = data.get("status")

    # Validate required fields
    if not expense_id or not status:
        return JsonResponse({"message": "expense_id and status are required"}, status=400)

    # Ensure status is valid
    valid_statuses = ["Pending", "In-Review", "Approved", "Declined"]
    if status not in valid_statuses:
        return JsonResponse({"message": "Invalid status value"}, status=400)

    # Find expense
    expense = Expense.objects.filter(expense_id=expense_id).first()
    if not expense:
        return JsonResponse({"message": "Expense not found"}, status=404)

    # Update status and updated_date
    expense.status = status
    expense.updated_date = now()  # Explicitly update the timestamp
    expense.save()

    return JsonResponse({"message": "Expense status updated successfully"}, status=200)

# Delete an Expense (For Employees)
@api_view(["DELETE"])
def delete_expense(request):
    expense_id = request.GET.get("expense_id")

    if not expense_id:
        return JsonResponse({"message": "expense_id is required"}, status=400)

    expense = Expense.objects.filter(expense_id=expense_id).first()
    if not expense:
        return JsonResponse({"message": "Expense not found"}, status=404)

    expense.delete()
    return JsonResponse({"message": "Expense deleted successfully"}, status=200)


# Define subroutes
user_patterns = [
    path("get_user_list", get_users, name="get_users"),
    path("get_expenses", get_expenses, name="get_expenses"),
    path("update_expense_status", update_expense_status, name="update_expense_status"),
    path("delete_expense", delete_expense, name="delete_expense")
]