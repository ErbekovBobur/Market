import { Container, Nav, Navbar, Row, Col, Button, Form, InputGroup, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import BasketToggle from '../Basket/BasketToggle';
import Logo from "../../img/searchsearch.svg";
import Auth from '../Auth/AuthButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchProduct, recoverBasketFromLocal } from '../../services/slices/productsSlice';
import { getItem } from '../../services/slices/funcs';
import ProductsByCategory from '../../module/ProductsByCategory';

function NavbarN() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const user = useSelector((state) => state.auth.user);
    const [searchInput, setSearchInput] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        searchInput && dispatch(searchProduct(searchInput));
    }, [searchInput, dispatch]);

    useEffect(() => {
        if (getItem('basket')) {
            dispatch(recoverBasketFromLocal(getItem('basket')));
        };
    }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="sm" className='bg-gradient'>
            <Container fluid >
                <Row className='w-100 pt-1'>
                    <Col sm={6} md={4} lg={4} xl={5}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav justify variant="underline" className="flex-fill" >
                                <NavLink className="nav-link" to='/' >Главная</NavLink>
                                <NavLink className="nav-link" to='/favorite' >Favorite</NavLink>
                                {isAdmin && <NavLink className="nav-link" to='/admin' >Admin</NavLink>}
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col sm={6} md={8} lg={8} xl={7}>
                        <Form className='h-100'>
                            <Row className='h-100 align-items-center'>
                                <Col sm={2} md={1} className='text-info d-flex justify-content-center align-items-center'>
                                    {user}
                                </Col>
                                <Col sm={3} md={2}>
                                    <Auth />
                                </Col>
                                <Col sm={3} md={2}>
                                    <BasketToggle />
                                </Col>
                                <Col sm={3} md={3}>
                                    <ProductsByCategory />
                                </Col>
                                <Col sm={4} md={4}>
                                    <InputGroup>
                                        <Form.Control size='sm' id='search' type="search" placeholder="Search"
                                            onChange={(e) => setSearchInput(e.target.value)}
                                        />
                                        <Button disabled size="sm" type="submit" variant="outline-info" id="button-addon2" >
                                            <Image src={Logo} />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default NavbarN;