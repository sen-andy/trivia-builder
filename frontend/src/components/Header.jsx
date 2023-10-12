import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';
import './header.css';

const Header = () => {
  return (
    <header>
        <nav>
            <div id='nav-wrap' className='row center wrap'>
                <Link to='/'>Trivia Builder</Link>
                <button><FaBars /></button>
                <div id='nav-menu'>
                    <Link className='row center' to='/login'><FaSignInAlt />Sign In</Link>
                    <Link className='row center' to='/register'><FaSignOutAlt/>Sign Up</Link>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header;