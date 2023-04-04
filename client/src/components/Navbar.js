import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Navbar() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    function logOut() {
        removeCookie('authToken', { path: '/' });
        removeCookie('username', { path: '/' });
        
        navigate('/');
    }
    

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/friends">friends</Link>
                </li>

                <li>
                    <button onClick={logOut}>log out</button>
                </li>
                
            </ul>
        </nav>
    )
}

export default Navbar;