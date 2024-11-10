import React, { useState } from 'react';
import "./index.css";


function HomePage() {
  
  return (
    <div >
      <p
        style={{
          marginTop: "120px",
          marginLeft: "100px",
          fontSize: "20px"
        }}
      >Welcome to <span style={{
        borderBottomStyle: "solid",
borderImage: "linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3",
        paddingBottom:"2px"}}>Zap Pay!</span> Experience seamless, secure, and lightning-fast payments at your fingertips. </p>
    </div>
  )
}

export default HomePage