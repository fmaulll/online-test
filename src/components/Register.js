import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const fetchRegisterApi = () => {
    fetch("http://94.74.86.174:8080/api/register", {
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
  };
  // const fetchRegisterApi = () => {
  //     fetch('94.74.86.174:8080/api/register',{
  //         method: 'POST',
  //         body:JSON.stringify(userInfo)
  //     }).then(res=> console.log(res))
  // }

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formHandler = () => {
    setUserInfo({
      email: email,
      password: password,
      username: username,
    });

    fetchRegisterApi();
    navigate("/login");
  };

  return (
    <InputContainer>
      <StyledInput type="email" onChange={emailHandler} placeholder="Email" />
      <StyledInput type="text" onChange={usernameHandler} placeholder="Username" />
      <StyledInput
        type="password"
        onChange={passwordHandler}
        placeholder="Password"
      />
      <StyledButton onClick={formHandler}>register</StyledButton>
      <Link to="/login">already have an account?</Link>
    </InputContainer>
  );
};

export default Register;

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
