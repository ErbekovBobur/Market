import React from 'react';
import style from '../../style/footer.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as FBLogo } from '../../img/fb.svg';
import { ReactComponent as InstaLogo } from '../../img/insta.svg';
import { ReactComponent as TGLogo } from '../../img/tg.svg';


function Footer() {
  return (
    <>
      <Container fluid className='bg-dark bg-gradient text-info fixed-bottom py-2' >
        <Row className='justify-content-center' >
          <Col md={1} className='d-grid' >
            <FBLogo className={style.logo} />
          </Col>
          <Col md={1} className='d-grid' >
            <InstaLogo className={style.logo} />
          </Col>
          <Col md={1} className='d-grid' >
            <TGLogo className={style.logo} />
          </Col>
        </Row>
        <Row className='justify-content-center' >
          <Col className='text-center cursor-pointer' >
            Terms of use *
            Privacy Policy
          </Col>
        </Row>
        <Row className='justify-content-center' >
          <Col className='text-center' >
            Copyright © 2023 Bobur.
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Footer;