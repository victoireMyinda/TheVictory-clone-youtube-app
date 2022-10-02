import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ErrorPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <p className="alert alert-danger">Cette page n'existe pas</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
