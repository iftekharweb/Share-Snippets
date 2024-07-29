from django.db import models
from core.models import User

class Snippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    language = models.CharField(max_length=255,default="javascript")
    code = models.TextField()
    isPrivate = models.BooleanField(default=False)