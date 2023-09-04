import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useGetCategoryQuery, useGetProductQuery } from '../../services/api/productApi';

function Statistic() {
    const [totalPriceState, setTotalPrice] = useState();
    const [totalCountState, setTotalCount] = useState();
    const category = useGetCategoryQuery();
    const product = useGetProductQuery();

    function totalPrice() {
        return product.data.reduce((accumulator, item) => accumulator + (item.price * item.amount), 0);
    };

    function totalCount() {
        return product.data.reduce((accumulator, item) => accumulator + item.amount, 0);
    };

    function countByCategory(products, currentCategory) {
        let summ = 0;
        let amount = 0
        products && products.filter(item => {
            if ((item.category === currentCategory.name)) {
                summ += item.price * item.amount;
                amount += item.amount;
                return false;
            }
            return false;
        })
        return amount + ' шт- ' + summ + ' сум';
    };

    useEffect(() => {
        if (product.data) {
            setTotalPrice(totalPrice());
            setTotalCount(totalCount());
        };
    }, [product.data]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Наименование</th>
                                    <th>Количество</th>
                                    <th>Сумма</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Все товары</td>
                                    <td>{totalCountState && totalCountState}</td>
                                    <td>{totalPriceState && totalPriceState} сум</td>
                                </tr>
                                <tr align='center'>
                                    <th colSpan='5'>Товары по категории</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>№</th>
                                    <th>Категория</th>
                                    <th>Количество и сумма</th>
                                </tr>
                                {category.data && category.data.map((item, index) =>
                                    <tr key={index}>
                                        <td></td>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {
                                                countByCategory(product.data, item)
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Statistic