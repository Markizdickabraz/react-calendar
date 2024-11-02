import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import signUpMutation from './signUp.gql';
import signInMutation from '../useSignIn/signIn.gql';
import { getTodos } from '../../redux/slice/todosSlice';

const useSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

                    // Dispatch getTodos action with the token
                    dispatch(getTodos(token));
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/calendar');
        }
    }, [token, navigate]);

    return {
        formData,
        handleChange,
        handleSignUpSubmit
    };
};

export default useSignUp;
