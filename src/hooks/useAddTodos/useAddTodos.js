import addTodoMutation from "./addTodos.gql";

const useAddTodo = () => {
    const fetchAddTodo = async (todoData) => {
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
                    query: addTodoMutation(),
                    variables: { input: todoData }
                })
            });

            const result = await response.json();
            if (response.ok && !result.errors) {
                const savedTodos = localStorage.getItem('customerTodos');

                if (savedTodos) {
                    const parsedTodos = JSON.parse(savedTodos);
                    parsedTodos.push(result.data.createTask);
                    localStorage.setItem('customerTodos', JSON.stringify(parsedTodos));
                } else {
                    localStorage.setItem('customerTodos', JSON.stringify([result.data.createTask]));
                }

                return result.data.createTask;
            } else {
                console.error("Помилка при створенні таска:", result.errors);
            }
        } catch (error) {
            console.error("Виникла помилка:", error);
        }
    };

    return { fetchAddTodo };
};

export default useAddTodo;
