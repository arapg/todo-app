import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Home from './components/Home';
import Navbar from './components/Navbar';
import TodoPage from './components/TodoPage';
import Friends from './components/Friends';
import FriendPage from './components/FriendPage';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const authToken = cookie.authToken;

  return (
    <>
      {authToken && <Navbar />}
      
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/todos/:id' element={<TodoPage />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/friends/:friend' element={<FriendPage />}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
