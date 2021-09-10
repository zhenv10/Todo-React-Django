from rest_framework import serializers
from TodoApp.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('TaskId', 'TaskName', 'TaskCompleted', 'TaskDescription')



