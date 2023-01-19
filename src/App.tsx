import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage'
import MessagesPage from './pages/MessagesPage'
import SavedPage from './pages/SavedPage'
import MehWindow from './components/MehWindow'
import FollowingPage from './pages/FollowPage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedIn } from './store/reducers/auth'
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { IUser, RootState } from './store/configureStore';
import RegisterPage from './pages/RegisterPage';
import jwtDecode from "jwt-decode";
import { toastSuccess } from './services/NotificationServices';
import { getJwt } from './services/AuthServices';
import LikedPage from './pages/LikedPage';


function App() {
  const dispatch = useDispatch();
  //const user = useSelector((store : RootState) => store.auth.user);

  const landingPageUrl = getJwt() ? '/home' : '/login';

  function prepareUser() {
    const jwt = getJwt();
    const loggedInUser: IUser = jwtDecode(jwt as any);
    console.log(loggedInUser);
    dispatch(userLoggedIn(loggedInUser));
  }

  useEffect(() => {
     try {
      prepareUser();
    } catch (ex) {
        toastSuccess('🦄 Welcome! Please register for an account or log in.');
    }
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
        < Route
          path='/compose/:type'
          element={
            <>
            <MainPage/>
            <MehWindow />
            </>
          }
        />
      </Routes >
    </div >
  )
}

export default App
