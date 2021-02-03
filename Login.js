import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fname: '',
      lname: '',
      username: '',
      password: '',
      errors: ''
     };
  }

  
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {fname, lname, username, password} = this.state
    let user = {
      fname: fname,
      lname: lname,
      username: username,
      password: password
    }

    
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.redirect()
        this.props.handleLogin(response.data)
      } else {
        this.setState({
          errors: response.data.errors
        })
      }

    })
    .catch(error => console.log('api errors:', error))

  };
  
  redirect = () => {
    this.props.history.push('/edit')
  }
  

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }


render() {
    const {fname, lname, username,password} = this.state
return (
      <div>
        <form onSubmit = {this.handleSubmit}>
        <h1>Login</h1>
        <br></br>
          <input
            placeholder="First Name"
            type="text"
            name="fname"
            value={fname}
            onChange={this.handleChange}
          />
          <br></br>
           <input
            placeholder="Last Name"
            type="text"
            name="lname"
            value={lname}
            onChange={this.handleChange}
          />
          <br></br>
           <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br></br>
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            <br></br>
            or
            <br></br>
            <Link to='/Signup'>Sign Up</Link>
          </div>
          </form>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}

export default Login;