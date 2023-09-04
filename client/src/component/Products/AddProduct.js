import { Button, Modal, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useAddNewProductMutation } from '../../services/api/productApi';
import ProductForm from './ProductForm';

function AddProduct() {
    // const [newProduct, result] = useAddNewProductMutation();

    return (
        <>
            <Container fluid >
                <ProductForm />
            </Container>
        </>
    );
}

export default AddProduct;