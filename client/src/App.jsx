import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/global.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUser,
  setToken,
  setUserId,
  setPicture,
} from "./Store/userSlice";
function App() {

  const dispatch = useDispatch();

useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user"));
  const picture = localStorage.getItem("picture");

  if (token) dispatch(setToken(token));
  if (userId) dispatch(setUserId(userId));
  if (user) dispatch(setUser(user));
  if (picture) dispatch(setPicture(picture));
}, []);
  return (
    <div className='App text-light'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
