import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.css";
import { showBottomCenterToast } from "../../utils/ToastUtils";
import Config from "../../constants/EnvironmentConstants";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
const backendBaseUrl = Config.BACKEND_BASE_URL;


function RegisterCard({ onCardAdded }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors,isSubmitted }
  } = useForm();

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // }; 
  const [expiryDate, setExpiryDate] = useState(null);
  const [expiryError, setExpiryError] = useState(false); // Tracks expiry date error state



  const [responseMessage, setResponseMessage] = useState('');

  const onSubmit = async (payload) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);

     // Validate expiry date
     if (!expiryDate) {
      setExpiryError(true); // Show error if expiry date is missing
      return;
    }

    // Format expiry date as MM/YY
    const formattedExpiryDate = format(expiryDate, 'MM/yy');

    let newPayload = {
      cardholdername: payload.cardName,
      cardnumber: payload.cardNumber,
      cardtype: payload.creditCardType,
      cvv: payload.cardCvv,
      expirydate: formattedExpiryDate,
      userid: dataObject.userid
    }
    try {
      const response = await fetch(`${backendBaseUrl}card-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayload)
      });

      const data = await response.json();
      if (response.ok) {
        showBottomCenterToast('success', 'Card registered successfully!');
        // Call the function passed from the parent component
        onCardAdded();
        resetForm()
  
      } else {
        showBottomCenterToast('error', `Card Already registered!`);
      }
    } catch (error) {
      showBottomCenterToast('error', `Request failed: ${error.message}`);
    }
  };

  // console.log(watch("example"));

  const resetForm = () => {
    reset(); // Reset react-hook-form states
    setExpiryDate(null); // Clear expiry date
    
  };

  return (
    <>
      <form style={{ width: "500px" }} onSubmit={handleSubmit(onSubmit)}>
        <label>Name on Card</label>
        <input
          placeholder="Enter Card Name"
          type="text"
          {...register("cardName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]/i
          })}
        />
        {errors?.cardName?.type === "required" && <p className="p_error">Credit Card name is required</p>}
        {errors?.cardName?.type === "maxLength" && (
          <p className="p_error">Credit Card name cannot exceed 20 characters</p>
        )}
        {errors?.cardName?.type === "pattern" && (
          <p className="p_error">Alphabetical characters only</p>
        )}
        {/* ------------------- */}
        <label>Card Card Number</label>
        <input
          placeholder="Enter 16 Digit Credit Card Number"
          type="number"
          // {...register("cardNumber", { maiLength:16,maxLength: 16, })} 
          {...register("cardNumber", {
            required: true,
            pattern: /^\d{16}$/
          })}
        />
        {errors?.cardNumber?.type === "required" && <p className="p_error">Credit Card Number is required</p>}
        {/* {errors?.cardNumber?.type === "min" && (
        <p className="p_error">Credit Card Number cannot exceed 16 characters</p>
      )} */}
        {errors?.cardNumber?.type === "pattern" && (
          <p className="p_error">Credit card number must be exactly 16 digits</p>
        )}
        {/* ------------------- */}
        <div><label>Credit Card Type</label>
          <select style={{ fontSize: "16px" }} {...register("creditCardType", { required: true })} className='inputSelect'>
            <option value="">Select Card</option>
            <option value="Visa">Visa</option>
            <option value="Master Card">Master Card</option>
            <option value="American Express">American Express</option>
          </select>
          {errors?.creditCardType?.type === "required" && <p className="p_error">Select Credit Card Type is required</p>}
        </div>

        {/* ------------------- */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
<div
style={{display:"grid", width:"48%"}}
>
        <div><label>Expiry Date</label></div>
        <ReactDatePicker
          selected={expiryDate}
          onChange={(date) => {
            setExpiryDate(date); // Set expiry date
            setExpiryError(false); // Clear expiry error when a valid date is selected
          }}
          dateFormat="MM/yy" // Format for date picker
          showMonthYearPicker
          minDate={new Date()} // Prevent selecting past dates
          placeholderText="Select Expiry Date"
          className="inputSelect"
        />
        {/* Display expiry error only when invalid */}
        {/* {(expiryError || (isSubmitted && !expiryDate)) && (
          <p className="p_error">Expiry date is required</p>
        )} */}
 </div>
        {/* ------------------- */}
        <div  style={{display:"grid", width:"48%"}}>
          <label>CVV</label>
          <input
            placeholder="Enter 3-digit CVV"
            type="number"
            {...register('cardCvv', {
              required: 'CVV is required', // Custom error message for required validation
              pattern: {
                value: /^\d{3}$/, // Regular expression for exactly 3 digits
                message: 'CVV must be exactly 3 digits', // Custom error message
              },
            })}
          />
          {/* Show error messages */}
          {errors?.cardCvv && <p className="p_error">{errors.cardCvv.message}</p>}
        </div>
        </div>
        {/* ------------------- */}

        <div className="divReset">
          <input type="reset" onClick={resetForm} />
          <input type="submit" />
        </div>
      </form>
    </>
  );
}

export default RegisterCard