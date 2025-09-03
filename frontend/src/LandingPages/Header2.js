import React, { useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './HeaderOne.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCRMState, useCRMDispatch } from '../CrmContext';
import DispatchContext from '../DispatchContext';

const Header2 = () => {
  const state = useCRMState();
  const dispatch = useCRMDispatch();
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'crmLogout' });
    appDispatch({ type: "logout" })
    navigate('/');
  };

  console.log(state.crmUser)

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.brand}>Asistente Virtual</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className='gap-3'>
            <Nav.Link as={Link} to="/#inicio">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/#servicios">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/#quien-soy">Quién Soy</Nav.Link>
            <Nav.Link as={Link} to="/#blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/#contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/#cart" className={styles.cartLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className={styles.cartCount}>0</span>
            </Nav.Link>
            {/* <Nav.Link href="/crm/login.html">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Nav.Link> */}
            {!state.crmLoggedIn ? (
              <Nav.Link
                as={Link}
                to="/crm/login"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span className={styles.userName}>{state.crmUser?.nombre}</span>
                  </>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/crm/perfil">
                  Mi Perfil
                </NavDropdown.Item>
                {state.crmUser?.isAdmin === 1 && (
                    <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/erp/">
                      CRM
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header2;
