import { useState } from "react";
import './Auth.css';

const Auth = () => {

    const [signIn, setSignIn] = useState(false);

    const handleSignUpClick = () => {
        setSignIn(true);
    };

    const handleSignInClick = () => {
        setSignIn(false);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className={`container ${signIn ? 'right-panel-active' : ''}`} id="container">
                <div className="absolute h-full transition-[all 0.6s ease-in-out] top-0 sign-up-container">
                    <form className='bg-white flex items-center justify-center flex-col px-12 h-full text-center' action="#">
                        <h2 className='font-bold m-0'>Create Account</h2>
                        <span className='font-xs'>or use your email for registration</span>
                        <input className='bg-gray-200 border-none py-3 px-4 my-2 w-full' type="text" placeholder="Name" />
                        <input className='bg-gray-200 border-none py-3 px-4 my-2 w-full' type="email" placeholder="Email" />
                        <input className='bg-gray-200 border-none py-3 px-4 my-2 w-full' type="password" placeholder="Password" />
                        <button className='rounded-[20px] border-auth__btn bg-auth__btn text-white text-xs border font-bold py-3 px-11 uppercase transition-[transform 80ms ease-in]'>Sign Up</button>
                    </form>
                </div>
                <div className="absolute h-full transition-[all 0.6s ease-in-out] top-0 sign-in-container">
                    <form className='bg-white flex items-center justify-center flex-col px-12 h-full text-center' action="#">
                        <h2 className='font-bold m-0'>Sign in</h2>
                        <span className='text-xs'>or use your account</span>
                        <input className='bg-gray-200 border-none py-3 px-4 my-2 w-full' type="email" placeholder="Email" />
                        <input className='bg-gray-200 border-none py-3 px-4 my-2 w-full' type="password" placeholder="Password" />
                        <a className='text-sm mt-4 mb-4 text-black no-underline' href="#">Forgot your password?</a>
                        <button className='rounded-[20px] border-auth__btn bg-auth__btn text-white text-xs border font-bold py-3 px-11 uppercase transition-[transform 80ms ease-in]'>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2 className='font-bold m-0'>Welcome Back!</h2>
                            <p className='font-thin test-sm mt-5 mb-7'>To keep connected with us please login with your personal info</p>
                            <button
                                className='rounded-[20px] text-white text-xs font-bold py-3 px-11 border bg-transparent border-white uppercase transition-[transform 80ms ease-in]'
                                onClick={handleSignInClick}
                                id="signIn">
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2 className='font-bold m-0'>Hello, Friend!</h2>
                            <p className='font-thin test-sm mt-5 mb-7'>Enter your personal details and start your journey with us</p>
                            <button
                                className='rounded-[20px] text-white text-xs font-bold py-3 px-11 border bg-transparent border-white uppercase transition-[transform 80ms ease-in]'
                                onClick={handleSignUpClick}
                                id="signUp">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
