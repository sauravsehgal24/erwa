import initialState from "../initialState";



// Action types
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

// Reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, appProperties:{
            loading:true
        } };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          appProperties:{
            loading:true
          },
          userInfo:{
            username:action.payload.userInfo.username,
            role:action.payload.userInfo.role,
            email:action.payload.userInfo.email,
            accessToken:action.payload.userInfo.token,
          }
        };
  
      case LOGIN_FAILURE:
        return { ...state, appProperties:{
            loading:true
        },
        appMessage:{
            active:true,
            
        }
     };
  
      default:
        return state;
    }
  };

  export default authReducer;