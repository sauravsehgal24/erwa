const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token, userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: { userInfo, token },
});
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export { loginRequest, loginSuccess, loginFailure };