from django.db import models

class Task(models.Model):
    TaskId = models.AutoField(primary_key=True)
    TaskName = models.CharField(max_length=500)
    TaskCompleted = models.BooleanField(default=False)
    TaskDescription = models.CharField(max_length=500, default="")