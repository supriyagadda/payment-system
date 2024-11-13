import { apiResponseConstants } from "../../constants/BackendConstants";
import Config from "../../constants/EnvironmentConstants";

const backendBaseUrl = Config.BACKEND_BASE_URL;

class AuthService {
  login = async (requestObject, onSuccess, onFailure) => {
    // console.log("RSR User Data:00", requestObject)

    try {
      const response = await fetch(`${backendBaseUrl}login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      });

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        throw new Error(`Invalid Credentials`)
      }

      const result = await response.json();
      
      if (result.userid) {
        // console.log("RSR User Data:11", result)
        onSuccess(result);
        const resultNew = sessionStorage.getItem('userDataInfo');
        // console.log("RSR User Data:111", resultNew)

        if(resultNew){
          // console.log("RSR User Data:111", resultNew)

          const userDataInfo = JSON.parse(resultNew);
          // console.log("RSR User Data:1111", userDataInfo)

  
          // userDataInfo.userid=result.userid,
          // userDataInfo.statusid=result.statusid,
          // userDataInfo.firstname=result.firstname,
          // userDataInfo.lastname=result.lastname,
          // userDataInfo.emailid=result.emailid,
          // userDataInfo.password=result.password,
  
  
          sessionStorage.setItem('userDataInfo', JSON.stringify(result));
          console.log('Session storage updated:', userDataInfo);
    } else {
        console.error('No existing data found to update');
    }


      } else {
      // console.log("RSR User Data:22", result)
        
        onFailure(result.respMessage)};
    } catch (error) {
      // console.log("RSR User Data:33", error)

      onFailure(error.message);
    }
  };

  register = async (requestObject, onSuccess, onFailure) => {
    try {
      const response = await fetch(`${backendBaseUrl}signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      });

      

      const result = await response.json();

      if (result.userid) {
        onSuccess(result);
      } else onFailure(result.respMessage);
    } catch (error) {
      onFailure(error.message);
    }
  };
}

export default AuthService;
