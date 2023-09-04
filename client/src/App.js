// import Box from "./component/StoreBox/ProductBox";
// import { useDispatch } from 'react-redux';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Suspense, useEffect, useState } from "react";
// import { toProductList, delFromFavoriteList, toFavoriteList } from "./services/products/productsSlice";
// import { useGetProductQuery } from "./services/productApi/productApi";
// import ProductCarousel from "./module/ProductCarousel";

// function App() {
//   const { data, isError, isLoading } = useGetProductQuery();
//   const dispatch = useDispatch();
//   const [products, setProducts] = useState([]);  

//   async function getProducts(data) {
//     try {
//       setProducts(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   function addToFavorite(state, func, id) {
//     if (state) {
//       dispatch(delFromFavoriteList(id));
//       func(!state);
//     } else {
//       dispatch(toFavoriteList(id));
//       func(!state);
//     }
//   };

//   useEffect(() => {
//     getProducts(data);
//     dispatch(toProductList(data));
//   }, [data]);


//   if (isLoading) {
//     return <div>Loading</div>
//   };

//   if (isError) {
//     return <div>No products </div>
//   };


//   return (
//     <>
//       <Container >
//         {/* <progress value={null} /> */}
//         <Row>
//           <ProductCarousel />
//         </Row>
//         <Row >
//           <Col className="d-flex flex-wrap border mt-2">
//             <Suspense fallback={<h1>Loading</h1>}>
//               {products && products.map((el, index) =>
//                 <Box
//                   favoriteFunc={addToFavorite}
//                   key={index}
//                   product={el}
//                 />
//               )}
//             </Suspense>
//           </Col>
//         </Row>
//       </Container >
//     </>
//   );
// }

// export default App;
