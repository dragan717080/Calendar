import { FC, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthStore } from '~/store/zustandStore';
import { FaUserCircle } from 'react-icons/fa';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const Header: FC = () => {
  const navigate = useNavigate();
  const { authToken, setAuthToken, username, setUsername } = useAuthStore();

  const onAuthLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/auth');
  }

  const signOut = () => {
    // To do: implement react-query mutation and optimistic
    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/sign-out`,
      { username }
      )
      .then((response: AxiosResponse) => {
        setUsername(null);
        setAuthToken(null);
        navigate('/auth');
      })
      .catch((error: AxiosError) => toast.error("Couldn't sign you out", { id: 'err-sign-out' }))
  }

  useEffect(() => {
    // Just redirect if not logged in rather than employ middleware to avoid installing Redux and redux-thunk (less bundle size)
    if (!authToken) {
      navigate('/auth');
    }
  }, []);

  return (
    <header className='sticky top-0 z-40 bg-white shadow-lg py-3 mx-auto justify-between px-[10%] 2xl:px-[12%] 2xl:pr-10 w-full text-gray-600'>
      <div className='row-v justify-between'>
        <div
          onClick={() => navigate('/')}
          className='row'
        >
          <div className='relative row-v h-16 w-16 pointer'>
            <img
              src='src/assets/images/logo.webp'
              className='object-contain object-left'
              alt='logo'
              sizes='100vw'
            />
          </div>
          <Link to='/'>
            <h1 className='text-xl rage tracking-wide md:text-3xl lg:text-5xl bold mt-1 ml-2.5 pt-0.5'>
              Calendar<span className='t-primary hidden md:contents'>App</span>
            </h1>
          </Link>
        </div>
        <div className='row-v space-x-4 text-gray-600 semibold ml-4 mr-2 md:ml-10 lg:ml-10 sm:mr-12'>
          {authToken
            ? <div className='inline-flex'>
              <FaUserCircle
                size={26}
                className='ml-5 mr-2 hidden md:block'
              />
              <div className='t-red mt-0.5 md:pr-1 max-w-[9rem] text-ellipsis overflow-hidden hidden md:block'>{ username }</div>
              <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
            </div>
            : <div className='md:pl-3 lg:pl-6 2xl:pr-4 hover:text-primary pr-2 md:pr-16'>
              <Link to='/auth' onClick={(e) => onAuthLinkClick(e)}>
                Login
              </Link>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default Header;
