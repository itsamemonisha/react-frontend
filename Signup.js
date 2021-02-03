import React, { Component } from 'react';
import axios from 'axios'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fname: '',
      lname: '',
      username: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {fname, lname, username,password, password_confirmation} = this.state
    let user = {
      fname: fname,
      lname: lname,
      username: username,
      password: password,
      password_confirmation: password_confirmation
    }
axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }
render() {
    const {fname, lname, username,password, password_confirmation} = this.state
return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
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
          <input
            placeholder="Password Confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
        <br></br>
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
          <br></br>
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
export default Signup;