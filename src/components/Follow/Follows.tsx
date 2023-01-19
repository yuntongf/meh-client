
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { searchResult } from '../../styles/SearchResultStyles';
import { RootState, IComment } from '../../store/configureStore';
import user from '../../data/user';
import UserHeader from '../Author/UserHeader';
import { toastSuccess, toastWarn } from '../../services/NotificationServices';
import Follow from './Follow';
import { IUser } from '../../store/configureStore';
import { ObjectId } from 'bson';

interface FollowsProps {
    follows: ObjectId[]
}

const Follows = ({follows} : FollowsProps) => {
  const dispatch = useDispatch();

  return (
    <>{follows[0] ?
      <div className="">
        <ul className="list-group" style={searchResult}>
          {follows.map((follow : ObjectId) => (
            <Follow follow={follow}/>
          ))}
        </ul>
      </div>
      :
      <div className='d-flex justify-content-center'>
          <div style={{fontSize:18}}>
            Follow an account to start chatting!
          </div>
        </div>}
    </>
    
    )
}

export default Follows;