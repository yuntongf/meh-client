
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { searchResult } from '../../styles/SearchResultStyles';
import { IUser } from '../../store/configureStore';
import { Link } from 'react-router-dom';
import MehWindow from '../MehWindow';
import { modalSet } from '../../store/reducers/nav';
import { getUser } from '../../services/UserServices';
import { userLoggedIn } from '../../store/reducers/auth';
import { baseURL } from '../../services/HttpServices';
import { loadPosts, userSet } from '../../store/reducers/posts';

const navBarStyle = {
  width: 200, 
  marginLeft: '10%'
}
const navBarSectionStyle = {
  height: 50, 
  fontSize:20
};
const messageButtonStyle = {
  height: 44,
  borderRadius: '40px',
  width: '75%',
  fontSize: 18
};

const NavBar = () => {
  // get user
  const loggedInUser: IUser = getUser();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLoggedIn(loggedInUser));
  }, []);

  async function getLikedPosts() {
    fetch(`${baseURL}/api/user/liked/posts/${loggedInUser._id}`)
    .then(res => res.json())
    .then(function (posts) {
        dispatch(loadPosts(posts));
    })
  }

  async function getSavedPosts() {
    fetch(`${baseURL}/api/user/saved/posts/${loggedInUser._id}`)
    .then(res => res.json())
    .then(function (posts) {
        dispatch(loadPosts(posts));
    })
  }

  const handleLikePage = async () => {
    await getLikedPosts();
  }

  const handleSavePage = async () => {
    await getSavedPosts();
  }

  const handleProfilePage = () => {
    dispatch(userSet(getUser()));
}

  const handleModal = () => {
    dispatch(modalSet(true));
  }
  return (
    <>
      <div className="col-1" style={navBarStyle}>
        <ul className="" style={searchResult}>
          <Link className='list-group-item' to="/home" style={navBarSectionStyle}>
            Home
          </Link>
          <Link className='list-group-item' to="/messages" style={navBarSectionStyle}>
            Messages
          </Link>

          <Link className='list-group-item' to='/liked' style={navBarSectionStyle} onClick={handleLikePage}>
            Liked
          </Link>

          <Link className='list-group-item' to='/saved' style={navBarSectionStyle} onClick={handleSavePage}>
            Saved
          </Link>

          <Link className='list-group-item' to={`/profile/${loggedInUser._id}`} style={navBarSectionStyle} onClick={handleProfilePage}>
            Profile
          </Link>
        </ul>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-primary mt-2' onClick={handleModal} style={messageButtonStyle}>
            Meh
          </button>
        </div>
      </div>
      {loggedInUser && <MehWindow/>}
    </>
    
    )
}

export default NavBar;