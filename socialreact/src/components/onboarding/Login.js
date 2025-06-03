import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../service/authService';
import './login.css'
import { Spinner } from '../../icons';


export const Login = () => {

    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const userRef = useRef();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userRef.current)
            userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [userName, password])

    const onInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUserName(value)
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username: userName, password }).unwrap();
            navigate('/')
        } catch (err) {
            console.log('login error', err);
            const data = err?.data;
            setErrorMessage(data?.message || err.error);
        }
    }

    const content = isLoading ? <h1>Loading...</h1> :
        <div className='flex justify-center'>
            <section className='container'>
                <div className="p-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='sm:mx-auto sm:w-full sm:mx-w-sm'>
                        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-grey-900'>Login</h1>
                    </div>
                    <div className='mt-10 sm:w-full'>

                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='username' className='block text-sm font-medium leading-6 text-grey-900'>Username</label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        ref={userRef}
                                        value={userName}
                                        onChange={onInputChange}
                                        autoComplete='off'
                                        required
                                    />
                                </div>
                            </div>
                            <div >
                                <div className="flex items-center justify-between">
                                    <label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    {/* <div className="text-sm">
                                        <a href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div> */}
                                </div>
                                <div className='mt-2'>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={password}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <p className={errorMessage ? "errorMessage" : 'offScreen'}>{errorMessage}</p>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>Sign in {isLoading && <Spinner tintColor={"#fff"} />}</button>
                            </div>

                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member? <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    return content;

}

export default Login;