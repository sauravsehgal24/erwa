import initialState from "../initialState";



const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case "err":
            state.appMessage.active=action.payload.active;
            state.appMessage[action.type] = action.payload.message
            return state;
        case "warn":
            state.appMessage.active=action.payload.active;
            state.appMessage[action.type] = action.payload.message
            return state
        default:
            return state;
    }
  };
  
  export default messageReducer;