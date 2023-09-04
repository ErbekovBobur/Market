import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAddNewProductMutation, useEditProductMutation, useGetCategoryQuery, useGetCurrentProductQuery } from '../../services/api/productApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ifEditData } from './productsFunc';
import ModalOk from '../Modal/ModalOk';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/slices/productsSlice';

function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newProduct] = useAddNewProductMutation();
    const [editProduct] = useEditProductMutation();
    const { data, isLoading } = useGetCurrentProductQuery(+id);
    const category = useGetCategoryQuery();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    async function sendForm(e) {
        e.preventDefault();
        if (e.target.category.value === '0') {
            dispatch(setModal(true));
            setErrorMessage('Выберите категорию!')
            return;
        }
        try {
            const data = id ? { product_id: id, newData: product } : product;
            const func = id ? editProduct : newProduct;
            await func(data)
                .unwrap()
                .then(res => {
                    checkResult(e, res);
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    };

    function checkResult(e, result) {
        if (result.hasOwnProperty('severity')) {
            setErrorMessage(result.severity);
            dispatch(setModal(true));
            return;
        } else {
            setErrorMessage('');
            setIsValid(false);
            dispatch(setModal(true));            
            e.target.reset();
            return;
        }
    }

    useEffect(() => {
        id && data && ifEditData(id, data);
    }, [data]);

    return (
        <>
            <Row className='justify-content-center'>
                <Col className='border m-1 p-3' md={6} lg={4}>
                    <Form autoComplete='off' id='product_form' onSubmit={(e) => sendForm(e)}>
                        <h1>Товар</h1>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label ><tt>Название товара</tt></Form.Label>
                            <Form.Control required name='name' type="text" placeholder="Введите название товара" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Цена товара</Form.Label>
                            <Form.Control required name='price' type="text" placeholder="Введите цену товара" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="url">
                            <Form.Label>URL для картинки товара</Form.Label>
                            <Form.Control required name="url" type="text" placeholder="Введите ссылку на картину товара" onChange={(e) => setProduct({ ...product, url: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Категория товара</Form.Label>
                            <Form.Select name='category' required isInvalid={!isValid} isValid={isValid} aria-label="Default select example" onChange={(e) => {
                                e.target.value !== '0' ? setIsValid(true) : setIsValid(false)
                                setProduct({ ...product, category: e.target.value })
                            }}>
                                <option value='0' >Выберите категорию товара</option>
                                {category.data && category.data.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Срок годности товара</Form.Label>
                            <Form.Control type='date' required name="date" placeholder="Введите дату истечения годности товара: 'dd.mm.yyyy'" onChange={(e) => setProduct({ ...product, exp_date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>Количество товара</Form.Label>
                            <Form.Control required name='amount' type="text" placeholder="Введите количество товара" onChange={(e) => setProduct({ ...product, amount: e.target.value })} />
                            <Form.Text className="text-muted">
                                <i>Количество новых добавляемых товаров</i>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Описание товара</Form.Label>
                            <Form.Control required name='description' as="textarea" rows={3} cols={5} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="brend">
                            <Form.Label>Бренд товара</Form.Label>
                            <Form.Control required name='brend' rows={3} cols={5} onChange={(e) => setProduct({ ...product, brend: e.target.value })} />
                        </Form.Group>
                        <Row className='flex-column flex-sm-row justify-content-sm-between align-items-sm-center'>
                            <Col sm={6} xxl={4}>
                                <Button type='submit' className='container' variant="primary" >
                                    Сохранить
                                </Button>
                            </Col>
                            <Col sm={6} xxl={4}>
                                <Button variant="secondary" className="float-end container my-2 my-md-0" onClick={() => navigate(-1)}>
                                    Отмена
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row >
            <ModalOk title={errorMessage} />
        </>
    )
}
export default ProductForm;