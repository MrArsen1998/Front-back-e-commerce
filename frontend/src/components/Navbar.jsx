import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items:center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`
const SearchContaniner = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItem = styled.div`
    font-style: 14px;
    cursor: pointer;
    margin-left: 25px;
    color: black;
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContaniner>
                    <Input/>
                    <SearchIcon style={{color:"gray", fontSize:16}}/>
                </SearchContaniner>
            </Left>
            <Center>
                <Logo>
                <Link to = "/" style={{ textDecoration: 'none' }}> ARSEN </Link>
                </Logo>
            </Center>
            <Right>
                <MenuItem>
                   <Link to = "/register" style={{ textDecoration: 'none' }}> REGISTER </Link> 
                </MenuItem>
                <MenuItem>
                    <Link to = "/login" style={{ textDecoration: 'none'}}> SIGN IN </Link>
                </MenuItem>
                <MenuItem>
                <Badge badgeContent={4} color="primary">
                    <LocalMallOutlinedIcon/>
                </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar