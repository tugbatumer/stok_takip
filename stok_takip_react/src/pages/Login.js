import React, { useState } from "react"
import { useNavigate} from "react-router-dom";
import Menu from "./Menu.js";

function Login(props) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const changeAuthMode = () => {
    navigate("../register", {replace: true});
  }

  const handleUserChange = e => {
    setUsername(e.target.value);
  }

   const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let dict = {username: username, password: password};
    fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dict)
    })
    .then(res => res.json())
        .then(json => {
          if (json.success === "success") {
            localStorage.setItem('token', json.token);
            localStorage.setItem('is_admin', json.admin);
              navigate("../", {replace: true});
          }
          else {
            console.log(json.error);
          }
        })
  }


    return (
        <>
        <Menu/>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Henüz üye değil misiniz?{" "}
              <span className="link-primary" style={{cursor: "pointer"}} onClick={changeAuthMode}>
                Üye olun.
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Kullanıcı Adı</label>
              <input
                  onChange = {handleUserChange}
                  value = {username}
                type="email"
                className="form-control mt-1"
                placeholder="Kullanıcı adınızı giriniz."
              />
            </div>
            <div className="form-group mt-3">
              <label>Şifre</label>
              <input
                  onChange = {handlePasswordChange}
                  value = {password}
                type="password"
                className="form-control mt-1"
                placeholder="Şifrenizi giriniz."
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Giriş Yap
              </button>
            </div>
          </div>
        </form>
      </div>
          </>
    )


}

export default Login;