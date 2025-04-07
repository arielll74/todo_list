from django.urls import path
from . import views

urlpatterns = [
    path('', views.TodoViewSet, name='TodoViewSet'), 
    path('<int:pk>/', views.todo_detail, name='todo_detail'), 
]