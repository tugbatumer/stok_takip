from django.urls import path
from . import views

urlpatterns = [
    path(r'get_all_books/', views.get_all_books, name="get_all_books"),
    path(r'get_all_writers/', views.get_all_writers, name="get_all_writers"),
    path(r'writer_number/', views.writer_number, name="writer_number"),
    path(r'book_number/', views.book_number, name="book_number"),
    path(r'add_new_book/', views.add_new_book, name="add_new_book"),
    path(r'delete_book/', views.delete_book, name="delete_book"),
    path(r'edit_book/', views.edit_book, name="edit_book"),
    path(r'add_new_writer/', views.add_new_writer, name="add_new_writer"),
    path(r'delete_writer/', views.delete_writer, name="delete_writer"),
    path(r'edit_writer/', views.edit_writer, name="edit_writer"),

]