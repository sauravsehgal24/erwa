from .UserModel import User
from django.db import models

class Receipt(models.Model):
    receipt_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key to User table
    receipt_path = models.CharField(max_length=255)  # Path to receipt in VM folder
    receipt_type = models.CharField(max_length=50)
    receipt_data = models.JSONField()  # Store JSON data
    created = models.DateTimeField(auto_now_add=True)  # Auto-populate on creation
    updated = models.DateTimeField(auto_now=True)  # Auto-populate on update
    is_parsed = models.BooleanField(default=False)
    parsing_status = models.CharField(max_length=10)
    parsing_message = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Receipt {self.receipt_id} - User {self.user.user_id}"