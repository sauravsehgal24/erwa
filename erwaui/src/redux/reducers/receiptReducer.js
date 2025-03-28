import initialState from "../initialState";

const receiptReducer = (state = initialState, action) => {
    switch(action.type){
        case "VIEW":
            return {
                ...state,
                receipt:{
                    isViewReceiptActive:true,
                    selectedReceiptIndex: action.payload
                }
            }
        case "HIDE":
            return {
                ...state,
                receipt:{
                    isViewReceiptActive:false,
                    selectedReceiptIndex: -1
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