
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const backContent = '<-';
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    
    return (
        <div onClick={handleBack}>  
            <button className="btn btn-outline-primary">
                {backContent}
            </button>
        </div>
    )
}

export default BackButton;