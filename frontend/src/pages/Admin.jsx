import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';


const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const Image = styled.img`
    width:100px;
    height: 80px;
  padding:5px;

`;
const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const AddButton = styled(Button)`
  background-color: #4caf50;
  color: #fff;
`;

const UpdateButton = styled(Button)`
  background-color: #2196f3;
  color: #fff;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
`;


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        desc: '',
        image: '',
        price: '',
        category: '',
        gender: '',
    });
    const [editingProduct, setEditingProduct] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }, []);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleAddProduct = () => {
        axios.post('http://localhost:5000/api/products/add', newProduct, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
            }
        })
            .then((response) => {
                const { success } = response.data;

                if (success) {
                    setProducts((prevProducts) => [...prevProducts]);
                    setNewProduct({ title: '', price: '', category: '', desc: '', gender: '', image: '' });
                }
                console.log(success);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    };

    const handleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:5000/api/products/delete/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            }
        })
            .then((response) => {
                const { success } = response.data;

                if (success) {
                    setProducts((prevProducts) =>
                        prevProducts.filter((product) => product._id !== productId)
                    );
                }
                console.log(success);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    };


    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    const handleUpdateProduct = () => {
        axios.put(`http://localhost:5000/api/products/update/${editingProduct._id}`, newProduct, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
            }
        })
            .then((response) => {
                const { success, data } = response.data;

                if (success) {
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === data._id ? data : product
                        )
                    );
                    setEditingProduct(null);
                    setNewProduct({ title: '', price: '', category: '', desc: '', gender: '', image: '' });
                }
                console.log(success);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    };




  return (
    <Wrapper>
      <Title>Product Table</Title>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
        {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.desc}</td>
                            <td>{product.price}</td>
                            <td>
                            <Image src={product.image}/>
                            </td>
                            <td>{product.category}</td>
                            <td>{product.gender}</td>
                            <td>
                                <UpdateButton onClick={() => handleEditProduct(product)}>
                                    Edit
                                </UpdateButton>
                                <DeleteButton onClick={() => handleDeleteProduct(product._id)}>
                                    Delete
                                </DeleteButton>
                            </td>
                        </tr>
                    ))}
        </tbody>
      </Table>

      <Title>Add Product</Title>
      <div>
                <Input
                    type="text"
                    name="title"
                    placeholder="Product Name"
                    value={newProduct.title}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="price"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="desc"
                    placeholder="Product Description"
                    value={newProduct.desc}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="image"
                    placeholder="Image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                />
                <Select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                >
                    <option value="">Select Category</option>
                    <option value="watch">Watch</option>
                    <option value="sunglass">Sunglass</option>
                    <option value="wallet">Wallet</option>
                </Select>

                <Select
                    name="gender"
                    value={newProduct.gender}
                    onChange={handleInputChange}
                >
                    <option value="">Select Gender</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                </Select>
                {editingProduct ? (
                    <UpdateButton onClick={handleUpdateProduct}>Update</UpdateButton>
                ) : (
                    <AddButton onClick={handleAddProduct}>Add</AddButton>
                )}
      </div>
    </Wrapper>
  );
};

export default ProductTable;
