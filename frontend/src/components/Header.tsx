import { FC, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuthStore } from "~/store/zustandStore";
import { FaUserCircle } from "react-icons/fa";

const Header: FC = () => {
  const navigate = useNavigate();
  const { authToken, email } = useAuthStore();

  const onAuthLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/auth');
  }

  const signOut = async() => {
    // Implement signOut
  }

  useEffect(() => {
    // Just redirect if not logged in rather than employ middleware to avoid installing Redux and redux-thunk (less bundle size)
    if (!authToken) {
      navigate('/auth');
    }
  }, []);

  return (
    <header className='sticky top-0 z-40 bg-white shadow-lg py-3 px-4 md:px-10 xl:px-[15rem] 2xl:px-[22rem] text-gray-600'>
      <div className="row">
        <div
          onClick={() => navigate('/auth')}
          className="row"
        >
          <div className='relative row-v h-10 w-10 pointer'>
            <img
              src='src/assets/images/logo.webp'
              className='object-contain object-left'
              alt='logo'
              sizes='100vw'
            />
          </div>
          <Link to="/">
            <h1 className="text-xl md:text-2xl bold -mt-1.5 ml-2.5 pt-0.5">
              Calendar<span className="t-primary hidden md:contents">App</span>
            </h1>
          </Link>
        </div>
        <div className='row-v space-x-4 text-gray-600 semibold ml-4 mr-2 md:ml-10 lg:ml-10 sm:ml-0'>
          {authToken
            ? <div className='inline-flex'>
              <FaUserCircle className='w-4 ml-5 mr-2 hidden md:block' />
              <div className='t-red md:pr-1 max-w-[9rem] text-ellipsis overflow-hidden hidden md:block'>{ email }</div>
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
