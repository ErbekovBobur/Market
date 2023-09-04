import { Container, Row } from 'react-bootstrap';
import ProductCarousel from "../component/Products/ProductCarousel";
import ProductList from "../component/Products/ProductList";
import { useGetCategoryQuery, useGetProductQuery } from '../services/api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toProductList } from '../services/slices/productsSlice';

function Main() {
  const { data, isError, isLoading } = useGetProductQuery();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const foundList = useSelector(state => state.product.foundList);  

  useEffect(() => {
    try {
      if (foundList && foundList.length > 0) {
        setProducts(foundList)
      } else {
        setProducts(data);
        dispatch(toProductList(data));
      }
    } catch (e) {
      console.log(e);
    }
  }, [foundList, data]);

  return (
    <>
      <Container >
        {/* <progress value={null} /> */}
        <Row>
          <ProductCarousel />
        </Row>
        <Row >
          <ProductList products={products} />
        </Row>
      </Container >
    </>
  );
}

export default Main;
