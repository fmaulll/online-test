import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [userInfo, setUserInfo]= useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const fetchRegisterApi = () => {
        fetch("http://94.74.86.174:8080/api/login", {
      method: "POST",
      body: JSON.stringify({
          email: email,
        username: username,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
      });
    }
    // const fetchRegisterApi = () => {
    //     fetch('94.74.86.174:8080/api/register',{
    //         method: 'POST',
    //         body:JSON.stringify(userInfo)
    //     }).then(res=> console.log(res))
    // }



    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const formHandler = () => {
        setUserInfo({
            email: email,
            password: password,
            username: username
        })  

        fetchRegisterApi()
        navigate('/login')
    }

  return (
    <div>
        <input type="email" onChange={emailHandler} placeholder='Email' />
        <input type="text" onChange={usernameHandler} placeholder='Username' />
        <input type="password" onChange={passwordHandler} placeholder='Password' />
        <button onClick={formHandler}>register</button>
        <Link to='/login'>already have an account?</Link>
    </div>
  )
}

export default Register