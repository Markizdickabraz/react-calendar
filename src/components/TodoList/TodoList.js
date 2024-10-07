import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TodoItem from '../TodoItem/TodoItem';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

const TodoList = ({ todos, onClose }) => {
    const { t } = useTranslation();
    const [isOpenTaskForm, setIsOpenTaskForm] = useState(false);
    const [todoList, setTodoList] = useState(todos);

    const handleToggleStatus = (taskId) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === taskId
                    ? { ...todo, status: todo.status === 'complete' ? 'pending' : 'complete' }
                    : todo
            )
        );
    };

    const handleAddTask = (newTask) => {
        setTodoList([...todoList, newTask]);
    };

    // Відкриття форми додавання завдання
    const openAddTaskForm = () => {
        setIsOpenTaskForm(true);
    };

    const closeAddTaskForm = () => {
        setIsOpenTaskForm(false);
    };

    return (
        <div className='absolute z-10 w-full h-full bg-white p-16'>
            <button
                className='absolute top-10 right-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300'
                onClick={onClose}
            >
                {t('close_tasklist')}
            </button>

            <ul className='flex gap-2 flex-col mt-10'>
                {todoList.length > 0 ? (
                    todoList.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={{ ...todo, number: index + 1 }}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))
                ) : (
                    <li className='text-center py-4'>{t('no_tasks')}</li>
                )}

                <button
                    className='w-64 mx-auto mb-0 mt-12 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                    onClick={openAddTaskForm}
                    type='button'
                >
                    {t('add_task')}
                </button>

                {isOpenTaskForm && (
                    <AddTaskForm
                        onClose={closeAddTaskForm}
                        onAddTask={handleAddTask}
                    />
                )}
            </ul>
        </div>
    );
};

export default TodoList;
