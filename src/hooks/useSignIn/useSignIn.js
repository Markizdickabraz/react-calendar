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

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(formData));
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
