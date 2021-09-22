import { Fragment } from "react";
import reactDom from "react-dom";
import ReactDOM from 'react-dom';

import classes from './Modal.module.css'

const Backdrop = (props) =>{
    return <div className={classes.backdrop}/>
}

const ModalOverLay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays')



// ! speak to carlos on the CreatePorta portal thing again.  i know it has something to do with portalElment above
const Modal = (props) => {
    return (
        <Fragment>
        
            {ReactDOM.createPortal(<Backdrop/>,portalElement)}
            {ReactDOM.createPortal(
                <ModalOverLay>{props.children}</ModalOverLay>,
                portalElement
            )}
        </Fragment>
    )
}

export default Modal