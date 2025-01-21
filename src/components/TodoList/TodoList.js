import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TodoItem from '../TodoItem/TodoItem';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { shallowEqual, useSelector } from "react-redux";
import { selectTodos } from "../../redux/slice/todosSlice";
import { Toaster } from "react-hot-toast";

const TodoList = ({ onClose, date }) => {
    const {todos} = useSelector(selectTodos, shallowEqual);
    const { t } = useTranslation();
    const [isOpenTaskForm, setIsOpenTaskForm] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        const matchingTodos = todos.filter(todo => todo.date.slice(0, 10) === date);
        setFilteredTodos(matchingTodos);
    }, [todos, date]);

    const handleAddTask = (newTask) => {
        setFilteredTodos([...filteredTodos, newTask]);
    };

    const openAddTaskForm = () => {
        setIsOpenTaskForm(true);
    };

    const closeAddTaskForm = () => {
        setIsOpenTaskForm(false);
    };

    return (
        <div className='absolute z-10 w-full h-full bg-white py-16 px-8'>

            <button
                className='absolute top-10 right-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300'
                onClick={onClose}
            >
                {t('close_tasklist')}
            </button>
    <div className='absolute top-0 left-10 py-10 px-8'>{date}</div>
            <ul className='flex gap-2 flex-col mt-10'>
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={{ ...todo, number: index + 1 }}
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
                        date={date}
                        onClose={closeAddTaskForm}
                        onAddTask={handleAddTask}
                    />
                )}
            </ul>
            <Toaster />
        </div>
    );
};

export default TodoList;
