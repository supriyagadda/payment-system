import React, { useState } from 'react';
import "./index.css";

function HomePage() {

  return (
    <div >
      <p
        style={{
          marginTop: "70px",
          marginLeft: "100px",
          marginRight: "500px",
          fontSize: "20px"
        }}
      >Welcome to <span style={{
        borderBottomStyle: "solid",
        borderImage: "linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3",
        paddingBottom: "2px", fontWeight: "bold", fontSize: "22px", color: "rgb(99, 88, 220)"
      }}>Vega Pay </span> – your smart and secure way to make payments through a friendly chatbot interface.
        Enjoy seamless transactions, real-time updates, and comprehensive payment management, all within a user-friendly chat experience. </p>
      <p className='intro-text'>Make payments, manage cards, and track your history effortlessly, with robust security to keep your information safe.</p>
      <p className="intro-text"> Experience the future of hassle-free payments with Vega Pay!</p>
    </div>
  )
}

export default HomePage