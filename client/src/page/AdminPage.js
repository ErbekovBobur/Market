import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "../module/AdminNavbar";



function AdminPage() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return (
        <>
            <Container >
                <Row className='position-fixed w-100 bg-gradient bg-dark' style={{ zIndex: 1 }}>
                    <Col>
                        <AdminNavbar />
                    </Col>
                    {/* <Col>
                    </Col> */}
                </Row>
                <Row className="mt-5 pt-2">
                    <Col>
                        {isAdmin ? <Outlet /> : <h2 className="text-center mt-5">Вы не авторизовались как Адмиристратор</h2>}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminPage;