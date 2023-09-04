import React from 'react';
import { Col, Container, Row, ListGroup, Badge } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { useGetCategoryQuery } from '../../services/api/productApi';
import { useGetUsersQuery } from '../../services/api/userApi';


function AdminControl() {
    const category = useGetCategoryQuery();
    const users = useGetUsersQuery();

    return (
        <>
            <Container fluid>
                <Row className='mt-3'>
                    <Col md={4} lg={2} >
                        <ListGroup className='p-3 bg-dark bg-gradient rounded pb-5'>
                            <ListGroup.Item disabled variant="info">Управление</ListGroup.Item>
                            <NavLink className='nav-link' to='discount/'>
                                <ListGroup.Item action
                                    variant="info"
                                    className="d-flex justify-content-between align-items-start fw-bold text-dark mt-1"
                                >
                                    Скидки
                                </ListGroup.Item>
                            </NavLink>
                            <NavLink className='nav-link' to='category/'>
                                <ListGroup.Item action
                                    variant="info"
                                    className="d-flex justify-content-between align-items-start fw-bold text-dark mt-1"
                                // onClick={getProductByCategory}
                                >
                                    Категории
                                    <Badge bg="primary" pill>
                                        {category.data ? category.data.length : ''}
                                    </Badge>
                                </ListGroup.Item>
                            </NavLink>
                            <NavLink className='nav-link mb-5' to='users/'>
                                <ListGroup.Item action
                                    variant="info"
                                    className="d-flex justify-content-between align-items-start fw-bold text-dark mt-1"
                                // onClick={getProductByCategory}
                                >
                                    Пользователи
                                    <Badge bg="primary" pill>
                                        {users.data? users.data.length : ''}
                                    </Badge>
                                </ListGroup.Item>
                            </NavLink>
                        </ListGroup>
                    </Col>
                    <Col md={8} lg={9}>
                        <Outlet />
                    </Col>
                </Row >
            </Container >
        </>
    )
}

export default AdminControl;