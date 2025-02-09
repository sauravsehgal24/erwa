import initialState from "../initialState";

const hideMessage = (state = initialState,action)=>{
    switch(action.type){
        case "HIDE_MESSAGE":
            return {
                ...state,
                appMessage:{
                    active:false,
                    type:null,
                    message:null
                }
            }
        default:
            return state;
    }
}

const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case "ERR":
            return {
                ...state,
                appMessage:{
                    active:true,
                    type:"ERR",
                    message:action.payload
                }
            }
        case "WARN":
            return {
                ...state,
                appMessage:{
                    active:true,
                    type:"WARN",
                    message:action.payload
                }
            }
        default:
            return state;
    }
  };
  
  export {messageReducer, hideMessage};