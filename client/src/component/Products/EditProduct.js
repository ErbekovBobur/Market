import React, { useEffect, useState } from 'react';
import { Col, Container, Row, ListGroup, Table, Button, Modal } from 'react-bootstrap';
import { useGetCategoryQuery, useGetProductQuery, useDeleteProductMutation } from '../../services/api/productApi';
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const productData = useGetProductQuery();
    const [deleteProduct, result] = useDeleteProductMutation();
    const category = useGetCategoryQuery();
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    async function getProductByCategory(e) {
        try {
            if (e.target.textContent !== 'Все товары') {
                setProducts(productData.data.filter((item) => item.category === e.target.textContent));
            } else setProducts(productData.data);
        } catch (err) {
            console.log(err);
        }
    };

    function currentProduct(e) {
        navigate(`${e.currentTarget.id}`);
    };

    async function delProduct(e, id) {
        e.stopPropagation();
        setDeleteProductId(id)
        setShowModal(true);
    };

    function confirmDeleteProduct(product_id) {
        deleteProduct({ product_id });
        setShowModal(false)
        productData.refetch();
    }

    useEffect(() => {
        productData.data && setProducts([...productData.data]);
    }, [productData.data]);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} lg={3}>
                        <ListGroup >
                            <ListGroup.Item disabled variant="success">Категории товаров</ListGroup.Item>
                            <ListGroup.Item action variant="success" onClick={getProductByCategory}>Все товары</ListGroup.Item>
                            {category.data && category.data.map((item, index) =>
                                <ListGroup.Item action variant="success" key={index} id={item.id}
                                    onClick={getProductByCategory} >
                                    {item.name}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md={8} lg={9}>
                        <Table striped bordered hover size="sm" responsive='md' >
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Название</th>
                                    <th>Цена</th>
                                    <th>Бренд</th>
                                    <th>Категория</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((item, index) =>
                                    <tr key={index} id={item.product_id} onClick={currentProduct} role="button" >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.brend}</td>
                                        <td>{item.category}</td>
                                        <td className="d-flex justify-content-center"><Button variant='danger' size='sm' onClick={e => delProduct(e, item.product_id)}>Удалить</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row >
            </Container >
            <Modal centered show={showModal} onHide={setShowModal}>
                <Modal.Footer className='justify-content-between'>
                    {/* <Modal.Header> */}
                    <Modal.Body className='lead'>
                        Удалить?
                    </Modal.Body>
                    {/* </Modal.Header> */}
                    <Button variant="danger" onClick={() => confirmDeleteProduct(deleteProductId)}>
                        OK
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default EditProduct;