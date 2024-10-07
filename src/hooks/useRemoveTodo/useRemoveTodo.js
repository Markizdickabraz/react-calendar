import deleteTodoMutation from "./removeTodo.gql";

const useDeleteTodo = () => {

    const fetchDeleteTodo = async (taskId) => {
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
                    query: deleteTodoMutation(),
                    variables: { taskId }
                })
            });

            const result = await response.json();
            if (response.ok && !result.errors) {
                console.log(result.data.deleteTask.message);

                const savedTodos = localStorage.getItem('customerTodos');
                if (savedTodos) {
                    const parsedTodos = JSON.parse(savedTodos);
                    const updatedTodos = parsedTodos.filter(todo => todo.id !== taskId);
                    localStorage.setItem('customerTodos', JSON.stringify(updatedTodos));
                }
            } else {
                console.error("Помилка при видаленні таска:", result.errors);
            }
        } catch (error) {
            console.error("Виникла помилка:", error);
        }
    };

    return { fetchDeleteTodo };
};

export default useDeleteTodo;
