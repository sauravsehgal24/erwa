import api from '../../util/api'
import { loginSuccess } from '../actions/userActions';
import { renderErrMessage, renderSuccessMessage } from '../actions/messageAction';

const loginUser =  (email, paswd, requestType, full_name, job) => {
    const uri = requestType=="LOGIN"?"/user/login":"/user/register"
    return async (dispatch) => {
    //   dispatch(loginRequest());
        await api.post(uri,{
            email:email,
            password:paswd,
            role:"USER",
            full_name:full_name,
            job:job
        }).then((res)=>{ 
            if(res.status == 200){
                dispatch(loginSuccess(res.data));
                dispatch(renderSuccessMessage(requestType=="LOGIN"?"SignIn Success!":"SignUp Success!"))
            }
            else{
                dispatch(renderErrMessage("Login Error"));
            }
        }).catch((err)=>{
            dispatch(renderErrMessage(requestType=="LOGIN"?"Username or Password Incorrect!":"Error During SignUp!"));
        })
    }
}

export {loginUser}