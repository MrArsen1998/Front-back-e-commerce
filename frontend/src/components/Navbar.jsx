import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-style: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const [decodedToken, setDecodedToken] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      const token = JSON.parse(`"${user}"`);
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setDecodedToken(null);
  };

  const renderAuthButtons = () => {
    if (decodedToken) {
      return (
        <>{decodedToken.username === 'admin' ? (
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <MenuItem>{decodedToken.username}</MenuItem>
          </Link>
        ) : (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem>{decodedToken.username}</MenuItem>
          </Link>
        )}
        
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </>
      );
    } else {
      return (
        <>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MenuItem>Sign In</MenuItem>
          </Link>
        </>
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Center>
            <Logo>Accessories</Logo>
          </Center>
        </Link>
        <Right>
          {renderAuthButtons()}
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <LocalMallOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
