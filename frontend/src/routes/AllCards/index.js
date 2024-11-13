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
import ViewCards from './viewCards';



function AllCardsPage() {

   // State to hold all cards
   const [cards, setCards] = useState([]);
   const [refresh, setRefresh] = useState(false);

   // Function to trigger refresh of card list
   const triggerRefresh = () => setRefresh((prev) => !prev);

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
              <RegisterCard onCardAdded={triggerRefresh}/>
            </Row>
          </Tab>
          <Tab eventKey="viewCards" title="View Cards">
            <ViewCards refresh={refresh} onCardDeleted={triggerRefresh}/>
          </Tab>
        </Tabs>
      </div>

    </>
  )
}

export default AllCardsPage