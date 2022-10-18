from django.db import models


# Create your models here.


class Question(models.Model):
    creation_date = models.DateTimeField(verbose_name='Creation date')
    title = models.CharField(verbose_name='Title', max_length=300)
    author = models.CharField(verbose_name='Author', max_length=100)
    answered = models.BooleanField(verbose_name='Answered?')
    link = models.URLField(verbose_name='Link')
