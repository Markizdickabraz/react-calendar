import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slice/userSlice';
import {useNavigate} from 'react-router-dom';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <button className='absolute top-24 left-4' onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
