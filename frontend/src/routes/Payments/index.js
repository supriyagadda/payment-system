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
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";


import { useForm } from "react-hook-form";
import billType from "./billType.json";

import Config from "../../constants/EnvironmentConstants";
import { showBottomCenterToast } from '../../utils/ToastUtils';

const backendBaseUrl = Config.BACKEND_BASE_URL;


const labelMapping = {
  CREDITCARD: "CREDIT CARD",
  PROPERTYTAX: "PROPERTY TAX",
  CARINSURANCE: "CAR INSURANCE",
  ELECTRICITY: "ELECTRICITY",
  WIFI: "WIFI",
  MOBILE: "MOBILE",
  DONATION: "DONATION",
  GAS: "GAS",
};

const getDisplayLabel = (label) => {
  return labelMapping[label] || label; // Fallback to original label if no mapping exists
};

// Map card types to icons
const cardTypeIcons = {
  "American Express": "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg", // American Express logo
  Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png", // Visa logo
  "Master Card": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", // MasterCard logo
};


function BillPaymentsPage() {
  const options = [
    { icon: <GiElectric style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "ELECTRICITY" },
    { icon: <FaWifi style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "WIFI" },
    { icon: <FaMobileAlt style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "MOBILE" },
    { icon: <BsCreditCard2FrontFill style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "CREDITCARD" },
    { icon: <SiTesla style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "CARINSURANCE" },
    { icon: <BiSolidInstitution style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "PROPERTYTAX" },
    { icon: <BiSolidDonateHeart style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "DONATION" },
    { icon: <GiGasPump style={{ color: "#fff", fontSize: "36px", marginLeft: "15px" }} />, label: "GAS" },
  ];

  const [bills, setBills] = useState([...billType]);

  const [show, setShow] = useState(false);
  const [billTypeName, setBillTypeName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardError, setCardError] = useState(false);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);
    // Making a GET request to the API
    fetch(`${backendBaseUrl}getcards?userid=${dataObject.userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCards(data); // Setting the fetched cards data
      })
      .catch((err) => {
        // setError(err.message); // Handle error if any
      });
  }, [])

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = (data) => {
    // console.log("RSR--dATA:", data)
    setBillTypeName(data.label)
    setSelectedCard(null); // Reset selected card when the modal is opened
    setShow(true)
  };

  

  const resetForm = () => {
    reset(); // Reset form fields
    setSelectedCard(null); // Reset selected card
  };

  const handleSelect = (card) => {
    setSelectedCard(card);
    setCardError(false); // Clear error when a card is selected
  };


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

    if (!selectedCard) {
      setCardError(true); // Show error if no card is selected
      return; // Stop form submission
    }
  

    let newPayload = {
      amount: payload.billAmount,
      businesstype: billTypeName,
      cardid: selectedCard.cardid,
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
        showBottomCenterToast('success', 'Payment done successfully!');
        setShow(false)
        reset()
      } else {
        showBottomCenterToast('error', `Payment failed!`);
      }
    } catch (error) {
      showBottomCenterToast('error', `Request failed: ${error.message}`);
    }
  };


  const formatCardNumberWithIcon = (card) => {
    const firstFour = card.cardnumber.slice(0, 4);
    const lastFour = card.cardnumber.slice(-4);
    const masked = "XXXX-XXXX";
    return {
      label: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{`${firstFour}-${masked}-${lastFour}`}</span>
          <img
            src={cardTypeIcons[card.cardtype]}
            alt={card.cardtype}
            style={{ height: "20px", marginLeft: "8px" }}
          />
        </div>
      ),
      value: card.cardid,
    };
  };

  const cardOptions = cards.map((card) => formatCardNumberWithIcon(card));

 


  return (
    <>
      <div style={{
        marginTop: "20px"
      }}>
        <p
          style={{
            marginLeft: "100px",
            fontSize: "24px",
            display: "inline",
            borderBottomStyle: "solid",
            borderImage: "linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3"
          }}
        >Bill Payments </p>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "100px", maxWidth: "800px" }}>
        <Row >
          {
            options.map((option, index) => (
              <Col
                key={index}
                sm={3}
                md={3}
                lg={3}
                style={{ display: "grid", marginBottom: "15px" }}
                onClick={() => handleShow(option)}
              >
                <span className='bgShadowPayment'>
                  {option.icon}
                </span>
                <span style={{ color: "hsl(302, 57%, 30%)", textAlign: "center" }}>
                  {getDisplayLabel(option.label)}
                </span>
              </Col>
            ))
          }
        </Row>
        <hr />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{getDisplayLabel(billTypeName)} Bill</Modal.Title>
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
                  pattern: /^[0-9]+$/ // Allows only numbers
                })}
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))} 
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
                {...register("billAmount", {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]{1,2})?$/ // Allows numbers with up to 2 decimal places
                })}
                onInput={(e) => {
                  // Restrict input to only numbers and one decimal point
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "") // Allow only numbers and a period
                    .replace(/(\..*?)\..*/g, "$1"); // Allow only one decimal point
                }}
              />
              {errors?.billAmount?.type === "required" && <p className="p_error">Bill Amount is required</p>}

              {/* ------------------- */}
              <div style={{ marginBottom: "20px" }}>
              <label>Payment Card</label>
         
              <DropdownButton 
        id="dropdown-basic-button"
        title={
          selectedCard ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{`${selectedCard.cardnumber.slice(0, 4)}-XXXX-XXXX-${selectedCard.cardnumber.slice(-4)}`}</span>
              <img
                src={cardTypeIcons[selectedCard.cardtype]}
                alt={selectedCard.cardtype}
                style={{ height: "20px", marginLeft: "215px" }}
              />
            </div>
          ) : (
            "Select Card"
          )
        }
        
        
      >
        {cards.map((card) => (
          <Dropdown.Item
            key={card.cardid}
            onClick={() => handleSelect(card)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>{`${card.cardnumber.slice(0, 4)}-XXXX-XXXX-${card.cardnumber.slice(-4)}`}</span>
            <img
              src={cardTypeIcons[card.cardtype]}
              alt={card.cardtype}
              style={{ height: "20px", marginLeft: "208px" }}
            />
          </Dropdown.Item>
        ))}
          
      </DropdownButton>
      {cardError && <p className="p_error">Select Payment Card is required</p>}
      </div>

              
            


              <hr />
              <div className="divReset" style={{
                justifyContent: "end"

              }}>
                <input style={{ margin: "0px 10px 0px 0px" }} type="reset" onClick={resetForm} />
                <input style={{ margin: "0px" }} type="submit" value="Pay" />
              </div>

            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default BillPaymentsPage