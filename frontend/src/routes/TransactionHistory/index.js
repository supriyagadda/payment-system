import React, { useState, useEffect } from 'react';
import "./index.css";
import { showBottomCenterToast } from "../../utils/ToastUtils";

import Config from "../../constants/EnvironmentConstants";
const backendBaseUrl = Config.BACKEND_BASE_URL;



function TransactionHistoryPage() {

  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    fetchTransactionHistor()
  }, [])

  const fetchTransactionHistor = async (payload) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);
    try {
      const response = await fetch(`${backendBaseUrl}transactiondetails?userid=${dataObject.userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log("RSR Cards:", data)
      setAllCards([...data])
    } catch (error) {
      showBottomCenterToast('error', `Request failed: ${error.message}`);
    }
  };

  const convertToEST = (dateString) => {
    const date = new Date(dateString);
    
    // Convert the date to EST (UTC-5)
    const utcOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const estOffset = -5 * 60 * 60 * 1000; // EST offset in milliseconds
    
    const estDate = new Date(date.getTime() + utcOffset + estOffset);
    
    // Format the date and time in EST as desired, e.g., "MM/DD/YYYY HH:MM AM/PM"
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return estDate.toLocaleString('en-US', options);
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
      >All Transaction History</p>
    </div>
    <div
    style={{
      marginTop: "20px",
      marginLeft: "100px"
    }}
    >
 <table style={{fontSize:"14px"}}>
    <tr>
        <th>#</th>
        <th>Transaction Id</th>
        <th>Transaction Date</th>
        <th>Bill Type</th>
        <th>Amount</th>
        <th>Card Number</th>
        <th>Card Type</th>
    </tr>
    {
      allCards.length >0 ?
      allCards.map((item,index)=>(

    <tr>
        <td>{index+1}</td>
        <td>{item.transactionid}</td>
        <td>{convertToEST(item.transactionTime)}</td>
        <td>{item.business}</td>
        <td>{"$ "+item.amount}</td>
        <td>{item.cardNumber}</td>
        <td>{item.cardType}</td>
    </tr>
      ))
      :
      <tr>
        <td colSpan={7} style={{textAlign:"center"}}>No Transactions Found</td>
      </tr>
    }
   
</table>

    </div>
    </>
  )
}

export default TransactionHistoryPage