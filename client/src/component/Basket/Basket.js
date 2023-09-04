import React, { useEffect, useState } from 'react';
import { Col, Row, Button, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, emptyBasket, delProduct } from "../../services/slices/productsSlice";
import logo from '../../img/delete.ico';
import { ReactComponent as Logo } from '../../img/trash3.svg';


function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.product.basket)  
  const [allSumm, setAllSumm] = useState(null);
  
  function incrementProd(e) {
    dispatch(increment(Number(e.target.id)))
  };

  function decrementProd(e) {
    dispatch(decrement(Number(e.target.id)))
  };

  function delProd(e) {
    dispatch(delProduct(Number(e.currentTarget.id)))
  };
  useEffect(() => {
    setAllSumm(basket.reduce((accumulator, el) => accumulator + (el.price * el.count), 0))
  }, [basket]);
  return (
    <>
      <Col className="p-2 rounded border-primary bg-body">
        <Row className="flex-nowrap align-items-center" >
          <Col >
            <h1 className="text-danger">
              Корзина
            </h1>
          </Col>
          <Col xs={2}>
            <Button
              onClick={() => dispatch(emptyBasket())}
              title="Очистить корзину"
              variant="danger"
              size="sm" >
              <Logo />
            </Button>
          </Col>
        </Row>
        <h4 className="p-2 border rounded text-bg-light">Всего: {allSumm} сум</h4>
        <ListGroup >
          {basket.length > 0 ? basket.map((el, index) =>
            <ListGroup.Item key={index} className='bg-light'>
              <Row className="flex-nowrap align-items-center">
                <Col xs={6} md={7} className="text-truncate">
                  <b >{index + 1}. {el.name}</b>:
                </Col>
                <Col xs={5} md={4} className="p-0 mx-auto">
                  <Button onClick={decrementProd} id={el.product_id} className="mx-1" size="sm" variant="danger" >
                    -
                  </Button>
                  <Button id={el.product_id} type="text" variant='dark' disabled >
                    {el.count}
                  </Button>
                  <Button id={el.product_id} onClick={incrementProd} className="mx-1" size="sm" variant="success" >
                    +
                  </Button>
                </Col>
                <Col xs={1} className="d-flex justify-content-center">
                  <Button onClick={delProd} id={el.product_id} size="sm" variant="outline-light" title="Удалить товар">
                    <Image width={20} src={logo} rounded />
                  </Button>
                </Col>
                {/* <Col>
                      <AiFillDelete />
                    </Col> */}
              </Row>
              <Row >
                <Col >
                  <i>
                    {el.count * el.price} сум
                  </i>
                </Col>
              </Row>
            </ListGroup.Item>
          ) : <p className='text-center'>Корзина пуста</p>}
        </ListGroup>
      </Col>
    </>
  )
}

export default Basket