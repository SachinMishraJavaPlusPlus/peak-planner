import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, error, currentUser, setError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
    
    // Clear any previous errors when component mounts
    setError(null);
  }, [currentUser, navigate, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    setPasswordsMatch(true);
    
    const form = e.currentTarget;
    
    // Form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setLoading(true);
    setLocalError('');
    
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setLocalError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-container my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="auth-card">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="auth-title">Create an Account</h2>
                <p className="auth-subtitle">Join Peak Planner to plan your next adventure</p>
              </div>
              
              {(error || localError) && (
                <Alert variant="danger">
                  {error || localError}
                </Alert>
              )}
              
              {!passwordsMatch && (
                <Alert variant="danger">
                  Passwords do not match
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={20}
                  />
                  <Form.Control.Feedback type="invalid">
                    Username must be between 3 and 20 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 auth-button"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </Form>
              
              <div className="text-center mt-4">
                <p>
                  Already have an account? <Link to="/login" className="auth-link">Login</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;