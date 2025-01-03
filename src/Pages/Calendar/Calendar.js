import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TodoList from '../../components/TodoList/TodoList';
import { getTodos, selectTodos } from '../../redux/slice/todosSlice';

const Calendar = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const todos = useSelector(selectTodos);
    const [todosListVisible, setTodosListVisible] = useState(false);
    // const [selectedDayTodos, setSelectedDayTodos] = useState([]);
    const data = new Date();
    const month = data.getMonth();
    const year = data.getFullYear();
    const today = data.getDate();

    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    const formatDate = (day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    // TODO formated date ???
    // const convertDateFormat = (dateString) => {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${day}.${month}.${year}`;
    // };

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const isTaskScheduledForDay = (day) => {
        const formattedDate = formatDate(day);
        return todos.some(todo => todo.date.slice(0, 10) === formattedDate);
    };

    const handleDayClick = (day) => {
        const formattedDate = formatDate(day);
        // TODO TASKLIST PER DAY
        // const tasksForSelectedDay = todos.filter(todo => todo.date.slice(0, 10) === formattedDate);
        // setSelectedDayTodos(tasksForSelectedDay);
        setTodosListVisible(true);
    };

    const handleCloseTodoList = () => {
        setTodosListVisible(false);
    };

    for (let i = 0; i < startingDay; i++) {
        days.push(<td key={`empty-${i}`} className="border h-16 text-center"></td>);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const isToday = day === today;
        const dayOfWeek = new Date(year, month, day).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 ? 'bg-red-200' : '';
        const hasTask = isTaskScheduledForDay(day) ? 'relative' : '';

        days.push(
            <td
                key={day}
                className={`border h-16 text-center transition duration-300 ${isToday ? 'bg-red-400 text-white' : ''} ${isWeekend} ${hasTask}`}
            >
                <button
                    className={`w-full h-full ${isToday ? 'text-white' : 'text-gray-500'} p-0 bg-transparent rounded-none border-none hover:bg-red-300 hover:text-white transition duration-300`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                    {isTaskScheduledForDay(day) && (
                        <span
                            className="absolute w-2.5 h-2.5 rounded-full bg-red-600 top-3 right-1 transform -translate-x-1/2 -translate-y-1/2"></span>
                    )}
                </button>
            </td>
        );
    }

    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        rows.push(
            <tr key={i}>
                {days.slice(i, i + 7)}
            </tr>
        );
    }

    const monthName = data.toLocaleString(i18n.language, { month: 'long' });
    const weekDays = [
        t('calendar.days.Mon'),
        t('calendar.days.Tue'),
        t('calendar.days.Wed'),
        t('calendar.days.Thu'),
        t('calendar.days.Fri'),
        t('calendar.days.Sat'),
        t('calendar.days.Sun'),
    ];

    return (
        <div className="min-h-screen flex items-center justify-center px-3">
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl text-center mb-4">
                    {monthName} {year}
                </h2>
                <table className="w-full table-fixed border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        {weekDays.map((day, index) => (
                            <th key={index} className="w-1/7 p-2 text-center text-sm md:text-base">
                                {day}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>

            {todosListVisible && (
                <TodoList onClose={handleCloseTodoList} />

                // TODO SELECTED TASK DAY ???
                // <TodoList todos={selectedDayTodos} onClose={handleCloseTodoList} />

            )}
        </div>
    );
};

export default Calendar;
