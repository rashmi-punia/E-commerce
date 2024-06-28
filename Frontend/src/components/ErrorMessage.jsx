import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert key={variant} variant={variant} className="text-center align-middle">
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
