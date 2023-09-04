import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../services/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

function ModalOk({ title }) {
    const navigate = useNavigate();
    const showModal = useSelector(state => state.product.modal);
    const dispatch = useDispatch();

    function modal() {
        dispatch(setModal(false));
        title === '' && navigate(-1);
    }
    return (
        <>
            <Modal centered show={showModal} onHide={modal}>
                <Modal.Footer className='justify-content-between'>
                    {/* <Modal.Header> */}
                    <Modal.Body className='lead'>
                        {title && title || 'Сохранено'}
                    </Modal.Body>
                    {/* </Modal.Header> */}
                    <Button variant="success" onClick={modal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalOk;