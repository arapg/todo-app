import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Friend from "./Friend";
import SearchUser from "./SearchUser";

function Friends() {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const authToken = cookie.authToken;
    const [friends, setFriends] = useState(null);

    async function getData () {
        try {
        const response = await fetch(`http://localhost:5050/friends/`, {
            credentials: 'include'
        });
        const json = await response.json();

        const users = [];

        json.forEach(obj => {
            if (obj.user1 !== 'arpg') {
                const friend = {
                    id: obj.id,
                    friend: obj.user1
                };

                users.push(friend);
            }
            if (obj.user2 !== 'arpg') {
                const friend = {
                    id: obj.id,
                    friend: obj.user2
                };

                users.push(friend);
            }
        });

        setFriends(users);
        
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