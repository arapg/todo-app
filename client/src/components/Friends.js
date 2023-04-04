import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Friend from "./Friend";
import SearchUser from "./SearchUser";

function Friends() {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const username = cookie.username;
    const authToken = cookie.authToken;
    const [friends, setFriends] = useState(null);

    async function getData () {
        try {
        const response = await fetch(`http://localhost:5050/friends/${username}`);
        const json = await response.json();

        setFriends(json);
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
        {!authToken && <h2>You are not authorised. Log in to see your friends!</h2>}

        {authToken && 
            <>
                <SearchUser getData={getData} />
                <h3>Friends:</h3>
                <div className="lists">
                {!friends 
                ? <p>Loading...</p>
                : ( friends.length === 0
                    ? <p>You don't have any friends yet, add some to view their todo lists!</p>
                    : friends?.map((friend) => <Friend key={friend.id} getData={getData} friend={friend}/>)
                    )
                }
                </div>
            </>
            
        }
        
        
      </>
    );
  };
  
  export default Friends;