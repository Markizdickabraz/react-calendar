import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TodoList from '../../components/TodoList/TodoList';
import {getTodos, selectTodos} from '../../redux/slice/todosSlice';
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Toaster } from "react-hot-toast";

const Calendar = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const {todos, initLoaded} = useSelector(selectTodos, shallowEqual);
    const [todosListVisible, setTodosListVisible] = useState(false);
    const [todosListDate, setTodosListDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
        if (!initLoaded) {
            dispatch(getTodos());
        }
    const formatDate = (day) => {
        return `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const isTaskScheduledForDay = (day) => {
        const formattedDate = formatDate(day);
        return todos.some(todo => todo.date.slice(0, 10) === formattedDate);
    };

    const handleDayClick = (day) => {
        const formattedDate = formatDate(day);
        setTodosListVisible(true);
        setTodosListDate(formattedDate);
    };

    const handleCloseTodoList = () => {
        setTodosListVisible(false);
    };

    const totalDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const days = [];

    for (let i = 0; i < startingDay; i++) {
        days.push(<td key={`empty-${i}`} className="border h-16 text-center"></td>);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const isToday =
            day === new Date().getDate() &&
            selectedMonth === new Date().getMonth() &&
            selectedYear === new Date().getFullYear();

        const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay();
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

    const monthOptions = Array.from({ length: 12 }, (_, index) => {
        const monthName = new Date(0, index).toLocaleString(i18n.language, { month: 'long' });
        return {
            value: index,
            label: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        };
    });

    const yearOptions = Array.from({ length: 21 }, (_, index) => selectedYear - 10 + index);

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
            <LogoutButton />
            <div className="w-full max-w-4xl">
                <div className="flex justify-center items-center mb-4">
                    <select
                        className="border p-2 rounded bg-transparent"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {monthOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <select
                        className="border p-2 rounded bg-transparent"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
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
                <TodoList date={todosListDate} onClose={handleCloseTodoList} />
            )}

            <Toaster />
        </div>
    );
};

export default Calendar;
