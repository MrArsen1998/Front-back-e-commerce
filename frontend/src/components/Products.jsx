import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState } from "react"
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Products = ({cat, filters, sort}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(filters, 123)
  useEffect(()=>{
    const getProducts = async () => {
      try{
        const res = await axios.get(
          cat 
          ? `http://localhost:5000/api/products?category=${filters.category}&gender=${filters.gender}` 
          : "http://localhost:5000/api/products"
          );
          setProducts(res.data);
      }catch(err){}
    };
    getProducts()
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
      console.log(cat)
      console.log(filters)
  }, [products, cat, filters])

  useEffect(() =>{
    if((sort ==="newest")){
      setFilteredProducts((prev) =>
      [...prev].sort((a,b)=> a.createdAt - b.createdAt))
    } else if ((sort) === "esc") {
      setFilteredProducts((prev) =>
      [...prev].sort((a,b)=> a.price - b.price))
    } else {
      setFilteredProducts((prev) =>
      [...prev].sort((a,b)=> b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
        {cat 
        ? filteredProducts.map((item) => <Product key = {item.id} item = {item} />) 
        : products.map((item) => <Product key = {item.id} item = {item} />)}
    </Container>
  );
};

export default Products