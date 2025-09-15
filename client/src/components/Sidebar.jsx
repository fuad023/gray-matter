import { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "./Sidebar_list"

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="link"
        className="d-lg-none p-0 m-0 border-0 shadow-none bg-transparent text-dark"
        onClick={handleShow}
      >
  <i className="bi bi-gear fs-3"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={true} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
