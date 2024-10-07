import logoutMutation from "./logout.gql";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const fetchLogout = async () => {
        try {
            const token = localStorage.getItem('customerToken');

            if (!token) {
                console.error("Токен відсутній");
                return;
            }

            const response = await fetch('https://app.test.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: logoutMutation().query
                })
            });

            const result = await response.json();
            if (response.ok && !result.errors) {
                localStorage.removeItem('customerToken');
                localStorage.removeItem('customerTodos');
                navigate('/');
            } else {
                console.error("Помилка при логауті:", result.errors);
            }
        } catch (error) {
            console.error("Виникла помилка:", error);
        }
    };

    return { fetchLogout };
};

export default useLogout;
