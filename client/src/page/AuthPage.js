import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AuthForm from '../component/Auth/AuthForm';

function AuthPage() {

    return (
        <>
            <Container
                className='mt-5'
            >
                <Row className='justify-content-center align-items-center mt-5 h-100'>
                    <Col md={5} lg={3} className='shadow-lg p-3 bg-dark rounded'>
                        <AuthForm />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AuthPage;