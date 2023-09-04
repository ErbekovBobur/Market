import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Basket from './Basket';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Invoice from './Invoice';

function BasketToggle() {
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const basket = useSelector((state) => state.product.basket)

  useEffect(() => {
    setCounter(basket.reduce((accumulator, el) => accumulator + el.count, 0))
  }, [basket])

  return (
    <>
      <Button
        size="sm"
        variant="outline-info"
        onClick={handleShow}
        className="me-2 position-relative"
      >
        Корзина<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{counter}</span>
      </Button>
      <Offcanvas show={show}
        onHide={handleClose}
        placement='end'
      >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Basket />
          <Offcanvas.Title className='my-5'>
            <Row xs='auto' className='justify-content-center'>
              <Col>
                <Button onClick={()=>setShowModal(true)}>
                  Оформить заказ
                </Button>
              </Col>
            </Row>
          </Offcanvas.Title>
        </Offcanvas.Body>
      </Offcanvas>
      <Invoice prop={{showModal, setShowModal}}/>
    </>
  );
}
export default BasketToggle;