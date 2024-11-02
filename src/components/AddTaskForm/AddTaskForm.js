import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addTodo} from '../../redux/slice/todosSlice';

const AddTaskForm = ({ onClose }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '' || text.trim() === '') {
            alert(t('fill_all_fields'));
            return;
        }

        const newTask = {
            title,
            text,
            date: new Date().toISOString().split('T')[0],
        };

        dispatch(addTodo(newTask))
            .unwrap()
            .then(() => {
                alert(t('task_added_successfully'));
                setTitle('');
                setText('');
                onClose();
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-8 rounded shadow-md relative'>
                <button
                    type='button'
                    className='p-0 m-0 absolute rounded-3xl w-8 h-8 top-2 right-2 flex justify-center items-center'
                    onClick={onClose}
                >
                    x
                </button>
                <h2 className='text-center mb-4'>{t('add_new_task')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label>
                            <input
                                type='text'
                                className='w-full px-4 py-2 border rounded'
                                placeholder={t('task_title')}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label>
                            <input
                                type='text'
                                className='w-full px-4 py-2 border rounded'
                                placeholder={t('task_text')}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='flex justify-between'>
                        <button
                            type='submit'
                            className={`px-4 py-2 text-white rounded hover:bg-red-600`}
                        >
                            {t('add_task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskForm;
