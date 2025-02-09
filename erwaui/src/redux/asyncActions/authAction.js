import config from 'config/config';
import api from '../../util/api'
import { loginSuccess } from 'redux/actions/userActions';
import { renderErrMessage } from 'redux/actions/messageAction';

export const loginUser = (uname, paswd) => {
    return async (dispatch) => {
      dispatch(loginRequest());
        await api.post(config.apiConfig.baseURL+"/user/login",data={
            username:uname,
            password:paswd
        }).then((res)=>{
            if(res.status == 200){
                const { token, userInfo } = response.data;
                dispatch(loginSuccess(token, userInfo));
            }
            else{
                dispatch(renderErrMessage("Internal error during login"));
            }
        }).catch((err)=>{
            dispatch(renderErrMessage("Internal error during login"));
        })
    }
}