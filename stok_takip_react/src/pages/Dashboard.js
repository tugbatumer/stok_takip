import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom";

import Menu from "./Menu.js"
import {Link} from "react-router-dom";
import NotLogined from "./not_logined";

function Dashboard() {

    const [writerNumber, setWriterNumber] = useState(0)
    const [bookNumber, setBookNumber] = useState(0)
    useEffect(() => {
    fetch("http://127.0.0.1:8000/writer_number/", {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        })
        .then(res => res.json())
        .then(
            (result) => {

                setWriterNumber(result.number);
            }
        )
    }, [])

    useEffect(() => {
    fetch("http://127.0.0.1:8000/book_number/", {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': "Token " + localStorage.getItem('token')
      },
        })
        .then(res => res.json())
        .then(
            (result) => {

                console.log(result)

                setBookNumber(result.number);
            }
        )
    }, [])

    if(localStorage.getItem('token')) {
        return (
        <>
        <Menu/>
        <h1 style={{color: "red", marginTop: "25px", marginLeft: "10px"}}> Hoşgeldiniz </h1>

            <p style={{marginLeft: "10px"}}> Sistemde {bookNumber} kitap, {writerNumber} yazar bulunmaktadır.</p>

            </>
    )
    }
    else {
        return ( <NotLogined/>)
    }

}

export default Dashboard;