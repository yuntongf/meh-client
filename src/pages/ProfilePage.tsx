
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import NavBar from '../components/Nav/NavBar'
import Profile from '../components/Profile/Profile'

const ProfilePage = () => {
   return (
        <>  
            <div className="d-flex justify-content-center mt-5">
                <NavBar/>
                <div className='col-5 ps-4'>
                    <Profile/>
                </div>
            </div>
        </>
   );
}

export default ProfilePage;