import React, { useState, useRef  } from 'react'
import ChatBot from 'react-simple-chatbot';
import Review from "./Review";
import "./index.css";
import { Link } from "react-router-dom";

import { IoLink } from "react-icons/io5";



function ChatBoat() {
  const storedData = sessionStorage.getItem('userDataInfo');
  const dataObject = JSON.parse(storedData);

  const [chatKey, setChatKey] = useState(0);


  const [steps, setSteps] = useState([
    {
      id: '0',
      message: `Hello ${dataObject.firstname+" "+dataObject.lastname}`,
      trigger: '1',
    },
    {
      id: '1',
      message: 'How can i help you with ?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'registerCard', label: 'Register Card', trigger: 'register-0-card' },
        { value: 'viewCard', label: 'View Cards', trigger: 'register-1-card' },
        { value: 'billPayment', label: 'Bill Payment', trigger: 'register-2-card' },
        { value: 'viewTransaction', label: 'View Transaction', trigger: 'register-3-card' },
        
      ],
    },
    {
      id: 'register-0-card',
            component: <><IoLink style={{marginRight:"10px", fontSize:"24px", color:"red"}}/><Link to="cards">Register Cards</Link></>,
      trigger: 'register-00-card',
    },
    {
      id: 'register-00-card',
      message: 'Thanks for Chosing Register Card',
      trigger: 'loop',
    },
    {
      id: 'register-1-card',
            component: <><IoLink style={{marginRight:"10px", fontSize:"24px", color:"red"}}/><Link to="cards">View Cards</Link></>,
      trigger: 'register-11-card',
    },
    {
      id: 'register-11-card',
      message: 'Thanks for Chosing View Card',
      trigger: 'loop',
    },
    {
      id: 'register-2-card',
            component: <><IoLink style={{marginRight:"10px", fontSize:"24px", color:"red"}}/><Link to="payments">Bill Payments</Link></>,
      trigger: 'register-22-card',
    },
    {
      id: 'register-22-card',
      message: 'Thanks for Chosing Bill Payments',
      trigger: 'loop',
    },
    {
      id: 'register-3-card',
            component: <><IoLink style={{marginRight:"10px", fontSize:"24px", color:"red"}}/><Link to="history">Transaction History</Link></>,
      trigger: 'register-33-card',
    },
    {
      id: 'register-33-card',
      message: 'Thanks for Chosing Transaction History',
      trigger: 'loop',
    },
    {
      id: 'loop',
      message: 'Any thing else?',
      trigger: 'main-loop',
    },
    {
      id: 'main-loop',
      options: [
        { value: 'yes', label: 'Yes', trigger: 'update-yes-loop' },
        { value: 'no', label: 'No', trigger: 'end-message' },
      ],
    },
    {
      id: 'update-yes-loop',
      message: 'Sure, How can i help you with ?',
      trigger: '2',
    },    
    {
      id: 'end-message',
      message: 'Thanks for choosing Vega Pay!',
      end: true,
    },

  ])
  const resetChat = () => {
    setChatKey(prevKey => prevKey + 1); // Change key to force re-render
  };
  return (
    <div className='rsrBoat'>
      <input className="abc123" type="button" onClick={resetChat} value="Reset Chat"/>
      <ChatBot key={chatKey} steps={steps} />
    </div>
  )
}

export default ChatBoat