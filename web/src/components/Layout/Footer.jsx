import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} User Authentication System - IT342 Lab
        </p>
        <small>Spring Boot + React + MySQL</small>
      </Container>
    </footer>
  );
};

export default Footer;