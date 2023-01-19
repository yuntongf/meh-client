
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import Detail from '../components/SearchResult/Detail'
import BackButton from '../components/Detail/BackButton'

const DetailPage = () => {

   return (
        <>  
            <div className='mt-3 ms-5'>
                <BackButton/>
            </div>
            <div className="d-flex justify-content-center">
                <div className='col-6'>
                    <Detail/>
                </div>
            </div>
        </>
   );
}

export default DetailPage;