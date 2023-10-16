;import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


const RegisterScreen = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPW, setConfirmPW ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [ register, { isLoading, error }] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [ userInfo, navigate ]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPW) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className='container mx-auto flex justify-center items-center'>
            <div className='light-border-bg col gap-4 w-full max-w-lg'>
                <h1>Sign Up</h1>

                <form className='col gap-4 [&>div]:gap-2' onSubmit={submitHandler}>
                    <div className='col'>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            className='input'
                            type='text'
                            placeholder='Enter Full Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                    <div className='col'>
                        <label htmlFor='confirmPW'>Confirm Password</label>
                        <input
                            className='input'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPW}
                            onChange={e => setConfirmPW(e.target.value)}
                        />
                    </div>
                    { isLoading && <Loader /> }
                    <button className='btn-blue' type='submit'>Sign Up</button>
                    <div className='flex'>
                        <p>Have an account?</p>
                        <Link to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen;