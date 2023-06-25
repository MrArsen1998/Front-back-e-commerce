import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  
  const [sort,setSort] = useState("newest")
  const [cat, setCat] = useState(location.pathname.split("/")[2])
  const [filters,setFilters] = useState({category:cat, gender:"man"})

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    })
    setCat(e.target.value)
  }

  return (
    <Container>
      <Navbar />
      <Title>All accessories</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name = "category" onChange = {handleFilters}>
            <Option disabled>
              Category
            </Option>
            <Option>watch</Option>
            <Option>sunglass</Option>
            <Option>wallet</Option>
          </Select>
          <Select name = "gender" onChange = {handleFilters}>
            <Option disabled>
              Gender
            </Option>
            <Option>man</Option>
            <Option>woman</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange = {(e) => setSort(e.target.value)}>
            <Option value = "newest"> Newest</Option>
            <Option value = "asc">Price (asc)</Option>
            <Option value = "desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat = {cat} filters = {filters} sort = {sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;