import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import TodoItem from './TodoItem';

function TodoPage( { list }) {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const username = cookie.username;
    const authToken = cookie.authToken;

    const params = useParams();

    const [todos, setTodos] = useState(null);

    async function getData () {
        try {
        const response = await fetch(`http://localhost:5050/todos/${params.id}`, {
          credentials: 'include'
        });
        const json = await response.json();

        setTodos(json);
        } catch (error){
        console.log(error);
        }
    }

    useEffect(() => {
        if(authToken) {
        getData()
        }
    }, [])
  

    return (
      <>
        <CreateTodo getData={getData} listID={params.id} />
        <div className="lists">
          {!todos 
          ? <p>Loading...</p>
          : ( todos.length === 0
              ? <p>Add a task to get started!</p>
              : todos?.map((todo) => <TodoItem key={todo.id} getData={getData} todo={todo}/>)
            )
          }
        </div>
      </>
    );
  };
  
  export default TodoPage;