import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.jsx'
import Layout from '../Pages/Layout'
import Home from '../Pages/Home'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import '../App.css'
import GuestRoutes from '../Routes/GuestRoutes.jsx'
import AdminRoutes from '../Routes/AdminRoutes.jsx'
import AdminLogin from '../Pages/Admin/AdminLogin.jsx'
import AdminReservations from '../Pages/Admin/AdminReservations.jsx'
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
          </Route>

          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<AdminRoutes />}>
            <Route path="/admin/reservations" element={<AdminReservations />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
