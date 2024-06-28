import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="flex justify-center w-full p-1">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loading;
