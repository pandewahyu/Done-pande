import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { data } from "../assets/data/mockData";
import React, { useState } from "react";
import "../style/UM.css"
import { MdDelete, MdOutlineUpdate } from 'react-icons/md'
import DataTable from "react-data-table-component";

//fungsi export.
function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            // eslint-disable-next-line no-plusplus
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
}
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}
const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;



// paginasi
const paginationComponentOptions = {
    rowsPerPageText: 'Per Page',
    rangeSeparatorText: 'Dari',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',

};
const customStyles = {
    rows: {
        style: {
             // override the row height
             borderBottomStyle:'none !important',
            borderBottomColor:'none'

        },
    },
    head:{
        style:{
            backgroundColor: '#F2ad00',
        }
    }
};

//Crud, select, search
export const Filtering = () => {
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "full name",
            sortable: true,
            selector: row => row.name,
            center: true,
        },
        {
            name: "email address",
            selector: row => row.email,
            sortable: true,
            center: true,
        },
        {
            name: "location",
            selector: row => row.location,
            sortable: true,
            center: true,
        },
        {
            name: "joined",
            selector: row => row.joined,
            sortable: true,
            center: true,

        },
        {
            name: "permissions",
            selector: row => row.permissions,
            sortable: true,
            center: true,
            conditionalCellStyles: [
                {
                    when: row => row.permissions === 'Employe',
                    style: {
                        borderRadius: '25px',
                        margin: '7px 5px 7px 5px',
                        backgroundColor: '#025E86',
                        color: 'white',
                    },
                },
                {
                    when: row => row.permissions === 'Admin',
                    style: {
                        borderRadius: '25px',
                        margin: '7px 5px 7px 5px',
                        backgroundColor: '#DC3545',
                        color: 'white',
                    },
                },
                {
                    when: row => row.permissions === 'Student',
                    style: {
                        margin: '7px 5px 7px 5px',
                        borderRadius: '25px',
                        backgroundColor: '#FFB800',
                        color: 'white',
                    },
                },
                {
                    when: row => row.permissions === 'Guest',
                    style: {
                        margin: '7px 5px 7px 5px',
                        borderRadius: '25px',
                        backgroundColor: '#9B9999',
                        color: 'white',
                    }
                },
            ]
        },
        {
            name: "edit",
            center: true,
            cell: row => (
                <div>
                    <Row>
                        <Col>
                            <MdDelete onClick={() => alert(row.id)} />
                        </Col>
                        <Col>

                            <MdOutlineUpdate onClick={() => alert(row.id)} />
                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    //modal edit
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //modal add
    const [buka, setBuka] = useState(false);
    const handleTutup = () => setBuka(false);
    const handleBuka = () => setBuka(true);

    //select row
    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);


    //filtering
    const [filterText, setFilterText] = React.useState('');
    const [filterE, setFilterE] = React.useState('');
    const [filterS, setFilterS] = React.useState('');

    const filterPerm = [...new Set(data.map((item) => item.permissions))];
    const filteredItems = data.filter(
        item => item.name.toLowerCase().includes(filterText.toLowerCase())
            && item.email.toLowerCase().includes(filterE.toLowerCase()) && item.permissions.includes(filterS),
    );

    //download csv {file}
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(selectedRows)} />, [selectedRows]);

    return (
        <div className="back mt-3">
            <div className="content">
                <input className="content1"
                    id="search"
                    type="text"
                    placeholder="Filter By Name"
                    aria-label="Search Input"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <select
                    onChange={(e) => setFilterS(e.target.value)}
                    className="content1"
                    aria-label="Filter user">
                    <option value="">Permissions ALL</option>
                    {filterPerm.map((item) => (
                        <option value={item}>{item}</option>
                 ))}
                </select>
                <input
                    className="content1"
                    id="search"
                    type="text"
                    placeholder="Filter By Email"
                    aria-label="Search Input"
                    value={filterE}
                    onChange={(e) => setFilterE(e.target.value)}
                />
                <span className="end"> {actionsMemo} <Button onClick={handleBuka}> + New User </Button></span>
                <Modal
                    show={buka}
                    onHide={handleTutup}
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
                                    <Form.Group className="mb-6" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>

                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Permissions</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="col-md-5 mx-auto">
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                            </div>
                           
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="border">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    center
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
                            <Row>
                                <Col>
                                <div className="hari"> Senin</div>
                                </Col>
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                                istirahat
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className="hari"> Selasa</div>
                                </Col>
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                                istirahat
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className="hari"> Rabu</div>
                                </Col>
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                                istirahat
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className="hari">Kamis</div>
                                </Col>
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                                istirahat
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className="hari">Jumat</div>
                                </Col>
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
                                </Col>
                                istirahat
                                <Col>
                                8
                                </Col>
                                sampai
                                <Col>
                                8
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

                <DataTable q
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
                    customStyles={customStyles}
                    fixedHeaderScrollHeight="760px"
                />
            </div>
        </div >
    );
};

export default Filtering;


