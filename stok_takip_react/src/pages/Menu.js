import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'

function Menu() {

  let if_logined;

  const navigate = useNavigate();

  const  handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/logout", {replace: true});
  };


  if (localStorage.getItem('token')) {
    if_logined = <Nav.Link style={{color: "white"}} onClick={handleLogout}>Çıkış Yap</Nav.Link>
  }

  else {
    if_logined = <Nav>
            <Nav.Link href="/login">Giriş Yap</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Üye Ol
            </Nav.Link>
          </Nav>

  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">STOK TAKİP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={"/books"}> Kitaplar </Nav.Link>
            <Nav.Link href={"/writers"}> Yazarlar </Nav.Link>
          </Nav>
          {if_logined}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;