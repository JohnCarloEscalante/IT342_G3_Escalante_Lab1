import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">User Authentication System</h1>
        <p className="lead">Secure user registration, login, and profile management</p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <span className="display-1">🔐</span>
              </div>
              <Card.Title>Secure Registration</Card.Title>
              <Card.Text>
                Create a new account with email verification and password encryption.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <span className="display-1">📱</span>
              </div>
              <Card.Title>Easy Login</Card.Title>
              <Card.Text>
                Fast and secure login with JWT token authentication.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <span className="display-1">🛡️</span>
              </div>
              <Card.Title>Protected Dashboard</Card.Title>
              <Card.Text>
                Access protected content with role-based authorization.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        {isAuthenticated ? (
          <Button as={Link} to="/dashboard" variant="success" size="lg">
            Go to Dashboard
          </Button>
        ) : (
          <div>
            <Button as={Link} to="/register" variant="primary" size="lg" className="me-3">
              Get Started
            </Button>
            <Button as={Link} to="/login" variant="outline-primary" size="lg">
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;