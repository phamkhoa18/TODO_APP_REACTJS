import { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import React from 'react'

export default function CustomModal(props) {

    const [show, setShow] = useState(false);
    const [item , setItem] = useState({});

    const handleClose = () => {
        setItem({}) ;
        setShow(false);
        props.parentCallback();
    };

    useEffect(() => {
        console.log(props.dataShow);
        if(Object.getOwnPropertyNames(props.dataShow).length !== 0){
            setShow(true) ;
            setItem(props.dataShow);
        }
      }, [props.dataShow]);

      

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{item.des}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
