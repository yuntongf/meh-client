
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore'
import NavBar from '../components/Nav/NavBar';
import { getUser } from '../services/UserServices';
import Follows from '../components/Follow/Follows';
import MessageWindow from '../components/MessageWindow';
import { baseURL } from '../services/HttpServices';

const MessagesPage = () => {
  const [chats, setChats] = useState([]);
  const user = getUser();

  const following = useSelector((store : RootState) => store.entities.following);

  useEffect(() => {
    fetch(`${baseURL}/api/chats/${user._id}`)
    .then(res => res.json())
    .then(function (chats) {
      console.log("chats are", JSON.stringify(chats));
    })
  }, [chats])

   return (
        <>
            <div className='d-flex justify-content-center mt-5'>  
                <NavBar />
                <div className='col-5 ps-4' style={{maxHeight: 700, overflow: 'auto' }}>
                    <div className=''>
                        <Follows follows={following}/>
                    </div>
                </div>
                <MessageWindow/>
            </div>
        </>
   );
}

export default MessagesPage;