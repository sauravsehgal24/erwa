from django.test import TestCase

# Create your tests here.
import requests
import os

# Replace with your actual API URL
API_URL = "http://127.0.0.1:8000/ocr/upload_and_analyze"  # Adjust port if needed

# Replace with the path to your test receipt image
RECEIPT_IMAGE_PATH = "/Users/hthakkar/Downloads/test1.png"  # Update with your image path

files = {'receipt': open(RECEIPT_IMAGE_PATH, 'rb')}

try:
    response = requests.post(API_URL, files=files)
    response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
    print("API Response:")
    print(response.json())  # Print the JSON response

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
