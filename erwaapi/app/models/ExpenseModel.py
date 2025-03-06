from .UserModel import User
from django.db import models

class Expense(models.Model):
    expense_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key to User table
    full_name = models.CharField(max_length=255)  # Full name of the user
    email = models.CharField(max_length=255)  # User email
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Expense amount with 2 decimal places
    file_url = models.CharField(max_length=255)  # File server URL path
    submitted_date = models.DateTimeField(auto_now_add=True)  # Auto-populate on submission
    updated_date = models.DateTimeField(auto_now=True)  # Auto-populate on update
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('In-Review', 'In-Review'), ('Approved', 'Approved'), ('Declined', 'Declined')], default='Pending')
    approved_by = models.CharField(max_length=255, blank=True, null=True)  # Employee name who approved the expense
    ocr_json = models.JSONField()  # Store large JSON data

    def __str__(self):
        return f"Expense {self.expense_id} - {self.full_name} ({self.status})"
