import React, { useState } from 'react';
import { useEditCategoryMutation, useGetCategoryQuery } from '../../services/api/productApi';
import { Button, Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/slices/productsSlice';
import ModalOk from '../Modal/ModalOk';
import CategoryItem from './CategoryItem';

function Category() {
    const category = useGetCategoryQuery();
    const [editCategory] = useEditCategoryMutation();
    const dispatch = useDispatch();
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [modalTitle, setModalTitle] = useState();
    const [erroMessage, setErroMessage] = useState();

    async function newCategoryHandle(e, newValue) {
        e.preventDefault();
        e.stopPropagation();
        try {
            let data = {};
            if (typeof newValue === 'object') {
                const newName = newValue.inputValue;
                const id = newValue.id;
                data = { newName, id };
            } else if (typeof newValue === 'number') {
                const id = newValue;
                data = { id };
            } else {
                data = { newName: e.target.newName.value };
            }
            await editCategory(data)
                .unwrap()
                .then((res) => {
                    console.log(res);
                    if (res.command && res.command) {
                        setModalTitle(res.command)
                        dispatch(setModal(true));
                    };
                    setIsNewCategory(false);
                    category.refetch();
                })
                .catch((err) => {
                    setErroMessage(err);
                })
        } catch (err) {
            setErroMessage(err)
        }
    };

    return (
        <>
            <Container >
                <Row className='mb-3 bg-dark bg-gradient py-2 rounded'>
                    <Col className='d-flex justify-content-evenly'>
                        <Button size='sm' variant="outline-info" onClick={() => setIsNewCategory(!isNewCategory)}>Добавить категорию</Button>
                        {/* <Button size='sm' variant="outline-info">Добавить администратора</Button> */}
                    </Col>
                </Row>
                <Row>
                    <span className='text-danger'>{erroMessage}</span>
                    <Col>
                        <Form onSubmit={(e) => newCategoryHandle(e)}>
                            <Table variant="success" bordered hover size="sm" responsive='md' >
                                <thead>
                                    <tr className='text-center align-middle'>
                                        <th>№</th>
                                        <th>Название</th>
                                        <th>Дата создания</th>
                                        <th></th><th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isNewCategory && <tr className='text-center align-middle'>
                                        <td></td>
                                        <td>
                                            <Form.Control id='newName' name='newName' type="text" size="sm" placeholder="Название" />
                                        </td>
                                        <td></td><td></td>
                                        <td><Button type='submit' size='sm'>Добавить</Button></td>
                                    </tr>}
                                    {category.isSuccess ? (category.data.map((item, index) =>
                                        <CategoryItem item={{ item, index }} func={newCategoryHandle} key={index} />
                                    )) : (<tr align='center'><td colSpan='5'><h5>Нет категорий</h5></td></tr>)}
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

export default Category;