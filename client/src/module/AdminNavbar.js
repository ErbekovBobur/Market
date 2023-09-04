import React from 'react';
import { Nav, Col } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom';
import style from '../style/header.module.css';

function AdminNavbar() {
    return (
        <>
            <Col md={9} lg={7} className='mx-auto'>
                <Nav justify variant="tabs" defaultActiveKey="/" className='bg-dark bg-gradient'>
                    <Nav.Item>
                        <NavLink className={style.adminLink + ' nav-link'} to='control/'>Управление доступом</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className={style.adminLink + ' nav-link'} to='edit/'>Изменить товар</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className={style.adminLink + ' nav-link'} to='add/'>Добавить товар</NavLink>
                    </Nav.Item>
                </Nav>
            </Col>
        </>
    )
}

export default AdminNavbar;