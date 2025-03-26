import json
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest
from azure.storage.blob import BlobServiceClient

# Store credentials as variables (Consider loading from a config file instead)
AZURE_CREDENTIALS = {
    "FORM_RECOGNIZER_ENDPOINT": "https://expensereceiptai.cognitiveservices.azure.com",
    "FORM_RECOGNIZER_KEY": "76764UJw2NrPfiOz5J5iwyo9OKdxKTXF5pdepm5hLuKlQlUIHgVDJQQJ99BBACBsN54XJ3w3AAALACOGSI1H",
    "AZURE_STORAGE_CONNECTION_STRING": "BlobEndpoint=https://receiptdocuments.blob.core.windows.net/;QueueEndpoint=https://receiptdocuments.queue.core.windows.net/;FileEndpoint=https://receiptdocuments.file.core.windows.net/;TableEndpoint=https://receiptdocuments.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2025-04-07T08:27:10Z&st=2025-03-14T00:27:10Z&spr=https,http&sig=iNKt92TmGg10Xq68PQHXZTmjmRFWwbD%2FgAhR%2BEbX6u8%3D",
    "BLOB_CONTAINER_NAME": "receiptfiles"
}

def init_document_intelligence_client() -> DocumentIntelligenceClient:
    """
    Initialize and return the Azure Document Intelligence client.
    """
    endpoint = AZURE_CREDENTIALS["FORM_RECOGNIZER_ENDPOINT"]
    key = AZURE_CREDENTIALS["FORM_RECOGNIZER_KEY"]
    
    if not endpoint or not key:
        raise ValueError("Document Intelligence credentials are missing.")
    
    return DocumentIntelligenceClient(endpoint=endpoint, credential=AzureKeyCredential(key))

def init_blob_container_client():
    """
    Initialize and return the Blob Storage container client.
    """
    blob_conn_str = AZURE_CREDENTIALS["AZURE_STORAGE_CONNECTION_STRING"]
    container_name = AZURE_CREDENTIALS["BLOB_CONTAINER_NAME"]

    if not blob_conn_str:
        raise ValueError("Azure Storage connection string is missing.")
    if not container_name:
        raise ValueError("Blob container name is missing.")
    
    blob_service_client = BlobServiceClient.from_connection_string(blob_conn_str)
    return blob_service_client.get_container_client(container_name)

def upload_receipt_to_blob(file_path: str, blob_name: str = None, sas_token: str = None) -> str:
    """
    Uploads a receipt image to Azure Blob Storage and returns its URL.
    """
    container_client = init_blob_container_client()

    if not blob_name:
        blob_name = file_path.split("/")[-1]

    with open(file_path, "rb") as data:
        container_client.upload_blob(name=blob_name, data=data, overwrite=True)

    blob_client = container_client.get_blob_client(blob_name)
    blob_url = blob_client.url

    if sas_token:
        blob_url += '?' + sas_token.lstrip('?')

    return blob_url

def analyze_receipt_image(blob_url: str) -> list:
    """
    Uses the Azure Document Intelligence prebuilt receipt model to analyze a receipt image given its URL.
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

        # Extract merchant name
        merchant_name = receipt.fields.get("MerchantName")
        if merchant_name:
            receipt_data["merchant_name"] = {
                "value": merchant_name.value_string,
                "confidence": merchant_name.confidence
            }

        # Extract transaction date
        transaction_date = receipt.fields.get("TransactionDate")
        if transaction_date:
            receipt_data["transaction_date"] = {
                "value": str(transaction_date.value_date),
                "confidence": transaction_date.confidence
            }

        # Extract items
        items_field = receipt.fields.get("Items")
        if items_field:
            items = []
            for item_idx, item in enumerate(items_field.value_array):
                item_data = {
                    "item_index": item_idx + 1,
                    "description": item.value_object.get("Description", {}).get("value_string"),
                    "quantity": item.value_object.get("Quantity", {}).get("value_number"),
                    "price": item.value_object.get("Price", {}).get("value_currency", {}).get("amount"),
                    "total_price": item.value_object.get("TotalPrice", {}).get("value_currency", {}).get("amount"),
                    "confidence": {
                        "description": item.value_object.get("Description", {}).get("confidence"),
                        "quantity": item.value_object.get("Quantity", {}).get("confidence"),
                        "price": item.value_object.get("Price", {}).get("confidence"),
                        "total_price": item.value_object.get("TotalPrice", {}).get("confidence")
                    }
                }
                items.append(item_data)
            receipt_data["items"] = items

        output.append(receipt_data)

    return output

def testlib():
    return "Test OCRLIB"

# Example usage:
if __name__ == "__main__":
    local_receipt_path = "/Users/hthakkar/Downloads/test1.png"
    sas_token = None

    try:
        uploaded_blob_url = upload_receipt_to_blob(local_receipt_path, sas_token=sas_token)
        print(f"Uploaded blob URL: {uploaded_blob_url}")

        analysis_output = analyze_receipt_image(uploaded_blob_url)
        print("Analysis JSON Output:")
        print(json.dumps(analysis_output, indent=2))
    except Exception as e:
        print("An error occurred:")
        print(e)
