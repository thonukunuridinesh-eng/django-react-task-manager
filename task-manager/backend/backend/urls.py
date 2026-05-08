
from django.contrib import admin
from django.urls import path
from tasks.views import TaskListCreate,TaskDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', TaskListCreate.as_view()),
    path('api/tasks/<int:pk>/', TaskDetail.as_view()),
    
]
