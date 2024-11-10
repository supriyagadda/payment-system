import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot';
import Review from "./Review";
import "./index.css";
import { Link } from "react-router-dom";

import Home from "../Home";

import { FaSignOutAlt } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { removeUserId } from '../../utils/StorageUtils';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { GiTakeMyMoney } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import AllCardsPage from '../AllCards';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../Login';
import { ProtectedRoute } from '../ProtectedRoute';
import ChatBoat from '../ChatBoat';
import TransactionHistoryPage from '../TransactionHistory';
import BillPaymentsPage from '../Payments/index';
import AboutPage from '../About';
import UserProfilePage from '../UserProfile';




function LandingPage() {
  const storedData = sessionStorage.getItem('userDataInfo');
  const dataObject = JSON.parse(storedData);
  const navigate = useNavigate();

  const myemptyData = {
    "userid": "",
    "statusid": "",
    "firstname": "",
    "lastname": "",
    "emailid": "",
    "password": ""
}

const goToLoginPage = () => {
  navigate('/login');
};

const clearLanguageCookie = () => {
  removeUserId();
  sessionStorage.setItem('userDataInfo', JSON.stringify(myemptyData));
    goToLoginPage()
  }
  return (

    <>
      <div style={{ backgroundColor: "#003764", color: "#fff", marginBottom: "1px" }}>
        <Row style={{ padding: "5px 10px 5px 20px", display: "flex", justifyContent: "space-between" }}>
          <Col style={{ display: "flex", alignItems: "center", padding:"0px" }}><Link to="/" className='homelogo'><span style={{ marginRight: "5px" }}>Zap Pay </span><span style={{ marginTop: "4px" }}><GiTakeMyMoney style={{ fontSize: "30px" }} /></span></Link></Col>
          <Col style={{ display: "flex", alignItems: "center", padding:"0px" }}><span style={{
            marginRight: "10px", position: "absolute",
            right: "30px"
          }}>
            <span className='firstLetter'>{`${dataObject.firstname}`} &nbsp;</span>
            <span className='firstLetter'>{`${dataObject.lastname}`}</span>
            </span> <span style={{ position: "absolute", right: "10px", cursor: "pointer" }} onClick={clearLanguageCookie}><IoIosLogOut style={{ fontSize: "24px" }} /></span></Col>
        </Row>
      </div>
      <div className="mentItems" style={{ backgroundColor: "#003764", color: "#fff" }}>
        <ul>
          <li><Link to="/cards">Cards</Link></li>
          <li><Link to="/history">Transaction History</Link></li>
          <li><Link to="/payments">Bill Payments</Link></li>
          <li><Link to="/about">About</Link></li>
          <li style={{ position: "absolute", right: "5px" }}><Link to="/profile">User Profile</Link></li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<ProtectedRoute element={Home} path="/" />} />
          <Route path="/cards" element={<ProtectedRoute element={AllCardsPage} path="/cards" />} />
          <Route path="/history" element={<ProtectedRoute element={TransactionHistoryPage} path="/history" />} />
          <Route path="/payments" element={<ProtectedRoute element={BillPaymentsPage} path="/payments" />} />
          <Route path="/about" element={<ProtectedRoute element={AboutPage} path="/about" />} />
          <Route path="/profile" element={<ProtectedRoute element={UserProfilePage} path="/profile" />} />
        </Routes>
      </div>
      <ChatBoat />
    </>
  )
}

export default LandingPage