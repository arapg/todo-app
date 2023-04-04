import { useState } from "react";

function TodoItem ( { todo, getData } ) {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(todo.title);

    function editData() {
        setIsEdit(false);

        const todoItem = {
            id: todo.id,
            title: title
        }

        fetch(`http://localhost:5050/todos/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoItem)
        }).then((response) => {
            if(response.ok) {
                getData();
            }
        })
    }

    function deleteData() {

        fetch(`http://localhost:5050/todos/delete/${todo.id}`, {
        method: 'DELETE'
      }).then((response => {
        if(response.ok) {
          getData();
        }
      }))
    }

    function toggleComplete() {
        if(!todo.completed) {
            fetch(`http://localhost:5050/todos/complete/${todo.id}`, {
                method: 'PATCH',
            }).then((response) => {
                if(response.ok) {
                    getData();
                }
            })
        } else {
            fetch(`http://localhost:5050/todos/uncomplete/${todo.id}`, {
                method: 'PATCH'
            }).then((response) => {
                if(response.ok) {
                    getData();
                }
            })
        }
    }

    return (
        <div className="list-item">
            {!isEdit && <>
                <input 
                    onChange={toggleComplete}
                    type="checkbox"
                    checked={todo.completed ? 'checked' : ''}
                />
                <p
                    onClick={toggleComplete}
                    className={todo.completed ? 'task-complete' : 'task'}
                >{todo.title}</p>
            </>}
            {isEdit && <input type="text" placeholder={title} value={title} onChange={(e) => setTitle(e.target.value)}/>}

            <div className="button-container">
            {!isEdit && <button onClick={() => setIsEdit(true)}>Edit</button>}
            {isEdit && <button onClick={editData}>Save</button>}
          
            <button className="delete" onClick={deleteData}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem;