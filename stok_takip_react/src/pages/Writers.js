import React , {useEffect, useState} from "react"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Menu from "./Menu.js"
import NotLogined from "./not_logined";

function MyVerticallyCenteredModal(props) {

    const [writerName, setWriterName] = useState("");

    const handleWriterChange = e => {
        setWriterName(e.target.value);
    }

    const handleAddWriter = e => {

    fetch("http://127.0.0.1:8000/add_new_writer/", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        body: JSON.stringify({name: writerName})
        })
        .then(res => res.json())
        .then(json => {
            if(json === "Success") {
                props.onHide();
                props.f();
            }
        }

        )

    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Yazar Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Eklemek istediğiniz yazarın adını giriniz.</h4>
        <input
                  onChange = {handleWriterChange}
                  value = {writerName}
                type="email"
                className="form-control mt-1"
              />
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleAddWriter}> Ekle </Button>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModalEdit(props) {

    const [writerName, setWriterName] = useState("");

    const handleWriterChange = e => {
        setWriterName(e.target.value);
    }

    const handleAddWriter = e => {

    fetch("http://127.0.0.1:8000/edit_writer/", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        body: JSON.stringify({name: writerName, id: props.id})
        })
        .then(res => res.json())
        .then(json => {
            if(json === "Success") {
                props.onHide();
                props.f();
            }
        }

        )

    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Yazar Düzenle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Düzenlemek istediğiniz yazarın adını giriniz.</h4>
        <input
                  onChange = {handleWriterChange}
                  value = {writerName}
                type="email"
                className="form-control mt-1"
              />
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleAddWriter}> Düzenle </Button>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModalDelete(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Hata!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Bu yazarı silemiyorsunuz. Yazarın sitemize kayıtlı bir kitabı olabilir.</h4>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Writers() {

    const [writers, setWriters] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [fetchTrue, setFetch] = useState(false);
    const [id, setID] = useState(0);
    const [modal2Show, setModal2Show] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    const handleEdit = (id, e) => {
        setID(id);
        setModal2Show(true);
    }

    let edit_buttons;
    let add_button;



    const handleDelete = (id, e) => {
            fetch("http://127.0.0.1:8000/delete_writer/", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        body: JSON.stringify({id: id})
        })
        .then(res => res.json())
        .then(json => {
            if(json === "Success") {

                setFetch(true);
            }
            else {
                setModalDeleteShow(true);
            }
        }

        )

    }

    useEffect(() => {
    fetch("http://127.0.0.1:8000/get_all_writers/", {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        })
        .then(res => res.json())
        .then(
            (result) => {
                setFetch(false);
                setWriters(result);
            }
        )
    }, [fetchTrue])


    let arr = writers.data
    if(arr === undefined) arr = []
        if(localStorage.getItem('is_admin') === "true") {
        edit_buttons =
            arr.map((w) => (
          <tr>
          <td> {w.name}</td>
              <td> <Button variant={"primary"} onClick={(e) => handleEdit(w.id, e)}> Düzenle </Button> </td>
              <td> <Button variant={"danger"} onClick={(event) => handleDelete(w.id, event)}> Sil </Button> </td>
              </tr>))


        add_button = <> <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={() => setModalShow(true)}>

        Yazar Ekle
      </Button>
                  </div></>;
    }

        else {
            edit_buttons = arr.map((w) => (
          <tr>
          <td> {w.name}</td>
              </tr>))
        }

        if(!localStorage.getItem('token')) {
            return ( <NotLogined/>)
        }
        return (
            <div>

            <Menu/>
                <h1> Yazarlar </h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Yazar Adı</th>
        </tr>
        {edit_buttons}
      </thead>
      <tbody>


      </tbody>
    </Table>
                {add_button}


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        f={() => setFetch(true)}
      />

                <MyVerticallyCenteredModalEdit
        show={modal2Show}
        onHide={() => setModal2Show(false)}
        f={() => setFetch(true)}
        id={id}
      />

                <MyVerticallyCenteredModalDelete
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
                </div>
    )
}

export default Writers;