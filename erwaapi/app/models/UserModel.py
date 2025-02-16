from django.db import models

# User Model
class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)  # Auto-incrementing very big int
    full_name = models.CharField(max_length=255)  # Full name of the user
    email = models.CharField(max_length=255, unique=True)  # Ensure uniqueness
    role = models.CharField(max_length=10, choices=[('Admin', 'Admin'), ('User', 'User')], default='User')
    password = models.CharField(max_length=255)  # Store hashed password
    active = models.BooleanField(default=True)  # Indicates if the user is active
    created_date = models.DateTimeField(auto_now_add=True)  # Auto-populate on creation
    updated_date = models.DateTimeField(auto_now=True)  # Auto-populate on update

    def __str__(self):
        return f"{self.user_id} - {self.full_name} ({self.role})"
