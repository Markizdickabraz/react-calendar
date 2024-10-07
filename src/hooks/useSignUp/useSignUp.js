import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpMutation from './signUp.gql';
import signInMutation from '../useSignIn/signIn.gql';
import useGetTodos from '../useGetTodos/useGetTodos';

const useSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        const query = signUpMutation(formData);

        try {
            const response = await fetch('https://app.test.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            const data = await response.json();

            if (data.errors) {
                console.error(data.errors);
            } else {
                console.log('User registered successfully:', data.data.createCustomer.customer);

                const signInQuery = signInMutation({
                    email: formData.email,
                    password: formData.password
                });

                const signInResponse = await fetch('https://app.test.test/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: signInQuery })
                });

                const signInData = await signInResponse.json();

                if (signInData.errors) {
                    console.error(signInData.errors);
                } else {
                    const token = signInData.data.generateCustomerToken.token;
                    localStorage.setItem('customerToken', token);
                    setToken(token);
                }
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
        handleSignUpSubmit,
        todos,
        loading,
        error
    };
};

export default useSignUp;
