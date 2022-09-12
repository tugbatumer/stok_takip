from django.urls import path
from . import views

urlpatterns = [
    path(r'register/', views.register, name="account-register"),
    path(r'login/', views.login, name="account-login"),
]