import { useState } from "react";

import { authTypes } from "../../constants/ApplicationConstants";

import KeyIcon from "../../icons/KeyIcon";
import EmailIcon from "../../icons/EmailIcon";
import PersonIcon from "../../icons/PersonIcon";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import abc from"./vega.jpg"

import "./index.css";

const Login = ({ onClickLogin, onClickRegister }) => {
  const [authType, setAuthType] = useState(authTypes.login);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must have at least 8 characters, one uppercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };

   // Input change handlers with real-time validation
   const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address" }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
  };


  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    if (!validateName(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: "First name is required" }));
    } else {
      setErrors((prevErrors) => {
        const { firstName, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    if (!validateName(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: "Last name is required" }));
    } else {
      setErrors((prevErrors) => {
        const { lastName, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (authType === authTypes.register) {
      if (!e.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "Password cannot be empty" }));
      } else if (!validatePassword(e.target.value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be 8+ chars with 1 uppercase, 1 number, & 1 special character (e.g., Pass123!)"
        }));
      } else {
        setErrors((prevErrors) => {
          const { password, ...rest } = prevErrors;
          return rest;
        });
      }
    } else {
      // Login case
      if (!e.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "Password cannot be empty" }));
      } else {
        setErrors((prevErrors) => {
          const { password, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

 

 // Validation logic based on form type (login or register)
 const handleValidation = () => {
  const newErrors = {};

  // Email validation (applies to both login and registration)
  if (!validateEmail(email)) {
    newErrors.email = "Invalid email address";
  }

  // Password validation with different rules for login and registration
  if (authType === authTypes.login) {
    if (!password) {
      newErrors.password = "Password cannot be empty";
    }
  } else if (authType === authTypes.register) {
    if (!password) {
      newErrors.password = "Password cannot be empty";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be 8+ chars with 1 uppercase, 1 number, & 1 special character (e.g., Pass123!).";
    }

    // Additional registration-specific validations
    if (!validateName(firstName)) {
      newErrors.firstName = "First name is required";
    }
    if (!validateName(lastName)) {
      newErrors.lastName = "Last name is required";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const renderIllustration = () => (
    <div className="illustration-container">
      <img
        src="/images/vega.jpg"
        className="illustration-image"
        alt="login-illustration"
      />
    </div>
  );



  const renderEmail = () => {
    return (
      <div className="field-container">
        <div>
          <EmailIcon />
        </div>
        <div className="label-tag-container">
          <label>Email</label>
          <input className="login-form-container_input" type={"email"} value={email} onChange={onChangeEmail} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
       
      </div>
      
    );
  };

  const renderFirstName = () => {
    return (
      <div className="field-container">
        <div>
          <PersonIcon />
        </div>
        <div className="label-tag-container">
          <label>First Name</label>
          <input className="login-form-container_input" type={"text"} value={firstName} onChange={onChangeFirstName} />
          {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
        </div>
      </div>
    );
  };

  const renderLastName = () => {
    return (
      <div className="field-container">
        <div>
          <PersonIcon />
        </div>
        <div className="label-tag-container">
          <label>Last Name</label>
          <input className="login-form-container_input" type={"text"} value={lastName} onChange={onChangeLastName} />
          {errors.lastName && (
          <span className="error-message">{errors.lastName}</span>
        )}
        </div>
      </div>
    );
  };

  const renderPassword = () => {
    return (
      <div className="field-container">
      <div>
        <KeyIcon />
      </div>
      <div className="label-tag-container">
        <label>Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="login-form-container_input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
          />
          <span onClick={toggleShowPassword} style={{ cursor: "pointer", marginLeft: "8px" }}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
    </div>
    );
  };

  const onClickLoginButton = () => {
    if (handleValidation()) { // Only call onClickLogin if validation passes
    const requestObject = {
      emailid: email,
      password: password
    };

    onClickLogin(requestObject);
  }
  };

  
  const onClickRegisterButton = () => {
    if (handleValidation()) { // Only call onClickLogin if validation passes
    const requestObject = {
      emailid: email,
      password: password,
      firstname: firstName,
      lastname: lastName
    };

    onClickRegister(requestObject);
  }
  };

  const renderLoginButton = () => {
    return (
      <button
        onClick={
          authType === authTypes.login
            ? onClickLoginButton
            : onClickRegisterButton
        }
        className="login-button"
        style={{padding:"17px"}}>
        {authType === authTypes.login ? `Login` : `Register`}
      </button>
    );
  };

  const onClickRegisterOrLoginText = () => {
    setAuthType(
      authType === authTypes.register ? authTypes.login : authTypes.register
    );
  };

  const renderFooterText = () => {
    return (
      <div>
        {authType === authTypes.login ? (
          <span className="footer-text">
            Don't have an account?
            <span
              onClick={onClickRegisterOrLoginText}
              className="login-or-register-text"
            >
              {" "}
              Register
            </span>
          </span>
        ) : (
          <span className="footer-text">
            Already have an account?
            <span
              onClick={onClickRegisterOrLoginText}
              className="login-or-register-text">
              {" "}
              Login
            </span>
          </span>
        )}
      </div>
    );
  };

  const renderRegistrationFields = () => (
    <>
      {renderFirstName()} {renderLastName()}
    </>
  );

  const renderLoginForm = () => {
    return (
      <div className="login-form-container" style={{position:"absolute", right:"40px"}}>
        <div className="heading-container">
          <p className="brand-text" >Vega Pay</p>
          <span style={{ marginTop: "4px" }}><GiTakeMyMoney style={{fontSize: "80px",paddingBottom:"15px" }} /></span>
        </div>
        {renderEmail()}
        {authType === authTypes.register ? renderRegistrationFields() : null}
        {renderPassword()}
        {renderLoginButton()}
        {renderFooterText()}
      </div>
    );
  };

  return (
    <div className="login-page-container" style={{paddingLeft:"0px", backgroundImage:`url(${abc})`, backgroundSize: "cover",
    backgroundPosition: "center"}}>
      {/* {renderIllustration()} */}
      {renderLoginForm()}
    </div>
  );
};


export default Login;
