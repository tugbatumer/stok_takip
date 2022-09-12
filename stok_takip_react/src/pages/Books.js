import React , {useEffect, useState} from "react"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Menu from "./Menu.js"
import NotLogined from "./not_logined";

function MyVerticallyCenteredModal(props) {

    const [writerName, setWriterName] = useState("");
    const [bookName, setBookName] = useState("");

    const handleWriterChange = e => {
        setWriterName(e.target.value);
    }
    const handleBookChange = e => {
        setBookName(e.target.value);
    }
    const handleAddBook = e => {

    fetch("http://127.0.0.1:8000/add_new_book/", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        body: JSON.stringify({name: bookName, writer: writerName})
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
          Kitap Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Eklemek istediğiniz kitabın adını ve yazarını giriniz.</h4>
          <input
                  onChange = {handleBookChange}
                  value = {bookName}
                type="email"
                className="form-control mt-1"
              />
        <input
                  onChange = {handleWriterChange}
                  value = {writerName}
                type="email"
                className="form-control mt-1"
              />
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleAddBook}> Ekle </Button>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModalEdit(props) {

    const [writerName, setWriterName] = useState("");
    const [bookName, setBookName] = useState("");

    const handleWriterChange = e => {
        setWriterName(e.target.value);
    }
    const handleBookChange = e => {
        setBookName(e.target.value);
    }

    const handleAddBook = e => {

    fetch("http://127.0.0.1:8000/edit_book/", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        body: JSON.stringify({name: bookName, writer: writerName, id: props.id})
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
          Kitap Düzenle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Düzenlemek istediğiniz kitabın adını ve yazarını giriniz.</h4>
          <input
                  onChange = {handleBookChange}
                  value = {bookName}
                type="email"
                className="form-control mt-1"
              />
        <input
                  onChange = {handleWriterChange}
                  value = {writerName}
                type="email"
                className="form-control mt-1"
              />
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleAddBook}> Düzenle </Button>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Books() {

    const [books, setBooks] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [fetchTrue, setFetch] = useState(false);
    const [id, setID] = useState(0);
    const [modal2Show, setModal2Show] = useState(false);

    const handleEdit = (id, e) => {
        setID(id);
        setModal2Show(true);
    }

    let edit_buttons;
    let add_button;



    const handleDelete = (id, e) => {
            fetch("http://127.0.0.1:8000/delete_book/", {
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
        }

        )

    }

    useEffect(() => {
    fetch("http://127.0.0.1:8000/get_all_books/", {
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
                setBooks(result);
            }
        )
    }, [fetchTrue])


    let arr = books.data
    if(arr === undefined) arr = []
        if(localStorage.getItem('is_admin') === "true") {
        edit_buttons =
            arr.map((w) => (
          <tr>
          <td> {w.name}</td>
              <td> {w.writer}</td>
              <td> <Button variant={"primary"} onClick={(e) => handleEdit(w.id, e)}> Düzenle </Button> </td>
              <td> <Button variant={"danger"} onClick={(event) => handleDelete(w.id, event)}> Sil </Button> </td>
              </tr>))


        add_button = <> <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={() => setModalShow(true)}>

        Kitap Ekle
      </Button>
                  </div></>;
    }

        else {

            edit_buttons = arr.map((w) => (
          <tr>
          <td> {w.name}</td>
              <td> {w.writer}</td>
              </tr>))
        }

        if(!localStorage.getItem('token')) {
            return ( <NotLogined/>)
        }



        return (
            <div>

            <Menu/>
                <h1> Kitaplar </h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Kitap Adı</th>
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
                </div>
    )
}

export default Books;