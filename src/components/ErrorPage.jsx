import React from "react";
import utils from "../utils/utils";

const ErrorPage = () => {
  return (
    <div>
      <p className="fs-3">Oops! Something went wrong</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={utils.refreshPage}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
