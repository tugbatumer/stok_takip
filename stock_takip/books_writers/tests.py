
from django.contrib.auth import authenticate
from django.test import TestCase
from .models import Book, Writer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class ModelsTestCases(TestCase):




    def test_book_creation_valid(self):
        w = Writer.objects.create(name = "test")
        b = Book.objects.create(name = "test_book", writer = w)

        self.assertEquals(b.name, "test_book")
        self.assertEquals(b.writer, w)

    def test_writer_creation_valid(self):
        w = Writer.objects.create(name = "test")
        self.assertEquals(w.name, "test")

class ViewsTestCases(TestCase):


    def setUp(self):
        User.objects.create_user('foo', 'foo@bar.de', 'bar')
        User.objects.create_superuser('myuser', 'myemail@test.com', 'myadmin')
        self.admin = authenticate(username='myuser', password='myadmin')
        self.user = authenticate(username='foo', password='bar')
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.admin_token, _ = Token.objects.get_or_create(user=self.admin)
        self.auth_headers = {'HTTP_AUTHORIZATION': "Token " + self.token.key}
        self.auth_headers_admin = {'HTTP_AUTHORIZATION': "Token " + self.admin_token.key}
        self.w = Writer.objects.create(name="test")
        self.w2 = Writer.objects.create(name="test2")
        self.b = Book.objects.create(name="test_book", writer=self.w)



    def test_get_all_books(self):
        response = self.client.get("/get_all_books/", **self.auth_headers)
        self.assertEquals(response.status_code, 200)

    def test_get_all_books_login_error(self):
        response = self.client.get("/get_all_books/")
        self.assertEquals(response.status_code, 401)

    def test_get_all_writers(self):
        response = self.client.get("/get_all_writers/", **self.auth_headers)
        self.assertEquals(response.status_code, 200)

    def test_get_all_writers_login_error(self):
        response = self.client.get("/get_all_writers/")
        self.assertEquals(response.status_code, 401)

    def test_writer_number(self):
        response = self.client.get("/writer_number/", **self.auth_headers)
        self.assertEquals(response.json()['number'], 2)

    def test_writer_number_login_error(self):
        response = self.client.get("/writer_number/")
        self.assertEquals(response.status_code, 401)

    def test_book_number(self):
        response = self.client.get("/book_number/", **self.auth_headers)
        self.assertEquals(response.json()['number'], 1)

    def test_book_number_login_error(self):
        response = self.client.get("/book_number/")
        self.assertEquals(response.status_code, 401)

    def test_add_new_book(self):
        data = {"name": "test_book", "writer": "test_writer"}
        response = self.client.post("/add_new_book/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_add_new_book_not_admin(self):
        data = {"name": "test_book", "writer": "test_writer"}
        response = self.client.post("/add_new_book/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)

    def test_edit_book(self):
        data = {"id": 1, "name": "test_book", "writer": "test_writer"}
        response = self.client.post("/edit_book/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_edit_book_not_admin(self):
        data = {"id": 1, "name": "test_book", "writer": "test_writer"}
        response = self.client.post("/edit_book/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)

    def test_delete_book(self):
        data = {"id": 1}
        response = self.client.post("/delete_book/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_delete_book_not_admin(self):
        data = {"id": 1}
        response = self.client.post("/delete_book/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)


    def test_add_new_writer(self):
        data = {"name": "test_writer"}
        response = self.client.post("/add_new_writer/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_add_new_writer_not_admin(self):
        data = {"name": "test_writer"}
        response = self.client.post("/add_new_writer/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)

    def test_edit_writer(self):
        data = {"id": 1,"name": "test_writer"}
        response = self.client.post("/edit_writer/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_edit_writer_not_admin(self):
        data = {"id": 1, "name": "test_writer"}
        response = self.client.post("/edit_writer/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)

    def test_delete_writer(self):
        data = {"id": 2}
        response = self.client.post("/delete_writer/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Success")



    def test_delete_writer_not_admin(self):
        data = {"id": 2}
        response = self.client.post("/delete_writer/", data=data, **self.auth_headers)
        self.assertEquals(response.status_code, 403)

    def test_delete_writer_has_book(self):
        data = {"id": 1}
        response = self.client.post("/delete_writer/", data=data, **self.auth_headers_admin)
        self.assertEquals(response.json(), "Error")














# Create your tests here.
