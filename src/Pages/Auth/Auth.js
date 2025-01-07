import './Auth.css';
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import useSignUp from '../../hooks/useSignUp/useSignUp';
import useSignIn from '../../hooks/useSignIn/useSignIn';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import {Toaster} from "react-hot-toast";

const Auth = () => {
    const [signIn, setSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const { t } = useTranslation();
    const { formData: signUpFormData, handleChange: handleSignUpChange, handleSignUpSubmit } = useSignUp();
    const { formData: signInFormData, handleChange: handleSignInChange, handleSignInSubmit } = useSignIn();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSignUpClick = () => {
        setSignIn(true);
    };

    const handleSignInClick = () => {
        setSignIn(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className={`container ${signIn ? 'right-panel-active' : ''}`} id="container">
                {isMobileView && (
                    <button
                        onClick={signIn ? handleSignInClick : handleSignUpClick}
                        className="toggle-auth-btn">
                        {signIn ? t('sign_in') : t('sign_up')}
                    </button>
                )}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h2>{t('create_account')}</h2>
                        <span>{t('or_use_email')}</span>
                        <input
                            type="text"
                            name="firstName"
                            placeholder={t('first_name')}
                            value={signUpFormData.firstName}
                            onChange={handleSignUpChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder={t('last_name')}
                            value={signUpFormData.lastName}
                            onChange={handleSignUpChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t('email')}
                            value={signUpFormData.email}
                            onChange={handleSignUpChange}
                        />
                        <div className="w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder={t('password')}
                                value={signUpFormData.password}
                                onChange={handleSignUpChange}
                            />
                            <button className='bg-transparent absolute border-none left-[84%] top-4 p-3 ' type="button"
                                    onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEyeSlash className='text-black' />
                                    : <FaRegEye className='text-black' />}
                            </button>
                        </div>
                        <button type="submit">{t('sign_up')}</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignInSubmit}>
                        <h2>{t('sign_in')}</h2>
                        <span>{t('or_use_email')}</span>
                        <input
                            type="email"
                            name="email"
                            placeholder={t('email')}
                            value={signInFormData.email}
                            onChange={handleSignInChange}
                        />
                        <div className="w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder={t('password')}
                                value={signInFormData.password}
                                onChange={handleSignInChange}
                            />
                            <button className='bg-transparent absolute border-none left-[84%] top-4 p-3 ' type="button"
                                    onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEyeSlash className='text-black' />
                                    : <FaRegEye className='text-black' />}
                            </button>
                        </div>
                        <a href="/">{t('forgot_password')}</a>
                        <button type="submit">{t('sign_in')}</button>
                    </form>
                </div>
                {!isMobileView && (
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h2>{t('welcome')}</h2>
                                <p>{t('login_info')}</p>
                                <button
                                    onClick={handleSignInClick}
                                    className="ghost"
                                    id="signIn">
                                    {t('sign_in')}
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h2>{t('hello_friend')}</h2>
                                <p>{t('enter_details')}</p>
                                <button
                                    onClick={handleSignUpClick}
                                    className="ghost"
                                    id="signUp">
                                    {t('sign_up')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    );
}

export default Auth;
