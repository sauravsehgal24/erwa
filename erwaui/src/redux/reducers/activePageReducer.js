import initialState from "../initialState";



const activePageReducer = (state = initialState, action) => {
    switch(action.type){
        case "CHANGE_TITLE":
            return {
                ...state,
                activePage:{
                    title: action.payload
                }
            }
        // case "warn":
        //     state.appMessage.active=action.payload.active;
        //     state.appMessage[action.type] = action.payload.message
        //     return state
        default:
            return state;
    }
  };
  
  export default activePageReducer;