import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckList from "./CheckList";

const Login = () => {
  const [userInfo, setUserInfo] = useState();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const fetchRegisterApi = async () => {
  //     const response = await fetch("94.74.86.174:8080/api", {
  //       method: "POST",
  //       body: JSON.stringify(userInfo),
  //       headers: {
  //         'Content-type': "application/json",
  //         'Accept': "application/json",
  //       },
  //     });
  //     const data = response.json();
  //     console.log(data);
  //   };


//   async function fetchLoginApi() {

//   }
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setToken(data.data.token);
    //     console.log(token);
    //   });
  const fetchLoginApi = () => {
    fetch("http://94.74.86.174:8080/api/login", {
      method: "POST",
      body: JSON.stringify({
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
        setToken(data.data.token);
        console.log(token);
      });
  };

  const fetchChecklistApi = () => {
    fetch("http://94.74.86.174:8080/api/checklist", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setChecklist(data.data);
        setLoading(false);
      });
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault()
    setUserInfo({
      password: password,
      username: username,
    });

    fetchLoginApi();
    fetchChecklistApi();
  };

  return (
    <div>
      <div>
        <input type="text" onChange={usernameHandler} placeholder="Username" />
        <input
          type="password"
          onChange={passwordHandler}
          placeholder="Password"
        />
        <button onClick={formHandler}>login</button>
        <Link to="/">Dont have an account?</Link>
      </div>
      {loading ? (
        ""
      ) : (
        <CheckList checklist={checklist} />
        
      )}
    </div>
  );
};

export default Login;
