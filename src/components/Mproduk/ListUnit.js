import React, { useState } from 'react';
import {
  Card, Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
import Box from '../../assets/image/icon/box.svg';
import Chart from '../../assets/image/icon/chart.svg';
import Calender from '../../assets/image/icon/calender.svg';
import Edit from '../../assets/image/icon/edit.svg';
import Delete from '../../assets/image/icon/delete.svg';

export default function ListProduct() {
  const list = [1, 2, 3, 4, 5, 6];
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleForm = () => {

  };
  const namaProduct = '';
  const handleName = () => {

  };
  return (
    <>
      <Row className="mt-5">
        {list.map((e) => (
          <Col md="12" className="mb-5 px-4">
            <Card>
              <Card.Body>
                <h3 className="unit__subtitle"> Koding Departement </h3>
                <h2 className="unit__title">Learn Python Programming Masterclass</h2>
                <div className="d-flex unit__icon-detail mt-2">
                  <div className="unit__icon-list">
                    {' '}
                    <img src={Chart} alt="" />
                    <div>64 Unit</div>
                  </div>
                  <div className="unit__icon-list">
                    {' '}
                    <img src={Box} alt="" />
                    <div>WEB01</div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <div className="edit_product"><img src={Edit} alt="" /></div>
                  <div className="edit_product"><img src={Delete} alt="" /></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>
    
    </>
  );
}
