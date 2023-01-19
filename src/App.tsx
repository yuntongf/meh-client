import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage'
import MessagesPage from './pages/MessagesPage'
import SavedPage from './pages/SavedPage'
import FollowingPage from './pages/FollowPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from './store/reducers/auth'
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { IUser } from './store/configureStore';
import RegisterPage from './pages/RegisterPage';
import jwtDecode from "jwt-decode";
import { getJwt } from './services/AuthServices';
import LikedPage from './pages/LikedPage';
import NotFound from './pages/NotFound'


function App() {
  const dispatch = useDispatch();
  const landingPageUrl = getJwt() ? '/home' : '/login';

  function prepareUser() {
    const jwt = getJwt(); // json web token (jwt) contains logged in user info
    if (jwt) {            
      const loggedInUser: IUser = jwtDecode(jwt as any);
      dispatch(userLoggedIn(loggedInUser));
    }
  }

  useEffect(() => {
      prepareUser();
  }, [])

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={landingPageUrl} replace />
          }
        />
        <Route
          path='/home'
          element={
            <MainPage />
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage />
          }
        />
        <Route
          path='/register'
          element={
            <RegisterPage />
          }
        />

        <Route
          path='/post/:id'
          element={
            <DetailPage />
          }
        />
        < Route
          path='/profile/:id'
          element={
            <ProfilePage />
          }
        />
         < Route
          path='/liked'
          element={
            <LikedPage />
          }
        />
        < Route
          path='/saved'
          element={
            <SavedPage />
          }
        />
        < Route
          path='/following'
          element={
            <FollowingPage />
          }
        />
        < Route
          path='/messages'
          element={
            <MessagesPage/>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes >
    </div >
  )
}

export default App
