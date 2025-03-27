import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ThemeContext from '../contexts/ThemeContext';

const AppHeader = () => {
    const theme = useContext(ThemeContext);
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary" bg={theme} data-bs-theme={theme}>
                <Container>
                    <Navbar.Brand href="#home">React-Agent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#none">Chatrooms</Nav.Link>
                        <Nav.Link href="#none">Setting</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AppHeader;