import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { delFromFavoriteList, toBasket, toFavoriteList, toProductList } from '../../services/slices/productsSlice';
import Heart from "react-heart";
import style from "../../style/topBox.module.css";
import Rate from "../../UI/rate";
import { useGetCurrentProductQuery } from '../../services/api/productApi';

function ProductItem() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetCurrentProductQuery(+id);
  const [currentProduct, setCurrentProduct] = useState({});
  const [activeHeart, setActiveHeart] = useState(false);
  const favoriteList = useSelector(state => state.product.favoriteList);
  const loggedIn = useSelector(state => state.auth.loggedIn);

  function addToFavorite(state, id) {
    if (state) {
      dispatch(delFromFavoriteList(id));
      setActiveHeart(false);
      return;
    } else {
      dispatch(toFavoriteList({ id, loggedIn }));
      setActiveHeart(true);
      return;
    }
  };

  function checkFavoriteList() {
    favoriteList.filter((item) => {
      if (item.product_id === Number(id)) {
        setActiveHeart(true);
        return false;
      }
      return false;
    })
  };

  useEffect(() => {
    checkFavoriteList();
  });

  function tobasket() {
    dispatch(toBasket(currentProduct));
  };

  useEffect(() => {
    if (data) {
      try {
        dispatch(toProductList(data));
        setCurrentProduct({ ...data[0] });
      } catch (err) {
        console.log(err);
      }
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading</div>
  };

  if (isError) {
    return <div>No products </div>
  };

  return (
    <>
      <Container className='bg-white'>
        <Row lg='auto' className='justify-content-center'>
          <Col xl={8} className='border'>
            <Row className='justify-content-center'>
              <Col md={7}>
                <h1 className='fw-bold'>{currentProduct.name}</h1>
              </Col>
            </Row>
            <Row className='justify-content-around'>
              <Col md={5}>
                <Image src={currentProduct.url} fluid rounded />
              </Col>
              <Col md={5} className='bg-light d-grid'>
                <Col>
                  <p className='fs-4 fw-bold'> Характеристика товара: </p>
                </Col>
                <Col className='align-items-center'>
                  {currentProduct.description}
                </Col>
                <Col >
                  <Row className='align-items-center h-100 border'>
                    <p>Оценка товара</p>
                    <Col md={5}>
                      <Rate product={currentProduct} />
                    </Col >
                    <Col md={6} className='bg-secondary text-warning text-center p-1 rounded'>
                      средная: {currentProduct.rate}  всего: {currentProduct.rateamount}
                    </Col>
                  </Row>
                </Col>
                <Col >
                  <Row className='gap-1 border p-1 '>
                    <Col className='d-grid'>
                      <Button onClick={tobasket}>В корзину </Button>
                    </Col>
                    <Col className='d-grid'>
                      <Button variant="success"
                        onClick={() => addToFavorite(activeHeart, Number(id))}
                        className="position-relative" >
                        В избранное
                        <div className={style.heart} >
                          <Heart inactiveColor='#198754' isActive={activeHeart} onClick={() => { }} />
                        </div>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default ProductItem;
