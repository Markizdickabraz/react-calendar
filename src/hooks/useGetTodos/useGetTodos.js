import { useState, useEffect } from 'react';
import getTodosQuery from './getTodos.gql';

const useGetTodos = (token) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            if (!token) return;

            try {
                const response = await fetch('https://app.test.test/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ query: getTodosQuery })
                });

                const data = await response.json();
                console.log(data);

                if (data.errors) {
                    setError(data.errors);
                    console.error('Error fetching todos:', data.errors);
                } else {
                    const todosData = data.data.getCustomerTodos;
                    setTodos(todosData);

                    localStorage.setItem('customerTodos', JSON.stringify(todosData));
                }
            } catch (err) {
                setError(err);
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [token]);

    return { todos, loading, error };
};

export default useGetTodos;
