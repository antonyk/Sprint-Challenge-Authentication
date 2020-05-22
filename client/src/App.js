import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Jokes from './Jokes';
import axiosWithAuth from './axiosWithAuth'

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState({login: ''})

  // useEffect(() => {
  //   setToken(localStorage.getItem('authToken'))
  // }, [])

  // useEffect(() => {

  // }, [token])

  function loginHandler(e) {
    e.preventDefault();
    // call auth with login and get token
    axiosWithAuth()
      .post('/api/auth/login', user)
      .then(res => {
        // set token to localstorage
        const newToken = JSON.stringify(res.data.payload)
        localStorage.setItem('token', newToken)
        setToken(newToken)
      })
      .catch(err => {
        console.log({err})
      })
  }
  
  function inputChangeHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <br />
      <br />
      <br />

      <form onSubmit={loginHandler}>
        <div className='input-group'>
          <label htmlFor='username'>
            Username
            <input type='text' name='username' id='username' onChange={inputChangeHandler} />
          </label>
        </div>
        <div className='input-group'>
          <label htmlFor='password'>
            Password
            <input type='text' name='password' id='password' onChange={inputChangeHandler} />
          </label>
        </div>
        <div>{errors.login}</div>
        <button>Login</button>
      </form>

      <Jokes />


    </div>
  );
}

export default App;
