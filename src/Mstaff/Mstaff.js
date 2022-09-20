import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";


//style
const customStyles = {
    rows: {
        style: {
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            textTransform: "capitalize"
        },
        input: {
            style: {
                filter: 'invert(10%) hue-rotate(10deg) brightness(1) !important'
            }
        }
    },

    headCells: {
        style: {
            backgroundColor: "#FFF",
            color: "black",
            borderTopStyle: 'outset',
            borderTopWidth: '1px',
        },
    },

};

// paginasi
const paginationComponentOptions = {
    rowsPerPageText: 'Rows for Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',

};

//Crud, select, search
export const Mstaff = () => {
    const [data, setData] = useState([]);
    //menampilkan employee
    useEffect(() => {
          getEmployee();
    }, [])

    const getEmployee = async () => {
        axios.get("http://localhost:3000/employee",{withCredentials:'true'})
          .then((response) => {
            setData(response.data);
            console.log(data)
          })
      };
    //menambah employee
    const addEmployee = async () => {
        axios.post("http://localhost:3000/employee",{
            name_employee,
            address,
            phone,
            gender,
            department,
            user_id
        },{withCredentials:'true'}).then(() => {
            console.log();
            getEmployee();
          });
         
    };

    //filtering
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = data.filter(
        item => item.name_employee.toLowerCase().includes(filterText.toLowerCase())
           
    );
   
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Name",
            sortable: true,
            selector: row => row.name_employee,
            center: true,
        },
        {
            name: "phone number",
            selector: row => row.phone,
            sortable: true,
            center: true,
        },
        {
            name: "department",
            selector: row => row.department,
            sortable: true,
            center: true,

            style: {
                borderRadius: '25px',
                margin: '7px 5px 7px 5px',
                backgroundColor: '#DC3545',
                color: 'white',
            },
        },
        {
            name: "edit",
            center: true,
            cell: row => (
                <div>
                    <Row>
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faEdit} onClick={() => handleShow(row.id)} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faEdit} onClick={() => handleEdit(row.id)} />
                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    //modal edit
    const [tampil, setTampil] = useState(false);
    const handleTtp = () => setTampil(false);
    const handleEdit = () => setTampil(true);

    //modal jadwal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //modal add
    const [buka, setBuka] = useState(false);
    const handleTutup = () => setBuka(false);
    const handleBuka = () => setBuka(true);
    //add employee
    const [name_employee, setNameEmployee] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('');
    const [user_id, setUserid] = useState('');
    const handleAddress = e => {
        setAddress(e.target.value)
    };
    const handleUserid = e => {
        setUserid(e.target.value)
    };
    const handleDepartment = e => {
        setDepartment(e.target.value)
    };
    const handleGender = e => {
        setGender(e.target.value)
    };
    const handlePhone = e => {
        setPhone(e.target.value)
    };
    const handleName = e => {
        setNameEmployee(e.target.value)
    };

    //select row
    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    //jadwal
    const [senin, setSenin] = React.useState('');
    const [aSenin, setaSenin] = React.useState('');
    const [selasa, setSelasa] = React.useState('');
    const [rabu, setRabu] = React.useState('');
    const [kamis, setKamis] = React.useState('');
    const [jumat, setJumat] = React.useState('');
    const [sabtu, setSabtu] = React.useState('');
    const [istirahat, setIstirahat] = React.useState('');
    var travelTime = moment(setIstirahat).add({ minutes: 60 });

    return (
        <div className="back mt-3">
            <div className="content d-flex mb-4 ">

                <h5 className="TextU pt-1">User List</h5>
                <Button style={{ marginRight: "30px", backgroundColor: '#233EAE', height: "37px", width: "135px", borderRadius: "50px" }}
                    onClick={handleBuka}> ADD NEW   +</Button>
                <input className="text-center"
                    style={{ color: "white", background: "#233EAE", borderRadius: "50px", marginBottom: "20px", height: "37px", width: "135px" }}
                    id="search"
                    type="text"
                    placeholder=" 
                        Search ..."
                    aria-label="Search Input"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />

                <Modal
                    show={buka}
                    onHide={handleTutup}
                    backdrop="static"
                    size="lg"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onClick={addEmployee}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Full Name" onChange={handleName} value={name_employee} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="address" onChange={handleAddress} value={address}/>
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control type="text" placeholder="Gender" onChange={handleGender} value={gender}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Phone Number" onChange={handlePhone} value={phone}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control type="text" placeholder="Gender" onChange={handleDepartment} value={department}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                   <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>user_id</Form.Label>
                                        <Form.Control type="text" placeholder="Gender" onChange={handleUserid} value={user_id}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="col-md-8 mx-auto">
                                <Button bsPrefix="addButton" variant="primary" type="submit" >
                                    Save
                                </Button>
                            </Row>

                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={tampil}
                    onHide={handleTtp}
                    backdrop="static"
                    size="lg"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Full Name" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control type="text" placeholder="Skill" />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control type="text" placeholder="Gender" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Phone Number" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="col-md-8 mx-auto">
                                <Button bsPrefix="addButton" variant="primary" type="submit" >
                                    Save
                                </Button>
                            </Row>

                        </Form>
                    </Modal.Body>
                </Modal>

            </div>
            <div >
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Row>
                            <Col>
                                <img src="..." className="img" alt="image" />
                            </Col>
                            <Col className="nama">
                                <div>YUNI</div>
                                <div>Team IT</div>
                            </Col>
                            <Col className="nama">
                                <div> Backend Developer</div>
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body className="Mbody">
                        <div >
                            <Form>
                                <Row>
                                    <Col>
                                        <div className="hari"> Senin</div>
                                    </Col>
                                    <Col className="">
                                        <input type="time"
                                            className="inputJam"
                                            id="time"
                                            value={senin}
                                            placeholder="Time"
                                            onChange={(e) => setSenin(e.target.value)}
                                        />
                                    </Col>
                                    sampai
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            id="time"
                                            value={aSenin}
                                            placeholder="Time"
                                            onChange={(e) => setaSenin(e.target.value)}
                                        />
                                    </Col>
                                    istirahat
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            value={istirahat}
                                            placeholder="Time"
                                            onChange={(e) => setIstirahat(e.target.value)}
                                            id="startTime" />
                                    </Col>
                                    sampai
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            value={travelTime}
                                            placeholder="Time"
                                            onChange={(e) => setIstirahat(e.target.value)}
                                            id="startTime" />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="hari"> Senin</div>
                                    </Col>
                                    <Col className="">
                                        <input type="time"
                                            className="inputJam"
                                            id="time"
                                            value={senin}
                                            placeholder="Time"
                                            onChange={(e) => setSenin(e.target.value)}
                                        />
                                    </Col>
                                    sampai
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            id="time"
                                            value={aSenin}
                                            placeholder="Time"
                                            onChange={(e) => setaSenin(e.target.value)}
                                        />
                                    </Col>
                                    istirahat
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            value={istirahat}
                                            placeholder="Time"
                                            onChange={(e) => setIstirahat(e.target.value)}
                                            id="startTime" />
                                    </Col>
                                    sampai
                                    <Col>
                                        <input type="time"
                                            className="inputJam"
                                            value={travelTime}
                                            placeholder="Time"
                                            onChange={(e) => setIstirahat(e.target.value)}
                                            id="startTime" />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="hari"> Sabtu</div>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="hari"> Minggu</div>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="mt-2 end">
                            <span>
                                <Button variant="secondary" onClick={handleClose}>
                                    Back
                                </Button>
                            </span>
                            <span>
                                <Button variant="primary">Save</Button>
                            </span>
                        </div>
                    </Modal.Body>
                </Modal>

                <DataTable
                    className="table-staff"
                    title="User"
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader
                    highlightOnHover
                    pointerOnHover
                    selectableRows
                    responsive
                    onSelectedRowsChange={handleRowSelected}
                    noHeader
                    fixedHeaderScrollHeight="760px"
                    customStyles={customStyles}
                    keyField
                />
            </div>
        </div >
    );
};

export default Mstaff;


