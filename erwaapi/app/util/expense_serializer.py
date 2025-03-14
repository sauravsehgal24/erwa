from rest_framework import serializers
from ..models.ExpenseModel import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'  # Include all fields
