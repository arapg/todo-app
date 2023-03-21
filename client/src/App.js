import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import CreateList from './components/CreateList';
import TodoList from './components/TodoList';

function App() {
  const authToken = true;

  const [lists, setLists] = useState(null);

  async function getData () {
    try {
      const response = await fetch('http://localhost:5050/list');
      const json = await response.json();

      setLists(json);
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => getData, [])

  return (
    <>
      <div className='main'>
        {!authToken && <Auth />}
        {authToken && 
          <>
            <CreateList getData={getData}/>
            <div className="lists">
              {lists?.map((list) => <TodoList key={list.id} getData={getData} list={list}/>)}
            </div>
          </>
        }


      </div>
    </>
  );
};

export default App;
