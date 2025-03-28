const viewReceipt = (ocr_json) => ({
    type: "VIEW",
    payload:ocr_json
});

const hideReceipt = () => ({
    type: "HIDE"
});

const addReceipt = (receipt) => ({
    type: "ADD",
    payload: receipt
});


export { viewReceipt, hideReceipt, addReceipt};