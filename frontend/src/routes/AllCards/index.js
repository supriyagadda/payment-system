import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot';
import "./index.css";
import { Link } from "react-router-dom";
import { GiElectric } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RegisterCard from './registerCard';

import { MdDelete } from "react-icons/md";



function AllCardsPage() {

  return (
    <>
      {/* <div >
        <p
          style={{
            marginTop: "20px",
            marginLeft: "100px",
            fontSize: "24px"
          }}
        >All Cards </p>
      </div> */}
      <div style={{
        marginTop: "20px",
        marginLeft: "100px",
        fontSize: "24px"
      }}>
        <Tabs
          defaultActiveKey="registerCards"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="registerCards" title="Register Card">
            <Row>
              <RegisterCard />
            </Row>
          </Tab>
          <Tab eventKey="viewCards" title="View Cards">
            <div style={{ marginBottom: "10px" }}>

              <div className='bgShadow' style={{ width: "30%", marginTop: "25px", padding: "20px 20px 10px 20px", marginRight: "10px", borderRadius: "5px" }}>
                <p>
                  <span style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span>Ranga Mukkara</span>
                    <span>
                      <MdDelete style={{ fontSize: "24px", color: "red" }} />

                    </span>
                  </span>
                  <p style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span>5434  XXXX  XXXX  4456</span>
                    <span>12/29</span>
                    <span><FaCcVisa style={{ fontSize: "30px" }} /></span>
                  </p>
                </p>

              </div>
              <div className='bgShadow' style={{ width: "30%", marginTop: "25px", padding: "20px 20px 10px 20px", marginRight: "10px", borderRadius: "5px" }}>
                <p>
                  <span style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span>Janvi Mukkara</span>
                    <span>
                      <MdDelete style={{ fontSize: "24px", color: "red" }} />
                    </span>
                  </span>
                  <p style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>

                    <span>9842  XXXX  XXXX  6543</span>
                    <span>10/26</span>
                    <span><FaCcMastercard style={{ fontSize: "30px" }} /></span>
                  </p>
                </p>
              </div>
              <div className='bgShadow' style={{ width: "30%", marginTop: "25px", padding: "20px 20px 10px 20px", marginRight: "10px", borderRadius: "5px" }}>
                <p>
                  <span style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span>Sri Bharath</span>
                    <span>
                      <MdDelete style={{ fontSize: "24px", color: "red" }} />
                    </span>
                  </span>
                  <p style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>

                    <span>8765  XXXX  XXXX  1122</span>
                    <span>03/27</span>
                    <span><SiAmericanexpress style={{ fontSize: "30px" }} /></span>
                  </p>
                </p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

    </>
  )
}

export default AllCardsPage