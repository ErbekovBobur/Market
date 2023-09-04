import { Container, Row } from 'react-bootstrap'
import Header from "../module/Header";
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer/Footer';

function Template() {
    return (
        <>
            <Container fluid >
                <Row
                className='sticky-md-top'
                >
                    <Header />
                </Row>
                <Row className='mb-5 pb-5'>
                    <Outlet />
                </Row>
                <Row >
                    <Footer />
                </Row>
            </Container>
        </>
    );
}

export default Template;