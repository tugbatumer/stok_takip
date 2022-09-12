from django.test import TestCase


class UserTestCases(TestCase):

    def test_register(self):
        data = {"email": "test@gmail.com", "username": "test", "password": "123456"}
        response = self.client.post("/register/", data=data)
        self.assertEquals(response.status_code, 200)

    def test_register_email_missing(self):
        data = {"username": "test", "password": "123456"}
        response = self.client.post("/register/", data=data)
        self.assertEquals(response.data['error'], 'email missing')

    def test_register_username_missing(self):
        data = {"email": "test@gmail.com", "password": "123456"}
        response = self.client.post("/register/", data=data)
        self.assertEquals(response.data['error'], 'username missing')

    def test_register_password_missing(self):
        data = {"email": "test@gmail.com", "username": "test"}
        response = self.client.post("/register/", data=data)
        self.assertEquals(response.data['error'], 'password missing')

    def test_login(self):
        data = {"email": "test@gmail.com", "username": "test", "password": "123456"}
        self.client.post("/register/", data=data)
        data = {"username": "test", "password": '123456'}
        response = self.client.post("/login/", data=data)
        self.assertEquals(response.status_code, 200)

    def test_login_no_user(self):
        data = {"username": "test", "password": '123456'}
        response = self.client.post("/login/", data=data)
        self.assertEquals(response.status_code, 404)


# Create your tests here.
