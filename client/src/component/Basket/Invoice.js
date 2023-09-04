import React, { useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Invoice({ prop }) {
    const basket = useSelector((state) => state.product.basket)

    function total() {
        return basket.reduce((accumulator, el) => accumulator + (el.price * el.count), 0);
    }

    return (
        <>
            <Modal size='md' show={prop.showModal} onHide={prop.setShowModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Счёт к оплате</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card
                        // bg={variant.toLowerCase()}
                        // key={variant}
                        // text='dark'
                        // 'light'
                        //  'dark'  'white'
                        style={{ width: '20rem' }}
                        className="mb-2 text-dark aling-items-center text-center mx-auto font-monospace"
                    >
                        <Card.Body >
                            <Card.Text >
                                МОЙ МАГАЗИН
                            </Card.Text>
                            <Card.Text >
                                ********************************<br />
                                г.Ташкент ул.Бабура, д-1а<br />
                                тел.+998 (00) 000-00-00<br />
                                ********************************<br />
                                <span className='d-flex justify-content-between px-2'>
                                    <span>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                    <span>
                                        {new Date().toLocaleTimeString("ru-RU")}
                                    </span>
                                </span>
                                <span className='d-flex justify-content-between px-2'>
                                    <span>
                                        Кассир:
                                    </span>
                                    <span>
                                        Руководитель
                                    </span>
                                </span>
                                --------------------------------
                            </Card.Text>
                            <Card.Text>
                                {basket && basket.map((item, index) =>
                                    <span key={index} className='d-flex justify-content-between px-2 w-100'>
                                        <span className='text-truncate text-truncate text-start me-2'>
                                            {item.name}
                                        </span>
                                        <span>
                                            {item.count * item.price}
                                        </span>
                                    </span>
                                )}
                                --------------------------------
                            </Card.Text>
                            <Card.Text >
                                <span className='d-flex justify-content-between px-2 w-100'>
                                    <span >
                                        Всего
                                    </span>
                                    <span>
                                        {basket && total()}
                                    </span>
                                </span>
                                <span className='d-flex justify-content-between px-2 w-100'>
                                    <span >
                                        Скидки
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </span>
                                <span className='d-flex justify-content-between px-2 w-100 fw-bold fs-6'>
                                    <span >
                                        ИТОГО
                                    </span>
                                    <span>
                                        {basket && total()}
                                    </span>
                                </span>
                            </Card.Text>
                            <span>
                                Товарный чек
                            </span>
                            <Card.Text className='barcoode'>
                                {/* <span className='barcoode'> */}
                                1234567890
                                {/* </span> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button onClick={()=>prop.setShowModal(false)}>
                        Спасибо
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Invoice;