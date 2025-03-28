import initialState from "../initialState";

const receiptReducer = (state = initialState, action) => {
    switch(action.type){
        case "VIEW":
            const s = {
                ...state,
                receipt:{
                    ...state.receipt,
                    isViewReceiptActive:true,
                    selectedReceipt: action.payload
                }
            }
            return s
        case "HIDE":
            return {
                ...state,
                receipt:{
                    isViewReceiptActive:false,
                    selectedReceipt:""
                }
            }
        case "ADD":
            console.log("receipts")
            const receipts = [...state.receipt.userReceipts,action.payload]
            console.log(receipts)
            return {
                ...state,
                receipt:{
                    ...state.receipt,
                    userReceipts: [...receipts]
                }
            }
        default:
            return state;
    }
  };
  
  export {receiptReducer};