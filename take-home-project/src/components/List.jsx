import { useState, useEffect } from 'react';

function List(props) {
    let initialList = props.list;
    const [listText, setListText] = useState("");
    const [shoppingList, setShoppingList] = useState(initialList);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
      setShoppingList(initialList);
    }, [initialList]);

    
    const userName = props.name;


    function handleClick(event){ 
      event.preventDefault();
        postData(`http://localhost:8000/${userName}`, { item: listText })
        .then((data) => {
          if(data.status === 200) {
            setShoppingList((oldList) =>{
              return [...oldList, listText];
            }
            )
          }
        });
        setListText("");
     };
     async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST",
        headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({item: listText}),
    })
    .catch(error => {
      window.alert(error);
      return;
    }
    
    )
    
    return response.json();
  };

  function handleChange(event) {
    let isChecked = false;
    // isChecked = checkedItems.filter((num) => {
      
    // });
    checkedItems.forEach(function(num) {
      console.log(num);
      console.log(event.target.id)
      if(num === event.target.id) {
        isChecked = true;
        checkedItems.pop(num);
      }
    })
    if(!isChecked) {
      setCheckedItems((oldItems) =>{
        return [...oldItems, event.target.value];
    })
  }
      
  }
  



  async function deleteData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({deleteItems: checkedItems}),
    
  })
  .catch(error => {
    window.alert(error);
    return;
  }
  )
  return response.json();
};

  function deleteItems(event) {
    event.preventDefault();
    console.log(checkedItems);
    deleteData(`http://localhost:8000/${userName}`)
    .then((data) => {
        setShoppingList(data.shoppingList); // JSON data parsed by `data.json()` call
    });
  };


    const listItems = shoppingList.map((item, index) =>
      <li key={index} ><input id={index}
      onChange={handleChange} 
      type="checkbox" value={item}/><label for={index}> {item}</label></li>
    );
    return (
      <div style={{ marginTop: '2rem' }}>
        <label for="shoppingList">Shopping List: </label>
        <input type="text" id="shoppingList" name="shoppingList" placeholder="Enter Item" value={listText}
          onChange={e => setListText(e.target.value)}
        />
        <br /> <br />
        <input type="submit" value="Add Item" onClick={handleClick}/>&nbsp;
        <input type="submit" value="Delete Item" onClick={deleteItems}/>
        <ul style={{ listStyleType: 'none' }}>{listItems}</ul>
      </div>
    );
  }
  
  export default List;