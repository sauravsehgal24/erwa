from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import path
from django.utils.timezone import now

from ..models.ExpenseModel import Expense
from ..models.UserModel import User
from ..util.user_serializer import UserSerializer
from ..util.expense_serializer import ExpenseSerializer

#Imports from OCRLIB
import json
from ocrlib.receiptModelFunctions import upload_receipt_to_blob, analyze_receipt_image,testlib
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

## 

""" 
@api_view(["GET"])
def get_ocr_json(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
"""
@api_view(['POST'])
def upload_and_analyze_receipt(request):
    """
    API endpoint to upload a receipt image, analyze it using Azure Document Intelligence,
    and return the JSON output.
    """
    if request.method == 'POST':
        if request.FILES:
            receipt_file = request.FILES['receipt']  # Assuming the file is sent with key 'receipt'
            try:
                file = receipt_file.read()
                # Upload to Azure Blob Storage
                blob_url = upload_receipt_to_blob(file=file, blob_name=receipt_file.name, sas_token=None)

                # Analyze using Azure Document Intelligence
                analysis_result = analyze_receipt_image(blob_url)

                # Return the JSON output
                return JsonResponse(analysis_result, safe=False)

            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'No receipt file provided'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@api_view(['GET'])
def health_ocrlib(request):
    print("in ocr health")
    return JsonResponse({'message': testlib()}, status=200)
"""

# Define subroutes
user_patterns = [
    path("get_ocr_json", get_ocr_json, name="get_ocr_json")
]
"""
# Define subroutes
ocr_patterns = [
    path('upload_and_analyze', upload_and_analyze_receipt, name='upload_and_analyze'),
    path('health', health_ocrlib, name='health_ocrlib')
]