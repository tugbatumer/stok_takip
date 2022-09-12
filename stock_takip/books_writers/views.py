from django.shortcuts import render
from django.contrib.auth import login, authenticate
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework.decorators import authentication_classes, permission_classes
from django.contrib.auth.models import User
from .models import Book
from .models import Writer


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_books(request):

    all_books = []

    book = Book.objects.all()

    for b in book:
        wrt = Writer.objects.get(pk=b.writer.pk)
        all_books.append({'id': b.id , 'name': b.name, 'writer': wrt.name})

    return JsonResponse({'data': all_books})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_writers(request):

    all_writers = []

    writer = Writer.objects.all()

    for w in writer:
        all_writers.append({'id': w.id, 'name': w.name})

    return JsonResponse({'data': all_writers})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def writer_number(request):

    writer = Writer.objects.all()

    return JsonResponse({'number': writer.count()})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def book_number(request):
    book = Book.objects.all()

    return JsonResponse({'number': book.count()})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def add_new_book(request):
    try:
       name = request.data.get("name")
       writer = request.data.get("writer")
       writer_id = Writer.objects.filter(name = writer)
       if writer_id.exists():
           Book.objects.create(writer = writer_id.first(), name = name)
       else:
           Writer.objects.create(name = writer)
           writer_id = Writer.objects.filter(name=writer)
           Book.objects.create(writer=writer_id.first(), name=name)
       return Response("Success")
    except:
        return Response("Error")



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def delete_book(request):
    try:
        id = request.data.get("id")
        Book.objects.get(pk= id).delete()
        return Response("Success")
    except:
        return Response("Error")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def edit_book(request):
    try:
        id = request.data.get("id")
        book = Book.objects.get(pk=id)
        book.name = request.data.get("name")
        writer = request.data.get("writer")
        writer_id = Writer.objects.filter(name=writer)
        if writer_id.exists():
            book.writer = writer_id.first()
        else:
            Writer.objects.create(name=writer)
            writer_id = Writer.objects.filter(name=writer)
            book.writer = writer_id.first()
        book.save()
        return Response("Success")
    except:
        return Response("Error")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def add_new_writer(request):
   try:

       name = request.data.get("name")
       Writer.objects.create(name=name)
       return Response("Success")
   except:
        return Response("Error")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def delete_writer(request):
    try:
        id = request.data.get("id")
        Writer.objects.get(pk= id).delete()
        return Response("Success")
    except:
        return Response("Error")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def edit_writer(request):

    try:
        id = request.data.get("id")
        writer = Writer.objects.get(pk=id)
        writer.name = request.data.get("name")
        writer.save()
        return Response("Success")
    except:
        return Response("Error")

# Create your views here.
