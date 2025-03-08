from django.http import JsonResponse
from django.urls import path
from rest_framework.decorators import api_view
from app.models.UserModel import User
from app.models.ExpenseModel import Expense

# Retrieve Employee Profile
@api_view(["GET"])
def get_employee_profile(request):
    user_id = request.GET.get("userId")
    
    if not user_id:
        return JsonResponse({"message": "User ID is required"}, status=400)
    
    user = User.objects.filter(user_id=user_id).first()
    if not user:
        return JsonResponse({"message": "User not found"}, status=404)
    
    return JsonResponse({
        "user_id": user.user_id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "active": user.active,
        "created_date": user.created_date,
        "updated_date": user.updated_date
    }, status=200)

# Retrieve All Expense Records for an Employee
@api_view(["GET"])
def get_employee_expenses(request):
    user_id = request.GET.get("userId")
    
    if not user_id:
        return JsonResponse({"message": "User ID is required"}, status=400)
    
    expenses = Expense.objects.filter(user_id=user_id)
    if not expenses.exists():
        return JsonResponse({"message": "No expense records found for this user"}, status=404)
    
    expense_list = [{
        "expense_id": expense.expense_id,
        "amount": expense.amount,
        "status": expense.status,
        "submitted_date": expense.submitted_date,
        "updated_date": expense.updated_date,
        "approved_by": expense.approved_by,
        "file_url": expense.file_url,
        "ocr_json": expense.ocr_json
    } for expense in expenses]
    
    return JsonResponse({"expenses": expense_list}, status=200)

# Define subroutes for Employee API
employee_patterns = [
    path("get_employee_profile", get_employee_profile, name="get_employee_profile"),
    path("get_employee_expenses", get_employee_expenses, name="get_employee_expenses")
]
