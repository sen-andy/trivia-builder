;import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';


const ProfileScreen = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPW, setConfirmPW ] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [ updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPW) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateUser({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile Updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className='container mx-auto flex justify-center items-center'>
            <div className='light-border-bg col gap-4 w-full max-w-lg'>
                <h1>Update Profile</h1>

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
                    <button className='primary-btn bg-highlight' type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileScreen;