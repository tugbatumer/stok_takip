import React from "react"
import ReactDOM from "react-dom";

import Menu from "./Menu.js"
import {Link} from "react-router-dom";

function NotLogined() {
    return (
        <>
        <Menu/>

            <h1 style={{color: "red", marginTop: "25px", marginLeft: "10px"}}>  Kitaplar ve yazarlarla ilgili bilgileri görmek için lütfen giriş yapınız. </h1>


            </>
    )
}

export default NotLogined;