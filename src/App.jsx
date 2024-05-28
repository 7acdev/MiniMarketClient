import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// Providers
import { AuthProvider } from './context/auth-provider'
import { UsersProvider } from './context/users-provider'
import { ProductsProvider } from './context/products-provider'

// Public
import Layout from './layout/Layout'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Confirm from './pages/user/Confirm'
import RestorePassword from './pages/user/RestorePassword'
import NewPassword from './pages/user/NewPassword'

// Need Login
import ProtectedLayout from './layout/ProtectedLayout'
import Profile from './pages/user/Profile'
import Dashboard from './pages/user/Dashboard'
import Sale from './pages/user/Sale'
import SaleHistory from './pages/user/SaleHistory'

// Admin
import AdminLayout from './layout/AdminLayout'
import Users from './pages/admin/Users'
import Products from './pages/admin/Producs'
import RegisterProduct from './pages/admin/RegisterProduct'

//import './config/css/swal-blur.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <ProductsProvider>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/confirm/:token' element={<Confirm />} />
                <Route path='/restore-password' element={<RestorePassword />} />
                <Route path='/new-password/:token' element={<NewPassword />} />
              </Route>

              <Route path='/' element={<ProtectedLayout />}>
                <Route index element={<Profile />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/sale-history' element={<SaleHistory />} />
              </Route>

              <Route path='/' element={<AdminLayout />}>
                <Route index element={<Profile />} /> {/* TODO: Cambiar a Dashboard */}
                <Route path='/users' element={<Users />} />
                <Route path='/register-by-admin' element={<Register />} />
                <Route path='/products' element={<Products />} />
                <Route path='/register-product' element={<RegisterProduct />} />
              </Route>
            </Routes>
          </ProductsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
