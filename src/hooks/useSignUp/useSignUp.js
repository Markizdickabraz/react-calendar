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

    const validateFormData = (formdata) => {
        console.log(formData)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z\s\-]+$/;

        if (!formData.firstName || !nameRegex.test(formData.firstName) || !formData.lastName || !nameRegex.test(formData.lastName)) {
            console.error(
                "Invalid name. Only letters, spaces, and hyphens are allowed."
            );
            return;
        }


        if (!formData.password || !passwordRegex.test(formData.password)) {
            console.error("Invalid password. Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            console.error("Invalid name. Name must be a valid email address.");
            return;
        }

        dispatch(signUp(formData));
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        validateFormData(formData);
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
