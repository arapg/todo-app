import { useState } from 'react';
import { Link } from 'react-router-dom';

function TodoList({ list, getData }) {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(list.title);

    function editData() {
      setIsEdit(false);

      const listItem = {
        id: list.id,
        title: title
      }

      fetch(`http://localhost:5050/list/edit/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(listItem)
      }).then((response) => {
        if(response.ok) {
          getData();
        }
      })
    }

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
        <Link to={`/todos/${list.id}`}>
          {!isEdit && <p className='task'>{list.title}</p>}
        </Link>
        
        {isEdit &&
          <input
            className='list-input'
            type="text"
            placeholder={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>
        }

        
        <div className="button-container">
          {!isEdit && <button onClick={() => setIsEdit(true)}>Edit</button>}
          {isEdit && <button onClick={editData}>Save</button>}
          
          
          <button onClick={deleteData}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default TodoList;