import { useEffect, useState } from 'react';
import { Image, Carousel, Container } from 'react-bootstrap';

function ProductCarousel() {
  const [images, setImages] = useState([]);
  function getImg() {
    let imgs = [];
    for (let i = 1; i < 11; i++) {
      imgs.push('./' + i + '.jpg');
    }    
    return imgs;
  }

  useEffect(() => {
    setImages(getImg())
  }, []);

  return (
    <Container fluid className='my-2'>
      <Carousel>
        {images.map((item, index) => (
          <Carousel.Item key={index}>
            {/* <div
              className='justify-content-center d-flex'
            > */}            
            <Image src={item}
              thumbnail
              fluid
            //  text="First slide"
            />
            {/* </div> */}
          </Carousel.Item>
        ))
        }
      </Carousel>
    </Container >

  );
}

export default ProductCarousel;