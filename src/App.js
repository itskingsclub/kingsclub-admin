import React, { Suspense, useContext } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import { UserContext } from './userDetail/Userdetail'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Otp = React.lazy(() => import('./views/pages/otp/Otp'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const AppRoutes = () => {
  const { userDetail } = useContext(UserContext)
  return (
    <Routes>
      <Route exact path="/" element={userDetail.id ? <DefaultLayout /> : <Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/otp" element={userDetail.id ? <Navigate to="/" /> : <Otp />} />
      <Route exact path="/404" element={<Page404 />} />
      <Route exact path="/500" element={<Page500 />} />
      <Route path="/*" element={userDetail.id ? <DefaultLayout /> : <Navigate to="/" />} />
    </Routes>
  )
}

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <AppRoutes />
      </Suspense>
    </HashRouter>
  )
}

export default App
