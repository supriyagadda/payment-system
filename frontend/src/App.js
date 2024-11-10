import React, { useState,useEffect } from "react";
import { Routes, Route ,useLocation} from "react-router-dom";
import "./App.css";
import LoginPage from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  const [dummyData] =useState(
    {
      "userid": "",
      "statusid": "",
      "firstname": "",
      "lastname": "",
      "emailid": "",
      "password": ""
  }
  )
  useEffect(()=>{

if(
lastPath == "login"
){

  sessionStorage.setItem('userDataInfo', JSON.stringify(dummyData));
}
  },[dummyData])

  useEffect(() => {
    if(lastPath == "login"){
console.log("Reload")
    }else{

      // This event will trigger when the page is refreshed or closed
      const handleBeforeUnload = (event) => {
          const message = "Are you sure you want to leave? Any unsaved changes will be lost.";
          event.returnValue = message; // Standard for most browsers
          return message; // For some older browsers
      };
  
      // Add event listener when component mounts
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
}, []);
  const location = useLocation();
  const lastPath = location.pathname.split("/").filter(Boolean).pop();
  return (
    <div className="App">
      {
        lastPath == "login" ? 
        <Routes>
          <Route path="/login" element={<ProtectedRoute element={LoginPage} path="/login" />}/>
        </Routes>
        :
      <LandingPage/>      
      }
    </div>
  );
}

export default App;
