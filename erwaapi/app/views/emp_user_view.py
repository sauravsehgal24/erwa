from django.http import JsonResponse
from django.urls import path
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
import json
from .models import Expense

class ExpenseAPI(View):
    
    def get_expenseByID(self, request, expense_id):
        expense = get_object_or_404(Expense, expense_id=expense_id)
        return JsonResponse(model_to_dict(expense))
    
    @method_decorator(csrf_exempt)
    def post(self, request):
        try:
            data = json.loads(request.body)
            expense = Expense.objects.create(
                user_id=data['user_id'],
                full_name=data['full_name'],
                email=data['email'],
                amount=data['amount'],
                file_url=data['file_url'],
                submitted_date=data['submitted_date'],
                updated_date=data['updated_date'],
                status=data['status'],
                approved_by=data.get('approved_by', None),
                ocr_json=data['ocr_json']
            )
            return JsonResponse({'expense_id': expense.expense_id, 'message': 'Expense created successfully'}, status=201)
        except (json.JSONDecodeError, KeyError):
            return JsonResponse({'error': 'Invalid request data'}, status=400)
        

        
# Define subroutes
emp_user_patterns = [
    path("login", login, name="login"),
    path("register", register, name="register"),
    path("get_user_by_email", get_user_by_email, name="get_user_by_email")
]

