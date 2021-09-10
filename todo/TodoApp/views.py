from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from TodoApp.models import Task
from TodoApp.serializers import TaskSerializer

@csrf_exempt
def taskApi(request, id=0):
    if request.method=='GET':
        tasks = Task.objects.all()
        tasks_serializer=TaskSerializer(tasks, many=True)
        return JsonResponse(tasks_serializer.data, safe=False)
    elif request.method=='POST':
        task_data = JSONParser().parse(request)
        tasks_serializer = TaskSerializer(data=task_data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            return JsonResponse("Added successfully", safe=False)
        return JsonResponse("Failed to add", safe=False)
    elif request.method=='PUT':
        task_data = JSONParser().parse(request)
        task = Task.objects.get(TaskId=task_data['TaskId'])
        tasks_serializer = TaskSerializer(task, data=task_data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            return JsonResponse("Updated successfully", safe=False)
        return JsonResponse("Failed to update", safe=False)
    elif request.method=='DELETE':
        task = Task.objects.get(TaskId=id)
        task.delete()
        return JsonResponse("Deleted successfully", safe=False)