import api from '../../util/api'
import { loginSuccess } from '../actions/userActions';
import { renderErrMessage } from '../actions/messageAction';

const loginUser =  (email, paswd, requestType) => {
    const uri = requestType=="LOGIN"?"/user/login":"/user/register"
    return async (dispatch) => {
    //   dispatch(loginRequest());
        await api.post(uri,{
            email:email,
            password:paswd,
            role:"USER"
        }).then((res)=>{ 
            console.log("res")
            console.log(res)
            if(res.status == 200){
                dispatch(loginSuccess(res.data));
            }
            else{
                dispatch(renderErrMessage("Internal error during login"));
            }
        }).catch((err)=>{
            dispatch(renderErrMessage("Internal error during login"));
        })
    }
}

export {loginUser}