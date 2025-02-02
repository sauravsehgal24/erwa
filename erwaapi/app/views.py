from django.shortcuts import render
from django.http import JsonResponse
from ocrlib import greet

def hello(request):
    return JsonResponse({"message": greet() + " From api server!"})
