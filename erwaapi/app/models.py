from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50)

    def __str__(self):
        return self.username

class Profile(models.Model):
    user_id = models.OneToOneField(User, to_field='user_id', on_delete=models.CASCADE)  # Creates a one-to-one relationship
    bio = models.TextField()
    birth_date = models.DateField()

    def __str__(self):
        return f"Profile of {self.user.username}"