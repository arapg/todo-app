import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import FriendList from "./FriendList";

function FriendPage() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const params = useParams();
    const friend = params.friend;
    const authToken = cookie.authToken;
    const [lists, setLists] = useState(null);

    async function getData () {
        try {
        const response = await fetch(`http://localhost:5050/friends/${friend}`, {
            credentials: 'include'
        });
        const json = await response.json();

        setLists(json);
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
            <h2>{friend}'s todo lists: </h2>
            <div className="lists">
            {!lists 
            ? <p>Loading...</p>
            : ( lists.length === 0
                ? <p>This user doesn't have any lists yet, check back later!</p>
                : lists?.map((list) => <FriendList key={list.id} list={list}/>)
                )
            }
            </div>
        </>
    )
}

export default FriendPage;