import { useState } from 'react';

function CreateTodo( { getData, listID }) {
    const [title, setTitle] = useState('');

    function handleSubmit (e) {
      e.preventDefault()

      const todo = {
        id: listID,
        title: title
      }

      fetch('http://localhost:5050/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(todo)
      }).then((response) => {
        if(response.ok) {
          getData();
        }
      })
      
      setTitle('');
    }

    return (
      <div className='create-new'>
        <h2>Add new task</h2>
        <form>
            <input
              type="text"
              placeholder="New todo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >Add</button>
        </form>
      </div>
    );
  };
  
  export default CreateTodo;