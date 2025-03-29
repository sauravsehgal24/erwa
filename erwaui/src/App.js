import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import api from 'util/api';
import { loginSuccess } from './redux/actions/userActions';
import { useNavigate } from "react-router-dom";
import MessagePopUp from 'components/message/MessagePopUp';
import ReceiptViewPopup from 'views/employee/receipt_view/ReceiptViewPopup';

export default function Main() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    // if token is available in local storage then fetch the user info 
    const token = localStorage.getItem("access_token")
    if(token && !user.email){
      api.get("/user/get_user_by_email").then((res)=>{
        const userInfo = res.data
        userInfo.access_token = token
        dispatch(loginSuccess(userInfo))
        navigate("/main/profile")
      }).catch((err)=>{
        console.log(err)
      })
    }
  },[])
  
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="main/*" 
          element={
            user.email ? <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} /> :
            <Navigate to="/auth/sign-in" replace />
          }
        />
        <Route path="/" element={!user.email ? <Navigate to="/auth/sign-in" replace />: <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
      </Routes>
      <MessagePopUp />
      <ReceiptViewPopup />
    </ChakraProvider>
  );
}
