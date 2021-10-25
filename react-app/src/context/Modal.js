
import React, { useContext, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {

    const theme = useSelector(state => state.theme)

    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <div className='app'>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </div>
    );
};

export function Modal({ onClose, children, isWatchList }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose} />
            <div id={'modal-content'}>
                {children}
            </div>
        </div>,
        modalNode
    );
};
