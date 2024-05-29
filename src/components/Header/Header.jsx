import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, isAuthenticated, amIAdmin, amIDoctor } from "../../app/slices/userSlice";

import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const hasAcces =  useSelector(isAuthenticated)
  const isAdmin = useSelector(amIAdmin)
  const isDoctor = useSelector(amIDoctor)
  const dispatch = useDispatch();

  const logoutAction =()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <>
      <Navbar fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">
          <img
              src="../src/images/logoVA.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          
          <Nav className="me-auto">
            {hasAcces && (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
              {isAdmin && (<Nav.Link href="/all-users">Users</Nav.Link>)}
                <Nav.Link href="/characters">Doctores</Nav.Link>
                <Nav.Link href="/citas">Citas</Nav.Link> 
                <Button variant="primary" size="lg" onClick={()=> logoutAction()}>Log out</Button>
                </>
            )}
            {!hasAcces &&  (
              <>
               <Nav.Link href="/login">Login</Nav.Link>
               <Nav.Link href="/register">Sign Up</Nav.Link>
              </>

            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
