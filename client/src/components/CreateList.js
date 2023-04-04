import { useState } from 'react';

function CreateList( { getData }) {
    const [title, setTitle] = useState('');

    function handleSubmit (e) {
      e.preventDefault()

      const list = {
        title: title
      }

      fetch('http://localhost:5050/list/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(list),
        credentials: 'include'
      }).then((response) => {
        if(response.ok) {
          getData();
        }
      })
      
      setTitle('');
    }

    return (
      <div className='create-new'>
        <h2>Create new list</h2>
        <form>
            <input
              type="text"
              placeholder="New list..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >Create</button>
        </form>
      </div>
    );
  };
  
  export default CreateList;