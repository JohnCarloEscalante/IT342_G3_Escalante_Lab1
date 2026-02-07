import React, { useState } from 'react';
import { Card, Form, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username or email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        const result = await login(values);
        
        if (!result.success) {
          setError(result.error);
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card className="shadow">
          <Card.Body>
            <div className="text-center mb-4">
              <h2>Welcome Back</h2>
              <p className="text-muted">Sign in to your account</p>
            </div>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Form onSubmit={formik.handleSubmit}>
              <Input
                label="Username or Email"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.username}
                touched={formik.touched.username}
                placeholder="Enter username or email"
                autoFocus
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.password}
                touched={formik.touched.password}
                placeholder="Enter password"
              />

              <div className="mb-3 text-end">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!formik.isValid || loading}
                className="w-100 mb-3"
              >
                Sign In
              </Button>

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Create one here
                  </Link>
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;