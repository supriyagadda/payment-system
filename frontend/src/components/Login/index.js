import { useState } from "react";

import { authTypes } from "../../constants/ApplicationConstants";

import KeyIcon from "../../icons/KeyIcon";
import EmailIcon from "../../icons/EmailIcon";
import PersonIcon from "../../icons/PersonIcon";
import { GiTakeMyMoney } from "react-icons/gi";
import abc from"./vega.jpg"

import "./index.css";

const Login = ({ onClickLogin, onClickRegister }) => {
  const [authType, setAuthType] = useState(authTypes.login);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const renderIllustration = () => (
    <div className="illustration-container">
      <img
        src="/images/vega.jpg"
        className="illustration-image"
        alt="login-illustration"
      />
    </div>
  );

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeFirsName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const renderEmail = () => {
    return (
      <div className="field-container">
        <div>
          <EmailIcon />
        </div>
        <div className="label-tag-container">
          <label>Email</label>
          <input className="login-form-container_input" type={"email"} value={email} onChange={onChangeEmail} />
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
          <input className="login-form-container_input" type={"text"} value={firstName} onChange={onChangeFirsName} />
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
          <input
           className="login-form-container_input"
            type={showPassword?"text":"password"}
            value={password}
            onChange={onChangePassword}
          />
        </div>
      </div>
    );
  };

  const onClickLoginButton = () => {
    const requestObject = {
      emailid: email,
      password: password
    };

    onClickLogin(requestObject);
  };

  const onClickRegisterButton = () => {
    const requestObject = {
      emailid: email,
      password: password,
      firstname: firstName,
      lastname: lastName
    };

    onClickRegister(requestObject);
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
