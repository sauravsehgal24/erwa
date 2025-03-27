import initialState from "../initialState";

const receiptReducer = (state = initialState, action) => {
    switch(action.type){
        case "VIEW":
            return {
                ...state,
                receipt:{
                    isViewReceiptActive:true,
                }
            }
        case "HIDE":
            return {
                ...state,
                receipt:{
                    isViewReceiptActive:false,
                }
            }
        default:
            return state;
    }
  };
  
  export {receiptReducer};