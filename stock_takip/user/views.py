from django.shortcuts import render
from django.contrib.auth import login, authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework.decorators import authentication_classes, permission_classes
from django.contrib.auth.models import User


@api_view(['POST'])
def register(request):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")
    if not email:
        return Response({'error': 'email missing'}, status=HTTP_404_NOT_FOUND)
    if not username:
        return Response({'error': 'username missing'}, status=HTTP_404_NOT_FOUND)
    if not password:
        return Response({'error': 'password missing'}, status=HTTP_404_NOT_FOUND)

    _ = User.objects.create_user(email=email, username=username, password=password)

    return Response({'success': 'success'}, status=HTTP_200_OK)


@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data.get("username"), password=request.data.get("password"))

    if not user:
        return Response({'error': 'Credentials are incorrect or user does not exist'}, status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    is_admin = user.is_staff
    return Response({'token': token.key, 'admin': is_admin, 'success': 'success'}, status=HTTP_200_OK)

