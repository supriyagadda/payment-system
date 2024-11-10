import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./index.css";
import { showBottomCenterToast } from "../../utils/ToastUtils";
import Config from "../../constants/EnvironmentConstants";
const backendBaseUrl = Config.BACKEND_BASE_URL;


function RegisterCard() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // }; 

  const [responseMessage, setResponseMessage] = useState('');
  
  const onSubmit = async (payload) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);

    let newPayload={
      cardholdername:payload.cardName,
      cardnumber:payload.cardNumber,
      cardtype:payload.creditCardType,
      cvv:payload.cardCvv,
      expirydate:payload.cardExpireDate,
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
        showBottomCenterToast('success','Card registered successfully!');
        reset()
      } else {
        showBottomCenterToast('error',`Card Already registered!`);
      }
    } catch (error) {
      showBottomCenterToast('error',`Request failed: ${error.message}`);
    }
  };

  // console.log(watch("example"));

  return (
    <>
    <form style={{width:"500px"}} onSubmit={handleSubmit(onSubmit)}>
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
<label>Credit Card Type</label>
      <select style={{fontSize:"16px"}} {...register("creditCardType", {required: true})} className='inputSelect'>
        <option value="">Select Card</option>
        <option value="Visa">Visa</option>
        <option value="Master">Master</option>
        <option value="American Express">American Express</option>
      </select>
      {errors?.creditCardType?.type === "required" && <p className="p_error">Select Credit Card Type is required</p>}

{/* ------------------- */}
<label>Expired Date</label>
      <input
      placeholder="Enter Expire Date in MM/YYYY"
      type="text"
      
      {...register("cardExpireDate",
        {
         required: true,
         minLength:7,
         maxLength:7,
        //  pattern: /^\d{7}$/ 
         })} />
      {errors.cardExpireDate && (
        <p className="p_error">Expire Date should be MM/YYYY</p>
      )}
{/* ------------------- */}
<label>CVV</label>
      <input
      placeholder="Enter CVV"
      type="number"
      
      {...register("cardCvv", {
         required: true,
         minLength: 3,
         maxLength: 3,
                // min: 3, max: 3 
                })} />
      {errors.cardCvv && (
        <p className="p_error">CVV must me 3 digits only</p>
      )}
{/* ------------------- */}

      <div className="divReset">
      <input type="reset" onClick={reset} />
      <input type="submit" />
      </div>
    </form>
    </>
  );
}

export default RegisterCard