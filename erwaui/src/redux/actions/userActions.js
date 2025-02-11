// Action types
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: userInfo,
});
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export { loginRequest, loginSuccess, loginFailure };