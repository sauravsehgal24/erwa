import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logoutRequest} from "../../../redux/actions/userActions"
import { renderSuccessMessage } from "../../../redux/actions/messageAction";
function Logout(){
    localStorage.clear()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        // dispatch logout 
        dispatch(logoutRequest()) 
        dispatch(renderSuccessMessage("Logout Success!"));
        navigate("/auth/sign-in")
    },[])

    return (<h3>LOGGING OUT ...</h3>)
}

export default Logout