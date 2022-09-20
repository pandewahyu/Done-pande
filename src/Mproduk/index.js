import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
import { Button, Row, Col, Modal, Form,Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Box from '../assets/image/icon/box.svg';
import Chart from '../assets/image/icon/chart.svg';
import Calender from '../assets/image/icon/calender.svg';
import Edit from "../assets/image/icon/edit.svg";
import Delete from "../assets/image/icon/delete.svg";
import axios from "axios";

const recommendations = [{
  id: 1,
  kategori: 'Web Programing', 
}, {
  id: 2,
  kategori: 'Mobile App',
}, {
  id: 3,
  kategori: 'Robotic',
},
{
  id: 4,
  kategori: 'Game Programing',
},
{
  id: 5,
  kategori: 'App Programing',
}
]

const Search = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category_id: "1",
    code_product: "",
    description: "",
    price: "",
    days_period: "",
  });

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/products", { withCredentials: "true" })
        .then((response) => {
          setData(response.data);
          console.log(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    //const getProductcategories = async () => {
    //  setIsLoading(true);
    // axios.get("http://localhost:3000/product-categories", { withCredentials: "true" })
    //  .then((response) => {
    //  setData(response.data);
    //   console.log(data);
    // setIsLoading(false);
    //  })
    // .catch(error => {
    //   console.log(error.response);
    // });
    //  };
    getProductunit();
    getProduct();
    // getProductcategories();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [id, setId] = useState("");
  //const [category_id, setCategoriproduk] = useState("");
  const [codeproduct, setCodeProduct] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [days_period, setDaysPeriod] = useState("");
  const addProduct = async (id) => {
    axios.post("http://localhost:3000/products", {
      //category_id:category_id,
      code_product: code_product,
      name: name,
      description: description,
      price: price,
      days_period: days_period
    }, { withCredentials: 'true' })
      .then(() => {
        console.log('mau');
      })
  };

  console.log(data);
  const [hapus, setHapus] = useState(false);
  const handleHapus = (id) => {
    axios.get("http://localhost:3000/products/" + id, { withCredentials: 'true' })
      .then((response) => {
        setId(response.data.id);
        setCodeProduct(response.data.code_product);
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setDaysPeriod(response.data.days_period);
        setHapus(true);
      });
  };
  const deleteData = (id) => {
    axios.delete("http://localhost:3000/products/" + id, { withCredentials: 'true' })
      .then((response) => {
        getProduct();
        setId('');
        setCodeProduct('');
        setName('');
        setDescription('');
        setPrice('');
        setDaysPeriod('');
        setHapus(false);
      }).catch((error) => {
        setError(error.response.data);
    });;
  };
  const handleClose = () => {
    setId('');
    setCategoriproduk('');
    setCodeProduct('');
    setName('');
    setDescription('');
    setPrice('');
    setDaysPeriod('');
    setHapus(false);
  };

  const [filterText, setFilterText] = React.useState('');
  const filteredItems = data.filter(
    item => item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const Loading = () => {
    return (
      <div className="mx-auto">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  };

  const ShowProducts = () => {
    return (
      <Row className="mt-5">
        {data.map((data, index) => (
          <Col md="4" className="mb-5 px-4">
            <Card key={`data-${index}`}>
              <Card.Body>
                <h3 className='product__subtitle'> Koding Departement </h3>
                <h2 className='product__title'>{data.name}</h2>
                <p className='product__description'>
                  {data.description}
                </p>
                <div className="flex">
                  <span className='product__price-new'>{data.price}</span>
                </div>
                <div className="d-flex justify-content-between product__icon-detail mt-2">


                  <div className='product__icon-list'> <img src={Calender} alt="" /><div >{data.days_period}</div></div>
                  <Link to='/Listunit'>
                    <div className='product__icon-list'> <img src={Chart} alt="" /><div >Unit</div></div>
                  </Link>



                  <div className='product__icon-list'> <img src={Box} alt="" /><div >{data.code_product}</div></div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <div className="edit_product"><img src={Edit} alt="" /></div>
                  <div className="edit_product" ><img src={Delete} alt="" onClick={() => handleHapus(data.id)} /></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const [datas, setDatas] = useState([]);

  const getProductunit = async () => {
    axios.get("http://localhost:3000/product-units", { withCredentials: "true" })
      .then((response) => {
        setDatas(response.data);
        console.log(datas);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  console.log(datas);
  return (
    <div>

<Container className="d-flex justify-content-center">
<div className="d-flex flex-row justify-content-around mb-3 mt-3">
          {
      recommendations.map((recommendations, index) => (
        <Button variant="primary" className="filter__button filter__button-active ">{recommendations.kategori}</Button>
        ))
      }
      </div>
    </Container>

    
      <Button
        variant="primary"
        className="create__button"
        onClick={() => setOpenModal(openModal ? false : true)}
      >
        + New Products
      </Button>
      <Modal
        show={openModal}
        onHide={() => setOpenModal(openModal ? false : true)}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProduct}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name Unit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama Produk"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Col>
                    <Form.Label>Produk Catagory</Form.Label>
                    <Form.Select aria-label="Default select coba" required onChange={(e) => setProdukid(e.target.value)}>
                      <option value="">Select Produk ID</option>

                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Kode Product</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kode Produk"
                    name="code_product"
                    onChange={(e) => setCodeProduct(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Harga"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Days Periode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Days Periode"
                    name="days_period"
                    onChange={(e) => setDaysPeriod(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="col-md-8 mx-auto">
              <Button bsPrefix="addButton" variant="primary" type="submit">
                Save
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>


      <Modal //delete
        show={hapus}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <img className="text-center d-flex justify-content-center mx-auto" style={{ alignItems: 'center', width: '100px', height: '100px' }}
            src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="drive" />
          <Row>
            <h2 className="text-center">Are You Sure?</h2>
          </Row>
          <Row className="pb-3">
            <Col className="text-center">
              <h4>Do you want to delete "{name}"?</h4>
            </Col>
          </Row>
          {/* <Row>
                                        <Col className="text-center mb-4">
                                            <h2>email: {item.email}</h2>
                                        </Col>
                                    </Row> */}
          <Row className=" mx-auto">
            <Button className="red" key={id} variant="danger" type="submit" onClick={() => deleteData(id)}>
              Delete
            </Button>
          </Row>

        </Modal.Body>
      </Modal>



      <div className="justify-content-center m-3">

      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
        {isLoading === true ? <Loading /> : <ShowProducts />}
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
    </div>
  )
};

export default Search;