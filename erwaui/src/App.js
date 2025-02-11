import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

// Chakra imports

export default function Main() {
  const user = useSelector((state) => state.user.userInfo.email);

  // useEffect(()=>{
  //   // if token is available in local storage then fetch the user info 
  //   const token = localStorage.getItem("access_token")
  //   if(token){

  //   }
  // },[])
  
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*" 
          element={
            user ? <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} /> :
            <Navigate to="/auth/sign-in" replace />
          }
        />
        {/* <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        /> */}
        <Route path="/" element={!user ? <Navigate to="/auth/sign-in" replace />: <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
      </Routes>
    </ChakraProvider>
  );
}
