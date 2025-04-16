import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import '../App.css';

import { AuthContext } from '../Context/AuthContext.jsx';

import Layout from '../Pages/Layout';
import Home from '../Pages/Home';
import Spaces from '../Pages/Spaces';
import Reservations from '../Pages/Reservations.jsx';

import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';

import AdminLogin from '../Pages/Admin/AdminLogin.jsx';
import AdminReservations from '../Pages/Admin/AdminReservations.jsx';

import GuestRoutes from '../Routes/GuestRoutes.jsx';
import AdminRoutes from '../Routes/AdminRoutes.jsx';
import UserRoutes from '../Routes/UserRoutes.jsx';
export default function AppRouter() {

  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
          <Route element={<GuestRoutes />}> 
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
          </Route>
        
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element ={<UserRoutes />}>
              <Route path="/spaces" element={<Spaces />} /> 
              <Route path="/reservations" element={<Reservations />} />
            </Route>
          </Route>

          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<AdminRoutes />}>
            <Route path="/admin/reservations" element={<AdminReservations />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
