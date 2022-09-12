import React, { useState } from "react"
import {useNavigate} from "react-router-dom";
import Menu from "./Menu.js";

function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

  const changeAuthMode = () => {
    navigate("../login", {replace: true});
  }

   const handleUserChange = e => {
    setUsername(e.target.value);
  }

   const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

   const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let dict = {email: email, username: username, password: password};
    fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dict)
    })
    .then(res => res.json())
        .then(json => {
          if (json.success === "success") {
              navigate("../login", {replace: true});
          }
        })
  }


      return (
          <>
            <Menu/>

    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Zaten üye misiniz?{" "}
            <span className="link-primary" style={{cursor: "pointer"}} onClick={changeAuthMode}>
              Giriş yapın.
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Kullanıcı Adı</label>
            <input
                onChange = {handleUserChange}
                  value = {username}
              type="email"
              className="form-control mt-1"
              placeholder="Kullanıcı Adı"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
                onChange = {handleEmailChange}
                  value = {email}
              type="email"
              className="form-control mt-1"
              placeholder="Email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Şifre</label>
            <input
                onChange = {handlePasswordChange}
                  value = {password}
              type="password"
              className="form-control mt-1"
              placeholder="Şifre"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
              Üye Ol
            </button>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}

export default Register;