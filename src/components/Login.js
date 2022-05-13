import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddList from "./AddList";
import CheckList from "./CheckList";
import styled from "styled-components";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [show, setShow] = useState(false);

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
  //     const response =
  //     fetch("http://94.74.86.174:8080/api/login", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })

  //     const data = await response.json()

  //     setToken(data.data.token)
  //     setLoading(false)
  //   }

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
        setShow(true);
        console.log(token);
      });
  };

  // async function fetchChecklistApi() {
  //     const response = await
  //     fetch("http://94.74.86.174:8080/api/checklist", {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     const data = await response.json()

  //     setChecklist(data.data)
  // }

  const fetchChecklistApi = () => {
    fetch("http://94.74.86.174:8080/api/checklist", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setChecklist(data.data);
        console.log(checklist);
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
    e.preventDefault();

    fetchLoginApi();
  };

  const loadChecklist = () => {
    fetchChecklistApi();
  };

  return (
    <>
      <InputContainer>
        <StyledInput
          type="text"
          onChange={usernameHandler}
          placeholder="Username"
        />
        <StyledInput
          type="password"
          onChange={passwordHandler}
          placeholder="Password"
        />
        <StyledButton onClick={formHandler}>login</StyledButton>
        <Link to="/">Dont have an account?</Link>
      </InputContainer>

      {!show ? "" : <AddList token={token} />}
      {!show ? "" : <button onClick={loadChecklist}>Load checklist!</button>}

      {checklist === null ? <div>no</div> : <CheckList checklist={checklist} />}
    </>
  );
};

export default Login;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 50%;
  margin: 10px 20px;
`;

const StyledButton = styled.div`
  text-align: center;
  background-color: aqua;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  padding: 10px;
  width: 50%;
  margin: 10px 20px;
`;
