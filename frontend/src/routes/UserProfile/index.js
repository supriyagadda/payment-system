import React, { useState } from 'react';
import "./index.css";
import { useForm } from "react-hook-form";


function UserProfilePage() {
  const storedData = sessionStorage.getItem('userDataInfo');
  const dataObject = JSON.parse(storedData);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        firstName: dataObject.firstname,
        lastName: dataObject.lastname,
        email:dataObject.emailid
      }
    }
  );

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
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
      >User Profile</p>
    </div>
    <div style={{marginLeft: "100px",marginTop:"20px"}}>

    <form style={{width:"500px"}} onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
      placeholder="Enter First Name"
      type="text"
        {...register("firstName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]/i
        })}
      />
      {errors?.firstName?.type === "required" && <p className="p_error">First Name is required</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p className="p_error">First Name cannot exceed 20 characters</p>
      )}
      {errors?.firstName?.type === "pattern" && (
        <p className="p_error">Alphabetical characters only</p>
      )}
{/* ------------------- */}
<label>Last Name</label>
      <input
      placeholder="Enter Last Name"
      type="text"
        {...register("lastName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]/i
        })}
      />
      {errors?.lastName?.type === "required" && <p className="p_error">Last Name is required</p>}
      {errors?.lastName?.type === "maxLength" && (
        <p className="p_error">Last Name cannot exceed 20 characters</p>
      )}
      {errors?.lastName?.type === "pattern" && (
        <p className="p_error">Alphabetical characters only</p>
      )}
{/* ------------------- */}
<label>Email Id</label>
      <input
      value="letsteachui@gmail.com"
      disabled
      {...register("email")}
      />


      <div className="divReset">
      <input type="reset" onClick={reset} />
      <input type="submit" />
      </div>
    </form>
    </div>
    </>
  )
}

export default UserProfilePage