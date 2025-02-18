import initialState from "../initialState";

const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case "ERR":
            return {
                ...state,
                appMessage:{
                    active:true,
                    type:"ERR",
                    color:"#ffc3ba",
                    message:action.payload
                }
            }
        case "SUCCESS":
            return {
                ...state,
                appMessage:{
                    active:true,
                    type:"SUCCESS",
                    color:"#c1fcc0",
                    message:action.payload
                }
            }
        case "HIDE_MESSAGE":
            return {
                ...state,
                appMessage:{
                    active:false,
                    type:null,
                    message:null,
                    color:null
                }
            }
        case "WARN":
            return {
                ...state,
                appMessage:{
                    active:true,
                    type:"WARN",
                    color:"#fafab6",
                    message:action.payload
                }
            }
        default:
            return state;
    }
  };
  
  export {messageReducer};