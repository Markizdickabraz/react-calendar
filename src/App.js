import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './i18n';
import { useTranslation } from 'react-i18next';
import Auth from './Pages/Auth/Auth';
import Calendar from "./Pages/Calendar/Calendar";
import NotFound from "./Pages/NotFound/NotFound";


const App = () => {
    const { i18n } = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const [language, setLanguage] = useState('en');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <div>
            <div className='absolute top-5 left-5 flex gap-2'>
                <button onClick={() => changeLanguage('en')}>En</button>
                <button onClick={() => changeLanguage('uk')}>Укр</button>
            </div>

            <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
