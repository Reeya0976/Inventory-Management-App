import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Forgot from "./pages/auth/Forgot";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
     async function loginStatus() {
      const status = await  getLoginStatus()
      dispatch(SET_LOGIN(status))
     }
     loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path = "/" element ={<Home/>} />
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
      <Route path ="/forgot" element={<Forgot/>}/>
      <Route path ="/resetpassword/:resetToken" element={<Reset/>}/>

      <Route path="/dashboard" element={
        <Sidebar>
          <Layout>
            <Dashboard/>
          </Layout>
        </Sidebar>
      } />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
