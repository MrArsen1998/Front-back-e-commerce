import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 350px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`;

const Image = styled.img`
    height: 70%;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition:all 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
    cursor: pointer;
`

const Product = ({item}) => {
  return (
    <Container>
        <Image src = {item.img}/>
        <Info>
            <Icon>
                <ShoppingCartOutlinedIcon/>
            </Icon>
            <Icon>
                <SearchIcon/>
            </Icon>
            <Icon>
                <FavoriteBorderIcon/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product
