import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice/userSlice';

const useSignUp = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { status, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(formData));
    };

    return {
        formData,
        handleChange,
        handleSignUpSubmit,
        loading: status === 'loading',
        error
    };
};

export default useSignUp;
