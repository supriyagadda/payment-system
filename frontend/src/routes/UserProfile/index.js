import React, { useState } from 'react';
import "./index.css";
import { useForm } from "react-hook-form";
import Config from "../../constants/EnvironmentConstants";
const backendBaseUrl = Config.BACKEND_BASE_URL;


function UserProfilePage() {
  const storedData = sessionStorage.getItem("userDataInfo");
  const dataObject = JSON.parse(storedData); // Parse user data from sessionStorage

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: dataObject.firstname,
      lastName: dataObject.lastname,
      email: dataObject.emailid
    }
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
   
    let crdPayload = {
      "firstname": data.firstName,
      "lastname": data.lastName,
      "userid": dataObject.userid // Use userid from session data
    };
   
    try {
      const response = await fetch(`${backendBaseUrl}update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crdPayload),
      });


      if (response.ok) {
        const updatedData = await response.json();
        // Update form fields with new values
        reset({
          firstName: updatedData.firstname,
          lastName: updatedData.lastname,
          email: dataObject.emailid // Retain email as unchanged
        });
        alert("User profile updated successfully!");
      } else {
        alert("Failed to update the profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // End loading
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
      value={dataObject.emailid}
      disabled
      {...register("email")}
      />


      <div className="divReset">
      <input type="reset" onClick={() => reset()} />
            <input
              type="submit"
              disabled={isLoading}
              value={isLoading ? "Updating..." : "Submit"}
            />
      </div>
    </form>
    </div>
    </>
  )
}

export default UserProfilePage