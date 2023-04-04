import { Link } from 'react-router-dom';

function Friend({ friend, getData }) {
 
    function deleteData() {
      
      fetch(`http://localhost:5050/friends/delete/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ friend }),
        credentials: 'include'
      }).then((response => {
        if(response.ok) {
          getData();
        }
      }))
    }

    return (
      <div className="list-item">
        <Link to={`/friends/${friend.friend}`}>
          <p>{friend.friend}</p>
        </Link>
        
        <div className="button-container">
          <button className="delete" onClick={deleteData}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default Friend;