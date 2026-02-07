import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <BootstrapButton
      type={type}
      variant={variant}
      disabled={disabled || loading}
      className={`px-4 ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </BootstrapButton>
  );
};

export default Button;