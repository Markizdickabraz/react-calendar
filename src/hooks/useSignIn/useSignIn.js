import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux/slice/userSlice';
import { selectTodos, selectLoading, selectError } from '../../redux/slice/todosSlice';

const useSignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { token, status, error } = useSelector((state) => state.user);

    const todos = useSelector(selectTodos);
    const loadingTodos = useSelector(selectLoading);
    const todosError = useSelector(selectError);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateFormData = (formData) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.password || !passwordRegex.test(formData.password)) {
            console.error("Invalid password. Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            console.error("Invalid name. Name must be a valid email address.");
            return;
        }

        dispatch(signIn(formData));
    };


    const handleSignInSubmit = (e) => {
        e.preventDefault();
        validateFormData(formData);
    };

    useEffect(() => {
        if (token) {
            navigate('/calendar');
        }
    }, [token, navigate]);

    return {
        formData,
        handleChange,
        handleSignInSubmit,
        loading: status === 'loading' || loadingTodos,
        error,
        todos,
        todosError
    };
};

export default useSignIn;
