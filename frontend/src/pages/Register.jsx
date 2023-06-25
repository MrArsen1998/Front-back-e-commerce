import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const data = { username: username, password: password, email: email }
  const url = "http://localhost:5000/api/auth/register";


  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then(result => {
          if (result.error) {
            setErrors({ registrationError: result.error });
          } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setErrors({ successMessage: 'Registration complete successful, you will be redirected to login page!' });
            setTimeout(() => {
              window.location.href = '/login';
            }, 3000);
          }
        });
    } else {
      setErrors(validationErrors);
    }
    
  };


  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <div>
            <Input placeholder="username" type="text" id="username"
              value={username} onChange={(e) => { setUsername(e.target.value) }} />
            {errors.username && <Error>{errors.username}</Error>}
          </div>
          <div>
            <Input placeholder="email" type="text" id="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }} />
            {errors.email && <Error>{errors.email}</Error>}
          </div>
          <div>
            <Input placeholder="password" type="text" id="password"
              value={password} onChange={(e) => { setPassword(e.target.value) }} />
            {errors.password && <Error>{errors.password}</Error>}
          </div>
          {errors.registrationError && <Error>{errors.registrationError}</Error>}
          {errors.successMessage && <Error>{errors.successMessage}</Error>}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;