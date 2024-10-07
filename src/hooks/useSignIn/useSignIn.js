import { useState, useEffect } from 'react';
import signInMutation from './signIn.gql';
import { useNavigate } from "react-router-dom";
import useGetTodos from '../useGetTodos/useGetTodos';

const useSignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        const { query, variables } = signInMutation(formData);

        try {
            const response = await fetch('https://app.test.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query, variables })
            });

            const data = await response.json();

            if (data.errors) {
                console.error('Login failed:', data.errors);
            } else {
                const token = data.data.generateCustomerToken.token;
                localStorage.setItem('customerToken', token);
                setToken(token);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { todos, loading, error } = useGetTodos(token);

    useEffect(() => {
        if (token && !loading && !error) {
            navigate('/calendar');
        }
    }, [token, loading, error, navigate]);

    return {
        formData,
        handleChange,
        handleSignInSubmit,
        todos,
        loading,
        error
    };
};

export default useSignIn;
