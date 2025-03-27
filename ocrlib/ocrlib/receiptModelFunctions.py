import os
import json
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest
from azure.storage.blob import BlobServiceClient

def init_document_intelligence_client() -> DocumentIntelligenceClient:
    # os.environ["FORM_RECOGNIZER_ENDPOINT"] = "https://expensereceiptai.cognitiveservices.azure.com"
    # os.environ["FORM_RECOGNIZER_KEY"] = "76764UJw2NrPfiOz5J5iwyo9OKdxKTXF5pdepm5hLuKlQlUIHgVDJQQJ99BBACBsN54XJ3w3AAALACOGSI1H"

    FORM_RECOGNIZER_ENDPOINT = "https://expensereceiptai.cognitiveservices.azure.com"
    FORM_RECOGNIZER_KEY = "76764UJw2NrPfiOz5J5iwyo9OKdxKTXF5pdepm5hLuKlQlUIHgVDJQQJ99BBACBsN54XJ3w3AAALACOGSI1H"

    """
    
    Initialize and return the Azure Document Intelligence client.
    Expects FORM_RECOGNIZER_ENDPOINT and FORM_RECOGNIZER_KEY in environment variables.
    """
    # endpoint = os.environ.get("FORM_RECOGNIZER_ENDPOINT")
    # key = os.environ.get("FORM_RECOGNIZER_KEY")
    # if not endpoint or not key:
    #     raise ValueError("Please set FORM_RECOGNIZER_ENDPOINT and FORM_RECOGNIZER_KEY environment variables.")
    return DocumentIntelligenceClient(endpoint=FORM_RECOGNIZER_ENDPOINT, credential=AzureKeyCredential(FORM_RECOGNIZER_KEY))

def init_blob_container_client():
    
    # os.environ["AZURE_STORAGE_CONNECTION_STRING"] = "BlobEndpoint=https://receiptdocuments.blob.core.windows.net/;QueueEndpoint=https://receiptdocuments.queue.core.windows.net/;FileEndpoint=https://receiptdocuments.file.core.windows.net/;TableEndpoint=https://receiptdocuments.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2025-04-07T08:27:10Z&st=2025-03-14T00:27:10Z&spr=https,http&sig=iNKt92TmGg10Xq68PQHXZTmjmRFWwbD%2FgAhR%2BEbX6u8%3D"
    # os.environ["BLOB_CONTAINER_NAME"] = "receiptfiles"
    AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://receiptdocuments.blob.core.windows.net/;QueueEndpoint=https://receiptdocuments.queue.core.windows.net/;FileEndpoint=https://receiptdocuments.file.core.windows.net/;TableEndpoint=https://receiptdocuments.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2025-04-07T08:27:10Z&st=2025-03-14T00:27:10Z&spr=https,http&sig=iNKt92TmGg10Xq68PQHXZTmjmRFWwbD%2FgAhR%2BEbX6u8%3D"
    BLOB_CONTAINER_NAME = "receiptfiles"

    """
    Initialize and return the Blob Storage container client.
    Expects AZURE_STORAGE_CONNECTION_STRING and BLOB_CONTAINER_NAME in environment variables.
    """

    blob_conn_str = AZURE_STORAGE_CONNECTION_STRING #os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
    container_name = BLOB_CONTAINER_NAME #os.environ.get("BLOB_CONTAINER_NAME")
    # if not blob_conn_str:
    #     raise ValueError("Please set AZURE_STORAGE_CONNECTION_STRING environment variable.")
    # if not container_name:
    #     raise ValueError("Please set BLOB_CONTAINER_NAME environment variable.")
    
    blob_service_client = BlobServiceClient.from_connection_string(blob_conn_str)
    return blob_service_client.get_container_client(container_name)

def upload_receipt_to_blob(file, blob_name: str = None, 
                           sas_token: str = None) -> str:
    """
    Uploads a receipt image to Azure Blob Storage and returns its URL.
    
    Args:
        file_path: Local path to the receipt image file.
        blob_name: Optional name to use for the blob. If not provided, the filename is used.
        sas_token: Optional SAS token string to append to the blob URL for access.
    
    Returns:
        A string representing the blob URL (with SAS token appended if provided).
    """
    container_client = init_blob_container_client()
    
    # Use the local filename as blob name if not provided
    # if not blob_name:
    #     blob_name = os.path.basename(file)
    
    # # Upload the file to the blob container (overwrite if exists)
    # with open(file_path, "rb") as data:
    container_client.upload_blob(name=blob_name, data=file, overwrite=True)
    
    # Construct the blob URL
    blob_client = container_client.get_blob_client(blob_name)
    blob_url = blob_client.url
    
    # Append SAS token if provided (ensure proper formatting)
    if sas_token:
        # Ensure we don't append multiple tokens
        if '?' in blob_url:
            # URL already has a token; you might skip appending another SAS token.
            pass
        else:
            blob_url += '?' + sas_token.lstrip('?')
    
    return blob_url

def analyze_receipt_image(blob_url: str) -> list:
    """
    Uses the Azure Document Intelligence prebuilt receipt model to analyze a receipt image given its URL.
    
    Args:
        blob_url: The URL of the receipt image stored in Azure Blob Storage.
    
    Returns:
        A list of dictionaries containing the extracted receipt fields and their confidence scores.
    """
    client = init_document_intelligence_client()
    
    try:
        poller = client.begin_analyze_document(
            "prebuilt-receipt", AnalyzeDocumentRequest(url_source=blob_url)
        )
        receipts = poller.result()
    except Exception as e:
        raise Exception("Document analysis failed: " + str(e))
    
    output = []
    for idx, receipt in enumerate(receipts.documents):
        receipt_data = {
            "receipt_index": idx + 1,
            "doc_type": receipt.doc_type or None
        }
        
        # Merchant Name
        merchant_name = receipt.fields.get("MerchantName")
        if merchant_name:
            receipt_data["merchant_name"] = {
                "value": merchant_name.value_string,
                "confidence": merchant_name.confidence
            }
        
        # Transaction Date
        transaction_date = receipt.fields.get("TransactionDate")
        if transaction_date:
            receipt_data["transaction_date"] = {
                "value": str(transaction_date.value_date),
                "confidence": transaction_date.confidence
            }
        
        # Items
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
        
        # Subtotal, Tax, Tip, Total
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
    
    return output

def testlib():
    return "Test OCRLIB"

# Example usage:
# if _name_ == "_main_":
#     # Specify the local path to your receipt image.
#     local_receipt_path = "D:\\Downloads\\WhatsApp Image 2025-03-22 at 2.10.02 PM (1).jpeg"
    
#     # Optionally, if you have a SAS token string (without the leading '?' if you prefer),
#     # you can provide it; otherwise, pass None.
#     sas_token = None
    
#     try:
#         # Upload the image to Blob Storage and get its URL.
#         uploaded_blob_url = upload_receipt_to_blob(local_receipt_path, sas_token=sas_token)
#         print(f"Uploaded blob URL: {uploaded_blob_url}")
        
#         # Analyze the receipt image using Azure Document Intelligence.
#         analysis_output = analyze_receipt_image(uploaded_blob_url)
#         print("Analysis JSON Output:")
#         print(json.dumps(analysis_output, indent=2))
#     except Exception as e:
#         print("An error occurred:")
#         print(e)