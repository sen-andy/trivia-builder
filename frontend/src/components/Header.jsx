import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, Bars3Icon, PencilSquareIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [ logoutApiCall ] = useLogoutMutation()
  
  const logoutHandler = async (e) => {
    try {
      const res = await logoutApiCall().unwrap();
      toast.info(res.message);
      dispatch(logout());
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <header>
        <nav className='bg-highlight h-14 shadow-2xl mb-8'>
          <div className='container mx-auto h-full transition-all'>
            <div className='flex justify-between mx-4 items-center h-full'>
              <Link className='text-2xl font-[600] no-underline text-light' to='/'>Trivia Builder</Link>
              { userInfo ? (
                <>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <Menu.Button className='inline-flex w-full items-center justify-center gap-x-1.5 px-3 py-2 font-semibold text-light'>
                      {userInfo.name}
                      <ChevronDownIcon className='-mr-1 h-6 w-6 text-white' aria-hidden='true' />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none'>
                      <div className='py-1 text-right'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/profile'
                              className={classNames(
                                active ? 'bg-slate-200 text-slate-950' : 'text-dark',
                                'block px-4 py-2'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={e => logoutHandler(e)}
                              className={classNames(
                                active ? 'bg-slate-200 text-slate-950' : 'text-dark',
                                'block px-4 py-2'
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                </>
              ) : (
                <>
                <Menu as='div' className='relative inline-block text-left md:hidden'>
                  <div>
                    <Menu.Button className='bg-none text-light rounded-sm h-7 w-7'>
                      <Bars3Icon className='mx-auto h-6 w-6 text-white' aria-hidden='true' />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 min-w-max z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none'>
                      <div className='py-1 text-right'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link className={classNames(
                              active ? 'bg-slate-200 text-slate-950' : 'text-dark',
                              'block px-4 py-2',
                              'flex',
                              'items-center',
                              'gap-2',
                              'no-underline'
                            )} to='/login'>
                              <ArrowRightOnRectangleIcon className='h-5 w-5' />
                              Sign In
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link className={classNames(
                              active ? 'bg-slate-200 text-slate-950' : 'text-dark',
                              'block px-4 py-2',
                              'flex',
                              'items-center',
                              'gap-2',
                              'no-underline',
                            )} to='/login'>
                              <PencilSquareIcon className='h-5 w-5' />
                              Sign Up
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div
                  className='
                    flex absolute collapse bg-highlight flex-col top-12 right-0 gap-2 p-3 drop-shadow
                    md:visible md:flex-row md:gap-4 md:static md:drop-shadow-none md:p-0'
                  >
                  <Link className='flex text-xl items-center gap-2 no-underline text-light' to='/login'>
                    <ArrowRightOnRectangleIcon className='h-5 w-5' />
                    Sign In
                  </Link>
                  <Link className='flex text-xl items-center gap-2 no-underline text-light' to='/register'>
                    <PencilSquareIcon className='h-5 w-5' />
                    Sign Up
                  </Link>
                </div>
                </>
              )}
            </div>
          </div>
        </nav>
    </header>
  )
}

export default Header;