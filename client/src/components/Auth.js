import { useState } from 'react';

function Auth() {
    const [error, setError] = useState('Hello');
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    function toggleLogin(state) {
        setError(null);
        setLogin(state);
    };

    function handleSubmit (e, state) {
        e.preventDefault();
        const user = {username, password};
        const regUser = {username, password, confirmedPassword};
        

        if(state === true) {
             fetch('http://localhost:5050/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(user),
                credentials: 'include'
            }).then((response) => {
                if(!response.ok) {
                   setError('Invalid username or password') 
                }
            })
        } else {
            if(password === confirmedPassword) {
                fetch('http://localhost:5050/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(regUser)
                }).then((response) => {
                    if(!response.ok) {
                        setError('User already exists')
                    }
                })
            } else {
                setError(`Passwords don't match`);
            }
        }
    }

    return (
      <div className="auth">
        <h2>{login ? 'Log in' : 'Sign up'}</h2>
        <form>
            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            {!login && <>
                <input
                    type="password"
                    value={confirmedPassword}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    required
                /><br /><br />
            </>}
            <button onClick={(e) => handleSubmit(e, login)} className='submit'>{login ? 'Log in' : 'Sign Up'}</button>
        </form>

        {error && <p className='error'>{error}</p>}
        
        <div className="login-toggle">
            <button
                onClick={() => toggleLogin(false)}
                style={{backgroundColor : !login ? '#f3f3f3' : '#fff'}}
                className="register"
            >Sign Up</button>
            <button
                onClick={() => toggleLogin(true)}
                style={{backgroundColor : login ? '#f3f3f3' : '#fff'}}
                className="login"
            >Log In</button>
        </div>
        

      </div>
    );
  }
  
  export default Auth;