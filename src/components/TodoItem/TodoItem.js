import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {deleteTodo, changeTodoStatus} from "../../redux/slice/todosSlice";

const TodoItem = ({todo}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(todo.status);

    useEffect(() => {
        setStatus(todo.status);
    }, [todo.status]);

    const onToggleStatus = () => {
        const newStatus = status === 'pending' ? 'completed' : 'pending';
        setStatus(newStatus);
        dispatch(changeTodoStatus({taskId: todo.id, status: newStatus}));
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deleteTodo(todo.id));
    };

    const itemClass =
        status === 'completed'
            ? 'relative before:content-[""] before:w-full before:absolute before:top-1/2 before:h-0.5 before:bg-black'
            : '';

    return (
        <li
            id={todo.id}
            className={`relative flex items-center border-b pb-2 w-full cursor-pointer transition-all duration-300 ${itemClass}`}
            onClick={onToggleStatus}
        >
            <p className='p-0 m-0 w-10 text-left pr-4'>{todo.number}</p>

            <div className='flex flex-col px-2 flex-grow'>
                <h4 className='text-left'>{todo.title}</h4>
                <p className='p-0 m-0 text-left'>{todo.text}</p>
            </div>

            {/* Delete button */}
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
