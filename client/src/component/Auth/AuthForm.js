import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/api/userApi';
import { signUserSuccess } from '../../services/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delFromFavoriteList } from '../../services/slices/productsSlice';

function AuthForm() {
    const [loginUser, result] = useLoginUserMutation();
    const [registerUser] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const login = event.target.login.value;
            const password = event.target.password.value;
            const admin = 'DEFAULT';
            const userData = { login, password, admin };
            !isRegister && await loginUser({ login: login, password: password })
            isRegister && await registerUser({ userData })
                .unwrap()
                .then(res => {
                    if (res.command && res.command) {
                        dispatch(signUserSuccess({ login: user, admin: false }));
                        setIsRegister(false);
                        navigate('/');
                        dispatch(delFromFavoriteList(-1));
                    };
                })
                .catch(err => {
                    setErrorMessage(err);
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 3000);
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (result.isSuccess && result.data.length && result.data[0].login === user) {
            dispatch(signUserSuccess(result.data[0]));
            dispatch(delFromFavoriteList(-1));
            if (result.data[0].admin) {
                navigate('/admin')
            } else navigate('/');
        } else if (result.status === "fulfilled" && result.data.length === 0) {
            setErrorMessage('Ошибка авторизации');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }, [result]);

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)} >
                <Row className='p-1 mb-5 text-white' >
                    <Col >
                        <Form.Group className="mb-3" controlId="login">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" placeholder="Введите логин" onChange={(e) => setUser(e.target.value)} />
                        </Form.Group>
                        {isRegister && <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" />
                        </Form.Group>}
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль" />
                        </Form.Group>
                        <Form.Label style={{ height: '10px', color: 'red' }}>
                            <Badge bg="danger" pill>
                                {errorMessage}
                            </Badge>
                        </Form.Label>
                    </Col>
                </Row>
                <Row className='justify-content-evenly pb-3' >
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <Button variant="outline-info" type='submit' >
                            {!isRegister ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Col>
                    <Col xs={5} md={5} lg={5} xl={4} >
                        <Button onClick={() => setIsRegister(!isRegister)} variant="outline-info">
                            {!isRegister ? 'Регистрация' : 'Назад'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default AuthForm;