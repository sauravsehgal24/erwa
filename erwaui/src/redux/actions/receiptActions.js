const viewReceipt = (index) => ({
    type: "VIEW",
    payload:index
});

const hideReceipt = () => ({
    type: "HIDE"
});

const addReceipt = (receipt) => ({
    type: "ADD",
    payload: receipt
});


export { viewReceipt, hideReceipt, addReceipt};