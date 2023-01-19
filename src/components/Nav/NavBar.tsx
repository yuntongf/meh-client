
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { searchResult } from '../../styles/SearchResultStyles';
import { RootState, IComment, IUser } from '../../store/configureStore';
import { Link } from 'react-router-dom';
import MehWindow from '../MehWindow';
import { mehSet } from '../../store/reducers/nav';
import { getUser } from '../../services/UserServices';
import { userLoggedIn } from '../../store/reducers/auth';

const NavBar = () => {

  const dispatch = useDispatch();
  // get user
  const loggedInUser: IUser = getUser();

  useEffect(() => {
    dispatch(userLoggedIn(loggedInUser));
  });

  const handleMeh = () => {
    dispatch(mehSet(true));
  }
  return (
    <>
      <div className="col-1">
        <ul className="list-group" style={searchResult}>
          <Link className='list-group-item' to="/home" style={{height: 50, fontSize:20}}>
            Home
          </Link>
          <Link className='list-group-item' to="/messages" style={{height: 50, fontSize:20}}>
            Messages
          </Link>

          <Link className='list-group-item' to={`/liked`} style={{height: 50, fontSize:20}}>
            Liked
          </Link>

          <Link className='list-group-item' to={`/saved`} style={{height: 50, fontSize:20}}>
            Saved
          </Link>

          <Link className='list-group-item' to={`/profile/${loggedInUser._id}`} style={{height: 50, fontSize:20}}>
            Profile
          </Link>
        </ul>
          <button className='btn btn-primary mt-3' onClick={handleMeh} style={{borderRadius: '40px', width: 100}}>
            Meh
          </button>
      </div>
      {loggedInUser && <MehWindow/>}
      {/* {messageTo && <MessageWindow/>} */}
    </>
    
    )
}

export default NavBar;