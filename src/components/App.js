import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);  

  const handleClick= async ()=>{
    setIsLoading(true)
    const res= await fetch("https://content.newtonschool.co/v1/pr/main/users")
    const data= await res.json()
    setIsLoading(false)
    setUsers(data)
  }

  const handleSorting=()=>{
    const users1=[...users].sort((a,b)=>{
      if(sortAscending){
        return a.name.length-b.name.length
      }
      else{
        return b.name.length-a.name.length
      }
    })
    setUsers(users1)
    setSortAscending(!sortAscending)
  }

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={handleClick}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleSorting}>
        {sortAscending ?  "Sort by name length (ascending)" :
        "Sort by name length (descending)"}
      </button>
      {isLoading ? <p>Loading...</p> :
      <div className='users-section'>
          {users.map((item)=>
          <li key={item.id}>
            <section className='id-section'>{item.id}</section>
            <section className='name-email-section'>
              <p className='name'>Name: {item.name}</p>
              <p className='email'>Email: {item.email}</p>
            </section>
          </li>
          )
        } 
      </div>}
    </div>
  )
}


export default App;
