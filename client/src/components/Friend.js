import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Friend({ friend, getData }) {
  const [cookie, setCookie, removeCookie] = useCookies();
    const username = cookie.username;

    const foundFriend = friend.user1 !== username ? friend.user1 : friend.user2;


    function deleteData() {
      
      fetch(`http://localhost:5050/friends/delete/${username}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({friend: foundFriend})
      }).then((response => {
        if(response.ok) {
          getData();
        }
      }))
    }

    return (
      <div className="list-item">
        <Link to={`/friends/${foundFriend}`}>
          <p>{foundFriend}</p>
        </Link>
        
        <div className="button-container">
          <button className="delete" onClick={deleteData}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default Friend;