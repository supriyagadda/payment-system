import React, { useState } from 'react'
import "./index.css";


function AboutPage() {
  
  return (
    <div  style={{
      marginTop: "20px"}}>
  <p
    style={{
      marginLeft: "100px",
      fontSize: "24px",
      display:"inline",
      borderBottomStyle: "solid",
      borderImage: "linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3"
    }}
      >About </p>
          <div style={{marginTop:"20px", 
          marginLeft: "100px",
          width:"800px"

          }}>
      <section id="about">
    <p><span style={{fontWeight:"bold", fontSize:"22px", color:"rgb(0, 55, 100)"}}>Zap Pay</span> is designed to revolutionize the way you handle payments, making transactions quicker, easier, and more secure than ever. Our platform empowers individuals and businesses alike by offering a comprehensive, reliable solution for everyday financial needs.</p>

    <p>At <span style={{fontWeight:"bold", fontSize:"22px", color:"rgb(0, 55, 100)"}}>Zap Pay</span>, we believe that payments should be simple and accessible for everyone. Whether you’re paying a friend, making a purchase, or managing your finances, our intuitive interface and robust technology make it easy to handle transactions in just a few taps.</p>

    <p>Security is our top priority. <span style={{fontWeight:"bold", fontSize:"22px", color:"rgb(0, 55, 100)"}}>Zap Pay</span> uses the latest encryption technology and multiple layers of protection to ensure that your data and transactions are safe. Our team continuously monitors and updates our systems to stay ahead of security threats and provide you with peace of mind.</p>

    <p>Our mission is to streamline the payment experience, saving you time and effort with each transaction. With Zap Pay, you can enjoy a seamless, cashless experience wherever you go, making digital payments as convenient and quick as possible.</p>

    <p>Join <span style={{fontWeight:"bold", fontSize:"22px", color:"rgb(0, 55, 100)"}}>Zap Pay</span> today to experience the future of payments. Say goodbye to the hassles of traditional payment methods and embrace a smarter, faster way to pay.</p>
</section>

      </div>
    </div>
  )
}

export default AboutPage