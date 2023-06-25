import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import jwt_decode from 'jwt-decode';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.fashiongonerogue.com/wp-content/uploads/2019/02/Male-Model-Putting-on-Watch.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  color: red;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const url = "http://localhost:5000/api/auth/login";

  const login = (e) => {
    e.preventDefault();
    const userData = {
      username: user.username,
      password: user.password
    };
  
    axios.post(url, userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        const decodedToken = decodeToken(response.data.accessToken);
  
        if (decodedToken.isAdmin) {
          window.location.href = '/admin';
        } else {
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
  
        setLoginSuccess(true);
        setLoginError(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setLoginError('Username or password is incorrect!');
        } else {
          setLoginError('An error occurred: ' + error.message);
        }
      });
  };
  
  const decodeToken = (token) => {
    // Assuming you have a method to decode the token, you can replace this with your implementation
    // Here's an example using JWT library (jsonwebtoken)
    const decoded = jwt_decode(token);
  
    if (decoded) {
      return decoded;
    } else {
      // Handle invalid token
      // You can redirect to an error page or perform other actions
      throw new Error('Invalid token');
    }
  };
  

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="username" />
          <Input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
          <Button onClick={login}>LOGIN</Button>
          {loginSuccess && <SuccessMessage>Login successful, you will be redirected to the main page!'</SuccessMessage>}
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};


export default Login;