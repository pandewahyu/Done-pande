import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';

export default function Filter() {
  return (
    <Container className="d-flex justify-content-center">
      <div className="">
        <Button variant="primary" className="filter__button filter__button-active ">Primary</Button>
        <Button variant="primary" className="filter__button">Primary</Button>
        <Button variant="primary" className="filter__button">Primary</Button>
        <Button variant="primary" className="filter__button">Primary</Button>
        <Button variant="primary" className="filter__button">Primary</Button>
        <Button variant="primary" className="filter__button">Primary</Button>
      </div>
    </Container>
  );
}
