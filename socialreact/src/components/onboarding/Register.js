import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../service/authService';
import { setCredentials } from '../../slices/auth';
import './login.css'
import { Spinner } from '../../icons';

export const Register = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup, { isLoading }] = useSignupMutation();
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, email])

    const onInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value)
                break;
            case 'password':
                setPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await signup({ username, password, email }).unwrap();
            dispatch(setCredentials(userData))
            // navigate('/')
        } catch (err) {
            console.log(err);
            const message = err?.data?.message;
            setErrorMessage(message);
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    const content =
        <div className='flex justify-center'>
            <section className='container'>
                <div className="w-full max-w-sm bg-white p-5 border border-grey-200 rounded-lg shadow dark:bg-grey-800 dark:bg-grey-700">
                    <div className='sm:mx-auto sm:w-full sm:mx-w-sm'>
                        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-grey-900'>Sign Up</h1>
                    </div>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>

                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='username' className='block text-sm font-medium leading-6 text-grey-900'>Username</label>
                                <div className='mt-2'>
                                    <input
                                        className=''
                                        type='text'
                                        id='username'
                                        name='username'
                                        ref={userRef}
                                        value={username}
                                        onChange={onInputChange}
                                        autoComplete='off'
                                        required='>User name is required'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='userEmail' className='block text-sm font-medium leading-6 text-gret-900'>Email</label>
                                <div className="mt-2">
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={email}
                                        onChange={onInputChange}
                                        required />
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
                                <p ref={errRef} className={"errorMessage"}>{errorMessage}</p>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>Sign in   {isLoading && <Spinner tintColor={"#fff"} />}</button>

                            </div>

                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already hav an account? <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    return content;

}

export default Register;