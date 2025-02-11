from django.db import models

# User Model
class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)  # Auto-incrementing very big int
    role = models.CharField(max_length=10)
    password = models.CharField(max_length=255)  # Store encrypted password
    created = models.DateTimeField(auto_now_add=True)  # Auto-populate on creation
    updated = models.DateTimeField(auto_now=True)  # Auto-populate on update
    is_session_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user_id} - {self.role}"