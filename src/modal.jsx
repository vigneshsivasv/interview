import { createPortal } from "react-dom";
import styled from "styled-components";


const ModalWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    & .modal-content{
    min-width: 600px;
    min-height: 300px;  
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    span.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    }
`;


const Modal = ({ open, close }) => {
    return (
        createPortal(
            <ModalWrap isOpen={open} onClick={close}>
                <div className="modal-content"
                >
                    <span className="close" onClick={close}>&times;</span>
                    <p>Modal Content</p>
                </div>
            </ModalWrap>
            , document.getElementById('modal-id')
        )
    );
}

export default Modal;