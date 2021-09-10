from django.conf.urls import url
from TodoApp import views


urlpatterns = [
    url(r'^todos$', views.taskApi),
    url(r'^todos/([0-9]+)$', views.taskApi)
]