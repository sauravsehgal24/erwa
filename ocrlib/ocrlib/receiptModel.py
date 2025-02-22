"""
This code sample shows Prebuilt Receipt operations with the Azure AI Document Intelligence client library.
The async versions of the samples require Python 3.8 or later.

To learn more, please visit the documentation - Quickstart: Document Intelligence (formerly Form Recognizer) SDKs
https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?pivots=programming-language-python
"""

from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest
import os
"""
Remember to remove the key from your code when you're done, and never post it publicly. For production, use
secure methods to store and access your credentials. For more information, see 
https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
"""
os.environ["FORM_RECOGNIZER_ENDPOINT"] = "https://expensereceiptai.cognitiveservices.azure.com"
os.environ["FORM_RECOGNIZER_KEY"] = "2I2ZXVwiW1jZgqzAl6NEMZsPKpaLHocgwAQnhOlKONm4tYoNxWxQJQQJ99BBACBsN54XJ3w3AAALACOGe29c"

# Now, retrieve them
ENDPOINT = os.environ.get("FORM_RECOGNIZER_ENDPOINT")
KEY = os.environ.get("FORM_RECOGNIZER_KEY")

print(f"Endpoint: {ENDPOINT}")
print(f"Key: {KEY}")

# Ensure the key is a valid string
if not ENDPOINT or not KEY:
    raise ValueError("ERROR: FORM_RECOGNIZER_ENDPOINT and FORM_RECOGNIZER_KEY must be set!")

# Ensure the key is a string before passing it to AzureKeyCredential
if not isinstance(KEY, str):
    raise TypeError("ERROR: The FORM_RECOGNIZER_KEY must be a string.")


# sample document
url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"

document_intelligence_client  = DocumentIntelligenceClient(
    endpoint=ENDPOINT, credential=AzureKeyCredential(KEY)
)

poller = document_intelligence_client.begin_analyze_document(
    "prebuilt-receipt", AnalyzeDocumentRequest(url_source=url)
)
receipts = poller.result()

for idx, receipt in enumerate(receipts.documents):
    print("--------Recognizing receipt #{}--------".format(idx + 1))
    receipt_type = receipt.doc_type
    if receipt_type:
        print(
            "Receipt Type: {}".format(receipt_type)
        )
    merchant_name = receipt.fields.get("MerchantName")
    if merchant_name:
        print(
            "Merchant Name: {} has confidence: {}".format(
                merchant_name.value_string, merchant_name.confidence
            )
        )
    transaction_date = receipt.fields.get("TransactionDate")
    if transaction_date:
        print(
            "Transaction Date: {} has confidence: {}".format(
                transaction_date.value_date, transaction_date.confidence
            )
        )
    if receipt.fields.get("Items"):
        print("Receipt items:")
        for idx, item in enumerate(receipt.fields.get("Items").value_array):
            print("...Item #{}".format(idx + 1))
            item_description = item.value_object.get("Description")
            if item_description:
                print(
                    "......Item Description: {} has confidence: {}".format(
                        item_description.value_string, item_description.confidence
                    )
                )
            item_quantity = item.value_object.get("Quantity")
            if item_quantity:
                print(
                    "......Item Quantity: {} has confidence: {}".format(
                        item_quantity.value_number, item_quantity.confidence
                    )
                )
            item_price = item.value_object.get("Price")
            if item_price:
                print(
                    "......Individual Item Price: {} has confidence: {}".format(
                        item_price.value_currency.amount, item_price.confidence
                    )
                )
            item_total_price = item.value_object.get("TotalPrice")
            if item_total_price:
                print(
                    "......Total Item Price: {} has confidence: {}".format(
                        item_total_price.value_currency.amount, item_total_price.confidence
                    )
                )
    subtotal = receipt.fields.get("Subtotal")
    if subtotal:
        print(
            "Subtotal: {} has confidence: {}".format(
                subtotal.value_currency.amount, subtotal.confidence
            )
        )
    tax = receipt.fields.get("TotalTax")
    if tax:
        print("Tax: {} has confidence: {}".format(tax.value_currency.amount, tax.confidence))
    tip = receipt.fields.get("Tip")
    if tip:
        print("Tip: {} has confidence: {}".format(tip.value_currency.amount, tip.confidence))
    total = receipt.fields.get("Total")
    if total:
        print("Total: {} has confidence: {}".format(total.value_currency.amount, total.confidence))
    print("--------------------------------------")
