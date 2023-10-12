import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ login, { isLoading, error }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div className='col center'>
            <div id='login-form' className='light-border-bg col gap-1'>
                <h1>Sign In</h1>

                <form className='col gap-1' onSubmit={submitHandler}>
                    <div className='col'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Sign In</button>
                    <div className='row'>
                        <p>New Customer? </p>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;