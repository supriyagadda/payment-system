import React, { useState } from 'react';
import "./index.css";



function TransactionHistoryPage() {
  
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
 <table>
    <tr>
        <th>#</th>
        <th>Transaction Id</th>
        <th>Transaction Date</th>
        <th>Bill Type</th>
        <th>Amount</th>
        <th>Card Number</th>
        <th>Card Type</th>
    </tr>
    <tr>
        <td>1</td>
        <td>zp12344</td>
        <td>2024-11-04</td>
        <td>Electricity</td>
        <td>$123</td>
        <td>9876-XXXX-XXXX-1234</td>
        <td>Visa</td>
    </tr>
    <tr>
        <td>2</td>
        <td>zp12345</td>
        <td>2024-11-03</td>
        <td>Internet</td>
        <td>$100</td>
        <td>1235-XXXX-XXXX-0789</td>
        <td>Visa</td>

    </tr>
    <tr>
        <td>3</td>
        <td>zp12346</td>
        <td>2024-10-08</td>
        <td>Internet</td>
        <td>$75</td>
        <td>3524-XXXX-XXXX-3898</td>
        <td>Master</td>

    </tr>
    <tr>
        <td>4</td>
        <td>zp12347</td>
        <td>2024-09-28</td>
        <td>Gas</td>
        <td>$150</td>
        <td>3467-XXXX-XXXX-7679</td>
        <td>Master</td>

    </tr>
    <tr>
        <td>5</td>
        <td>zp12348</td>
        <td>2024-09-28</td>
        <td>Gas</td>
        <td>$125</td>
        <td>9796-XXXX-XXXX-7687</td>
        <td>American Express</td>

    </tr>
    <tr>
        <td>6</td>
        <td>zp12349</td>
        <td>2024-08-30</td>
        <td>Internet</td>
        <td>$55</td>
        <td>3654-XXXX-XXXX-0768</td>
        <td>Master</td>

    </tr>
</table>

    </div>
    </>
  )
}

export default TransactionHistoryPage