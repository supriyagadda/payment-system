import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css";

import { GiElectric } from "react-icons/gi";

import { FaWifi } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";

import { GiGasPump } from "react-icons/gi";

import { BsCreditCard2FrontFill } from "react-icons/bs";
import { SiTesla } from "react-icons/si";
import { BiSolidInstitution } from "react-icons/bi";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiTicket } from "react-icons/gi";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form";
import billType from "./billType.json";

import Config from "../../constants/EnvironmentConstants";
import { showBottomCenterToast } from '../../utils/ToastUtils';

const backendBaseUrl = Config.BACKEND_BASE_URL;



function BillPaymentsPage() {
  const options = [
    { icon: <GiElectric style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Electric" },
    { icon: <FaWifi style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Wi-Fi" },
    { icon: <FaMobileAlt style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Mobile" },
    { icon: <BsCreditCard2FrontFill style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Credit Card" },
    { icon: <SiTesla style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Car Insurance" },
    { icon: <BiSolidInstitution style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Property Tax" },
    { icon: <BiSolidDonateHeart style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Donation" },
    { icon: <GiTicket style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "Movie" },
  ];

  const [bills, setBills] = useState([...billType]);

  const [show, setShow] = useState(false);
  const [billTypeName, setBillTypeName] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Making a GET request to the API
    fetch('http://localhost:8080/payment-systems/getcards?userid=1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCards(data); // Setting the fetched cards data
        // setLoading(false);
      })
      .catch((err) => {
        // setError(err.message); // Handle error if any
        // setLoading(false);
      });
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    // console.log("RSR--dATA:", data)
    setBillTypeName(data.label)
    setShow(true)};
//   useEffect(() => {
//     fetch(`${billType}`)
//         .then(response => console.log("rsr----json:", response.json()))
//         .then(data => setBills(data))
//         .catch(error => console.error("Error loading bills:", error));
// }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (payload) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);

      let newPayload={
      amount:payload.billAmount,
      businessid:payload.accountNo,
      cardid:payload.paymentCard,
      userid: dataObject.userid
    }
    // console.log("RSR--->Data Pay:", newPayload)
    try {
      const response = await fetch(`${backendBaseUrl}pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayload)
      });
      
      const data = await response.json();
      if (response.ok) {
        showBottomCenterToast('success','Payment done successfully!');
        reset()
      } else {
        showBottomCenterToast('error',`Payment failed!`);
      }
    } catch (error) {
      showBottomCenterToast('error',`Request failed: ${error.message}`);
    }
  };
  
  return (
    <>
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
      >Bill Payments </p>
      </div>
      <div style={{marginTop:"20px", marginLeft: "100px", maxWidth:"800px"}}>
        <Row >
        {
          options.map((option, index)=>(
          // <Col key={key} onClick={handleShow} sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          //   <span className='bgShadowPayment' >
          //     <GiElectric style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}} />
          //   </span>
          //   <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>{item.billTyp}</span>
          // </Col>
          <Col
          key={index}
          sm={3}
          md={3}
          lg={3}
          style={{ display: "grid", marginBottom: "15px" }}
          onClick={()=>handleShow(option)}
        >
          <span className='bgShadowPayment'>
            {option.icon}
          </span>
          <span style={{ color: "hsl(302, 57%, 30%)", textAlign: "center" }}>
            {option.label}
          </span>
        </Col>
          ))
        }
        </Row>
        <hr/>
        {/* <Row>
          <Col onClick={handleShow} sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
            <span className='bgShadowPayment' >
              <GiElectric style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}} />
            </span>
            <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Electric</span>
          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <FaWifi style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>

        </span>
          <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Wi5</span>
        
          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <FaMobileAlt style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>

        </span>
          <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Mobile</span>
        
        
          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <BsCreditCard2FrontFill style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>

        </span>
          <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Credit Card</span>
        
          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <SiTesla style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>

        </span>
          <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Car Insurance</span>
          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <BiSolidInstitution style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>
        </span>
        <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Property Tax</span>

          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <BiSolidDonateHeart style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>
        </span>
        <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Donation</span>

          </Col>
          <Col sm={3} md={3} lg={3} style={{display:"grid", marginBottom:"15px"}}>
          <span className='bgShadowPayment' >
          <GiTicket style={{color:"#fff", fontSize:"36px", marginLeft:"15px"}}/>
        </span>
        <span style={{color:"hsl(302.05479452054794, 57.4803149606%, 29.8039215686%)", textAlign:"center"}}>Movie</span>

          </Col>
        </Row> */}
          
        {/* 
        <br/>
        <br/>
        <br/>
        
        
         */}
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{billTypeName} Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
      <label>Account No</label>
      <input
      placeholder="Enter Account No"
      type="text"
        {...register("accountNo", {
          required: true,
          maxLength: 10,
          pattern: /^[0-9]/i
        })}
      />
      {errors?.accountNo?.type === "required" && <p className="p_error">Account No is required</p>}
      {errors?.accountNo?.type === "maxLength" && (
        <p className="p_error">Account No cannot exceed 10 characters</p>
      )}
      {errors?.accountNo?.type === "pattern" && (
        <p className="p_error">Numbers only</p>
      )}
{/* ------------------- */}
<label>Bill Amount</label>
<input
      // value="$125"
      // disabled
      placeholder="Enter Bill Amount"
      {...register("billAmount",{required: true})}
      />
      {errors?.billAmount?.type === "required" && <p className="p_error">Bill Amount is required</p>}

{/* ------------------- */}
<label>Payment Card</label>
      <select {...register("paymentCard", {required: true})} className='inputSelect'>
        <option value="">Select Card</option>
        {/* <option value="4323-8765-0995-4567">4323-8765-0995-4567</option>
        <option value="8765-8876-0995-4567">8765-8876-0995-4567</option>
        <option value="8995-6655-1221-4567">8995-6655-1221-4567</option> */}
        {cards.map((item,index)=>(
          <option key={index} value={item.cardid}>{item.cardnumber}</option>
        ))}
      </select>
      {errors?.paymentCard?.type === "required" && <p className="p_error">Select Payment Card is required</p>}


<hr/>
<div className="divReset" style={{
    justifyContent: "end"

}}>
      <input style={{margin:"0px 10px 0px 0px"}} type="reset" onClick={reset} />
      <input style={{margin:"0px"}}  type="submit" value="Pay"/>
      </div>
    
    </form>
        </Modal.Body>
        {/* <Modal.Footer>
        <div className="divReset">
      <input style={{margin:"0px 10px 0px 0px"}} type="reset" onClick={reset} />
      <input style={{margin:"0px"}}  type="submit" />
      </div>
        </Modal.Footer> */}
      </Modal>
      </div>
    </>
  )
}

export default BillPaymentsPage