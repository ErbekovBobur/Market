import React, { useState } from 'react';
import { Button, Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useGetUsersQuery, useRegisterUserMutation } from '../../services/api/userApi';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/slices/productsSlice';
import ModalOk from '../Modal/ModalOk';

function Users() {
    const usersData = useGetUsersQuery({});
    const [addNewUser] = useRegisterUserMutation();
    const [isNewUser, setIsNewUser] = useState(false);
    const [modalTitle, setModalTitle] = useState();
    const dispatch = useDispatch();

    function showDate(date) {
        return new Date(date).toLocaleDateString();
    }

    async function newUserHandle(e) {
        e.preventDefault();
        e.stopPropagation();
        let userData = {};
        try {
            if (e.type === 'submit') {
                const login = e.target.login.value;
                const password = e.target.password.value;
                const admin = e.target.isAdmin.checked;
                userData = { login, password, admin };
            } else if (e.type === 'click') {
                const user_id = Number(e.target.id);
                userData = { user_id };
            }
            await addNewUser({ userData })
                .unwrap()
                .then((res) => {
                    if (res.command && res.command) {
                        setModalTitle(res.command);
                        setIsNewUser(false);
                        dispatch(setModal(true));
                    };
                    usersData.refetch();
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Container >
                <Row className='mb-3 bg-dark bg-gradient py-2 rounded'>
                    <Col className='d-flex justify-content-evenly'>
                        <Button size='sm' variant="outline-info" onClick={() => setIsNewUser(!isNewUser)}>Добавить администратора</Button>
                        <Button size='sm' variant="outline-info">Добавить администратора</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={newUserHandle}>
                            <Table striped bordered hover size="sm" responsive='md' >
                                <thead>
                                    <tr className='text-center align-middle'>
                                        <th>№</th>
                                        <th>Логин</th>
                                        <th>Пароль</th>
                                        <th>Дата регитрации</th>
                                        <th>Права админа</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isNewUser && <tr className='text-center align-middle'>
                                        <td></td>
                                        <td >
                                            <Form.Control id='login' name='login' type="text" size="sm" placeholder="Логин" />
                                        </td>
                                        <td >

                                            <Form.Control id='password' name='password' type="text" size="sm" placeholder="Пароль" />

                                        </td>
                                        <td></td>
                                        <td >
                                            <Form.Check // prettier-ignore
                                                type='checkbox'
                                                id='isAdmin'
                                                name='isAdmin'
                                            />
                                        </td>
                                        <td ><Button type='submit' size='sm'>Добавить</Button></td>
                                    </tr>}
                                    {usersData.data ? usersData.data.map((item, index) =>
                                        <tr key={index} role="button" className='text-center align-middle'>
                                            <td>{index + 1}</td>
                                            <td>{item.login}</td>
                                            <td>{item.password}</td>
                                            <td>{showDate(item.date)}</td>
                                            <td>{item.admin ? 'Да' : 'Нет'}</td>
                                            <td >
                                                <Button variant='danger' size='sm' id={item.user_id} onClick={newUserHandle}>
                                                    Удалить
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : <tr align='center'><td colSpan='5'><h5>Нет пользователей</h5></td></tr>}
                                </tbody>
                            </Table>
                        </Form>
                    </Col>
                </Row>
                <ModalOk title={modalTitle} />
            </Container>
        </>
    )
}

export default Users;