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
        // save token in local storage
        if(!localStorage.getItem("access_token")) localStorage.setItem("access_token",action.payload.access_token)
          console.log(action.payload)
        return {
          ...state,
          appProperties:{
            loading:false
          },
          userInfo:{
            email:action.payload.email,
            role:action.payload.role,
            accessToken:action.payload.access_token,
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