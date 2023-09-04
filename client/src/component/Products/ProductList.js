import React, { Suspense, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import CardBox from '../Card/CardBox';
import { checkSaveFavoriteList } from "../../services/slices/productsSlice";
import { useDispatch } from 'react-redux';

function ProductList({ products }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSaveFavoriteList());
  }, [dispatch]);

  return (
    <Col className="d-flex flex-wrap border mt-2 ">
      <Suspense fallback={<h1>Loading</h1>}>
        {products && products.map((item, index) =>
          <CardBox
            // favoriteFunc={addToFavorite}
            key={index}
            product={item}
          />
        )}
      </Suspense>
    </Col>
  )
}

export default ProductList;