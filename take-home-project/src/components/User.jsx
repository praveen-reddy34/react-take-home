import { useState } from 'react';
import List from "./List";

function User() {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [shoppingList, setShoppingList] = useState([]);
    
    function setUser(event){ 
        event.preventDefault();
        setName(userName);
        setShoppingList([]);
          postUser('http://localhost:8000', { name: userName })
          .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
          });
        setUserName("");
       };
    
    function getUser(event){ 
    event.preventDefault();
    setName(userName);
        getData(`http://localhost:8000/${userName}`)
        .then((data) => {
            setShoppingList(data.shoppingList); // JSON data parsed by `data.json()` call
        });
    };
    async function getData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "GET",
          headers: {
         "Content-Type": "application/json",
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      }
      )
      return response.json();
    };


    async function postUser(url = '', data = {userName}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST",
          headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .catch(error => {
        window.alert(error);
        return;
      })
      return response.json();
    };

    return (
        <div>
            <div>
                <label for="userName">UserName: </label>
                <input type="text" id="userName" name="userName" placeholder="Enter Your UserName" 
                        value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <br /> <br />

                <input type="submit" value="Save" onClick={setUser}/>&nbsp;
                <input type="submit" value="Retrieve" onClick={getUser}/>
            </div>
            <List name={name} list={shoppingList} />
        </div>
        
    );
}

export default User;


