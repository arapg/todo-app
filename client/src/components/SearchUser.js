import { useState } from 'react';
import { useCookies } from 'react-cookie';

function SearchUser( { getData }) {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const [user, setUser] = useState('');
    const [error, setError] = useState(null);

    const username = cookie.username;

    function addFriend (e) {
        e.preventDefault();

        fetch(`http://localhost:5050/friends/add/${username}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({friend: user})
        }).then((response) => {
            if (response.status === 409) {
                setError('You are already friends with this user')
            } else if (response.status === 404) {
                setError('User could not be found')
            } else {
                getData();
                setError(null);
            }
        });
    

      
    }

    return (
      <div className='create-new'>
        <h2>Search for user</h2>
        <form>
            <input
              type="text"
              placeholder=" Username..."
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => addFriend(e)}
            >Add</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  export default SearchUser;