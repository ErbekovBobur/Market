import React from 'react'
import ProductList from '../component/Products/ProductList';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

function FavoritePage() {
  const favorite = useSelector(state => state.product.favoriteList);
  console.log(favorite.length);

  if (!favorite.length > 0) {
    return (
      <>
        <Row>
          <Col className='d-grid fs-3 justify-content-center'>
            Нет выбранных товаров
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Container >
        {/* <progress value={null} /> */}
        <Row >
          <ProductList products={favorite} />
        </Row>
      </Container >
    </>
  )
}

export default FavoritePage;