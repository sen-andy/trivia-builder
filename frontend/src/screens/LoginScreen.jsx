import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ login, { isLoading, error }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div className='container mx-auto flex justify-center items-center'>
            <div className='light-border-bg col gap-4 w-full max-w-lg'>
                <h1>Sign In</h1>

                <form className='col gap-4 [&>div]:gap-2' onSubmit={submitHandler}>
                    <div className='col'>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            className='input'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='input'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    { isLoading && <Loader /> }
                    <button className='primary-btn bg-highlight' type='submit'>Sign In</button>
                    <div className='flex'>
                        <p>New Customer?</p>
                        <Link to='/register'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;