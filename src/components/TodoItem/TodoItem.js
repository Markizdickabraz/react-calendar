import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteTodo } from "../../redux/slice/todosSlice";

const TodoItem = ({ todo, onToggleStatus }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    const itemClass = todo.status === 'complete' ? 'complete' : '';

    return (
        <li
            id={todo.id}
            className={`relative flex items-center border-b pb-2 w-full cursor-pointer transition-all duration-300 ${itemClass}`}
            onClick={() => onToggleStatus(todo.id)}
        >
            {/* Номер завдання */}
            <p className='p-0 m-0 w-10 text-left pr-4'>{todo.number}</p>

            <div className='flex flex-col px-2 flex-grow'>
                <h4 className='text-left'>{todo.title}</h4>
                <p className='p-0 m-0 text-left'>{todo.text}</p>
            </div>

            <button
                className='ml-auto px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                type='button'
                onClick={handleDelete}
            >
                {t('delete_task')}
            </button>
        </li>
    );
};

export default TodoItem;
