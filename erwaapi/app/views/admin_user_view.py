from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.exceptions import BadRequest
from django.forms.models import model_to_dict
import json
from .models import User, Expense

class AdminView(View):
    
    def get_users(self, request):
        users = User.objects.all().values(
            'user_id', 'full_name', 'email', 'role', 'active', 'created_date', 'updated_date'
        )
        return JsonResponse(list(users), safe=False)
    
    @method_decorator(csrf_exempt)
    def update_user(self, request, user_id):
        try:
            data = json.loads(request.body)
            user = get_object_or_404(User, user_id=user_id)
            if 'status' in data:
                user.active = data['status']
            user.updated_date = data.get('updated_date', user.updated_date)
            user.save()
            return JsonResponse(model_to_dict(user))
        except (json.JSONDecodeError, KeyError):
            return JsonResponse({'error': 'Invalid request data'}, status=400)
    
    def get_expenses(self, request):
        expenses = Expense.objects.all().values(
            'expense_id', 'user_id', 'full_name', 'email', 'amount', 'file_url', 'submitted_date', 'updated_date', 'status', 'approved_by', 'ocr_json'
        )
        return JsonResponse(list(expenses), safe=False)
    
    @method_decorator(csrf_exempt)
    def update_expense(self, request, expense_id):
        try:
            data = json.loads(request.body)
            expense = get_object_or_404(Expense, expense_id=expense_id)
            if 'status' in data:
                expense.status = data['status']
            expense.updated_date = data.get('updated_date', expense.updated_date)
            expense.save()
            return JsonResponse(model_to_dict(expense))
        except (json.JSONDecodeError, KeyError):
            return JsonResponse({'error': 'Invalid request data'}, status=400)
