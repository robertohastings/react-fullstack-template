import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import Page from '../../Page'
import Menu from './Menu'
import Roles from './Roles';
import RolMenu from './RolMenu';    
import Modulos from './Modulos';
import Hosts from './Hosts';
import Empresas from './Empresas';
import { FaBars, FaCog, FaHome, FaList, FaMapMarkerAlt, FaShoppingCart, FaUsers, FaUserTag, FaObjectGroup, FaServer } from 'react-icons/fa';

function Settings() {
    const [activeComponent, setActiveComponent] = useState('Menu'); // Initial active component

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Menu':
                return <Menu />;
            case 'Roles':
                return <Roles />;
            case 'RolMenu':
                return <RolMenu />;
            case 'Modulos':
                return <Modulos />;
            case 'Empresas':
                return <Empresas />;
            case 'Hosts':
                return <Hosts />;
            default:
                return <div>Select an option from the menu.</div>;
        }
    };

    const handleMenuClick = (componentName) => {
        setActiveComponent(componentName);
    };    

  return (
    <Page title="Settings">
            <Container fluid>
                <Row>
                    {/* Left Sidebar */}
                    <Col sm={3} md={2} className="bg-light">
                        <Nav className="flex-column">
                            <Nav.Link onClick={() => handleMenuClick('Menu')}>
                                <FaList className="mr-2" /> Menu
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMenuClick('Roles')}>
                                <FaUserTag className="mr-2" /> Roles
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMenuClick('RolMenu')}>
                                <FaUsers className="mr-2" /> RolMenu
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMenuClick('Modulos')}>
                                <FaObjectGroup className="mr-2" /> Modulos
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMenuClick('Empresas')}>
                                <FaHome className="mr-2" /> Empresas
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMenuClick('Hosts')}>
                                <FaServer className="mr-2" /> Hosts
                            </Nav.Link>
                            {/* Add more Nav.Link components for other options */}
                        </Nav>
                    </Col>

                    {/* Right Content */}
                    <Col sm={9} md={10}>
                        <Card>
                            <Card.Body>
                                {renderComponent()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

    </Page>
  )
}

export default Settings