import React from "react";
import { ToastContainer } from "react-toastify";

const ReactToastComponent = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition="Bounce"
    />
  );
};

export default ReactToastComponent;
