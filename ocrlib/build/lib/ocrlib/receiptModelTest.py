import os
import json

# Import necessary modules from Azure SDKs
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest
from azure.storage.blob import BlobServiceClient

# ================================
# Form Recognizer Setup and Test
# ================================

# Hard code Form Recognizer credentials (secure these in production)
os.environ["FORM_RECOGNIZER_ENDPOINT"] = "https://expensereceiptai.cognitiveservices.azure.com"
os.environ["FORM_RECOGNIZER_KEY"] = "2I2ZXVwiW1jZgqzAl6NEMZsPKpaLHocgwAQnhOlKONm4tYoNxWxQJQQJ99BBACBsN54XJ3w3AAALACOGe29c"

# Retrieve the endpoint and key
ENDPOINT = os.environ.get("FORM_RECOGNIZER_ENDPOINT")
KEY = os.environ.get("FORM_RECOGNIZER_KEY")

print(f"Form Recognizer Endpoint: {ENDPOINT}")
print(f"Form Recognizer Key: {KEY}")

if not ENDPOINT or not KEY:
    raise ValueError("ERROR: FORM_RECOGNIZER_ENDPOINT and FORM_RECOGNIZER_KEY must be set!")
if not isinstance(KEY, str):
    raise TypeError("ERROR: The FORM_RECOGNIZER_KEY must be a string.")

try:
    document_intelligence_client = DocumentIntelligenceClient(
        endpoint=ENDPOINT, credential=AzureKeyCredential(KEY)
    )
    print("Azure Form Recognizer client successfully created.")
except Exception as e:
    print("Failed to create Azure Form Recognizer client:")
    print(e)
    exit(1)

# ================================
# Blob Storage Setup and Test
# ================================

# Hard code Blob Storage connection details and SAS token for demonstration purposes
os.environ["AZURE_STORAGE_CONNECTION_STRING"] = "BlobEndpoint=https://receiptdocuments.blob.core.windows.net/;QueueEndpoint=https://receiptdocuments.queue.core.windows.net/;FileEndpoint=https://receiptdocuments.file.core.windows.net/;TableEndpoint=https://receiptdocuments.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2025-03-01T02:14:46Z&st=2025-02-28T18:14:46Z&spr=https,http&sig=72YqPS4G9bPL%2BsoZTjbn1LnjZmDa04lYlCKBoCqSLYU%3D"
os.environ["BLOB_CONTAINER_NAME"] = "receiptfiles"

# Retrieve Blob Storage connection information
blob_conn_str = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
container_name = os.environ.get("BLOB_CONTAINER_NAME")

if not blob_conn_str:
    raise ValueError("ERROR: AZURE_STORAGE_CONNECTION_STRING must be set!")
if not container_name:
    raise ValueError("ERROR: BLOB_CONTAINER_NAME must be set!")

try:
    blob_service_client = BlobServiceClient.from_connection_string(blob_conn_str)
    container_client = blob_service_client.get_container_client(container_name)
    print(f"Connected to Blob Storage container: {container_name}")
    blob_list = list(container_client.list_blobs())
    print(f"Blobs in container '{container_name}': {[blob.name for blob in blob_list]}")
except Exception as e:
    print("Failed to connect to Azure Blob Storage container:")
    print(e)
    exit(1)

# Hard-code the SAS token generated via the Azure Portal
sas_token = "https://receiptdocuments.blob.core.windows.net/receiptfiles/test.png?sp=r&st=2025-02-28T18:32:41Z&se=2025-03-01T02:32:41Z&sv=2022-11-02&sr=b&sig=sEVV5OXbsepFAjmr0Z%2B9RaEneEziqiIWrKUrq3LYF7E%3D"

# Define the sample blob file name (ensure this file exists in your container)
sample_blob_name = "test.PNG"

# Construct the blob URL with the SAS token appended
blob_url = "https://receiptdocuments.blob.core.windows.net/receiptfiles/test.png?sp=r&st=2025-02-28T18:32:41Z&se=2025-03-01T02:32:41Z&sv=2022-11-02&sr=b&sig=sEVV5OXbsepFAjmr0Z%2B9RaEneEziqiIWrKUrq3LYF7E%3D"
print(f"Blob URL with SAS: {blob_url}")

# =====================================
# Analyze a Sample File from Blob Storage
# =====================================

try:
    poller = document_intelligence_client.begin_analyze_document(
        "prebuilt-receipt", AnalyzeDocumentRequest(url_source=blob_url)
    )
    receipts = poller.result()
    print("Document analysis from Blob Storage succeeded!")
except Exception as e:
    print("Failed to analyze document from Blob Storage:")
    print(e)
    exit(1)

# ============================
# Build JSON Output from Analysis
# ============================

output = []

for idx, receipt in enumerate(receipts.documents):
    receipt_data = {
        "receipt_index": idx + 1,
        "doc_type": receipt.doc_type or None
    }

    merchant_name = receipt.fields.get("MerchantName")
    if merchant_name:
        receipt_data["merchant_name"] = {
            "value": merchant_name.value_string,
            "confidence": merchant_name.confidence
        }

    transaction_date = receipt.fields.get("TransactionDate")
    if transaction_date:
        receipt_data["transaction_date"] = {
            "value": str(transaction_date.value_date),
            "confidence": transaction_date.confidence
        }

    items_field = receipt.fields.get("Items")
    if items_field:
        items = []
        for item_idx, item in enumerate(items_field.value_array):
            item_data = {"item_index": item_idx + 1}
            item_description = item.value_object.get("Description")
            if item_description:
                item_data["description"] = {
                    "value": item_description.value_string,
                    "confidence": item_description.confidence
                }
            item_quantity = item.value_object.get("Quantity")
            if item_quantity:
                item_data["quantity"] = {
                    "value": item_quantity.value_number,
                    "confidence": item_quantity.confidence
                }
            item_price = item.value_object.get("Price")
            if item_price:
                item_data["price"] = {
                    "value": item_price.value_currency.amount,
                    "confidence": item_price.confidence
                }
            item_total_price = item.value_object.get("TotalPrice")
            if item_total_price:
                item_data["total_price"] = {
                    "value": item_total_price.value_currency.amount,
                    "confidence": item_total_price.confidence
                }
            items.append(item_data)
        receipt_data["items"] = items

    subtotal = receipt.fields.get("Subtotal")
    if subtotal:
        receipt_data["subtotal"] = {
            "value": subtotal.value_currency.amount,
            "confidence": subtotal.confidence
        }
    tax = receipt.fields.get("TotalTax")
    if tax:
        receipt_data["tax"] = {
            "value": tax.value_currency.amount,
            "confidence": tax.confidence
        }
    tip = receipt.fields.get("Tip")
    if tip:
        receipt_data["tip"] = {
            "value": tip.value_currency.amount,
            "confidence": tip.confidence
        }
    total = receipt.fields.get("Total")
    if total:
        receipt_data["total"] = {
            "value": total.value_currency.amount,
            "confidence": total.confidence
        }

    output.append(receipt_data)

# Print the final JSON output from the analyzed receipt
print(json.dumps(output, indent=2))
