from django.db import models

class Writer(models.Model):
    name = models.CharField(max_length=60)

class Book(models.Model):
    writer = models.ForeignKey(Writer, on_delete=models.PROTECT)
    name = models.CharField(max_length=30)


# Create your models here.
