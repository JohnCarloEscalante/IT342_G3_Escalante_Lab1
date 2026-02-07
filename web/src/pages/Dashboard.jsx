import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  ListGroup, 
  Badge,
  Tab,
  Tabs,
  Spinner,
  Alert
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const data = await authService.getCurrentUser();
      setUserDetails(data);
      updateUser(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading || !userDetails) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="mb-4">
        <h1 className="display-5 fw-bold">Dashboard</h1>
        <p className="lead">Welcome back, {userDetails.fullName || userDetails.username}!</p>
      </div>

      <Alert variant="info" className="mb-4">
        <Alert.Heading>Account Status</Alert.Heading>
        <p>
          Your account is currently <Badge bg="success">{userDetails.status}</Badge>.
          {userDetails.lastLogin && (
            <> Last login: {formatDate(userDetails.lastLogin)}</>
          )}
        </p>
      </Alert>

      <Row className="g-4">
        <Col lg={8}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile Information">
              <Card>
                <Card.Body>
                  <Card.Title>Personal Information</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Username:</strong> {userDetails.username}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {userDetails.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Full Name:</strong> {userDetails.fullName || 'Not provided'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Account Created:</strong> {formatDate(userDetails.createdAt)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Last Updated:</strong> {formatDate(userDetails.updatedAt)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Last Login:</strong> {formatDate(userDetails.lastLogin)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="security" title="Security">
              <Card>
                <Card.Body>
                  <Card.Title>Security Settings</Card.Title>
                  <p className="text-muted mb-4">
                    Manage your account security settings and password.
                  </p>
                  
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary">
                      Change Password
                    </Button>
                    <Button variant="outline-secondary">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="activity" title="Activity">
              <Card>
                <Card.Body>
                  <Card.Title>Recent Activity</Card.Title>
                  <p className="text-muted">
                    Your recent account activities will appear here.
                  </p>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="display-4 text-white">
                    {userDetails.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <Card.Title>{userDetails.fullName || userDetails.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                @{userDetails.username}
              </Card.Subtitle>
              <Badge bg="success" className="mb-3">
                {userDetails.status}
              </Badge>
              
              <div className="d-grid gap-2 mt-3">
                <Button variant="outline-primary">
                  Edit Profile
                </Button>
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Quick Stats</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Account Age</span>
                  <Badge bg="info">
                    {Math.floor((new Date() - new Date(userDetails.createdAt)) / (1000 * 60 * 60 * 24))} days
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Sessions</span>
                  <Badge bg="info">Active</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Security Level</span>
                  <Badge bg="success">High</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;