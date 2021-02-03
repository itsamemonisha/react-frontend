import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Home = (props) => {
const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
return (
   
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form class = "form form2">
      <br></br>
      <Link to='/login'>Login </Link>
      <br></br>
      <br></br>
      <Link to='/signup'>Signup</Link>
      <br></br>
      { 
        props.loggedInStatus ? 
        <Link to='/logout' onClick={handleClick}>Log Out</Link>:
        null
      }
      <br></br>
      </form>
    </div>
  );
};
export default Home;