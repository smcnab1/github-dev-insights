import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'; // Import the Loader component
import './components/Loader.css';


// Custom components
import Home from './components/Home';
import Repositories from './components/RepoList';
import UserProfile from './components/UserProfile';

const App = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <Router>
      {loading ? ( // If loading is true, show the Loader component
        <Loader />
      ) : ( // If loading is false, show the content
      <div>
        {/* Bootstrap Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">GitHub Developer Insights</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/repos">Repositories</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repos" element={<Repositories />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Container>
      </div>
      )}
    </Router>
  );
};

export default App;