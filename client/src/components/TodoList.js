import { Link } from 'react-router-dom';

function TodoList({ list, getData }) {

    function deleteData() {
      
      fetch(`http://localhost:5050/list/delete/${list.id}`, {
        method: 'DELETE'
      }).then((response => {
        if(response.ok) {
          getData();
        }
      }))
    }

    return (
      <div className="list-item">
        <Link to=""><p>{list.title}</p></Link>
        
        <div className="button-container">
          <button className="delete" onClick={deleteData}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default TodoList;