import "./index.css";
import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { showBottomCenterToast } from "../../utils/ToastUtils";
import { MdDelete } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { Link } from "react-router-dom";
import Config from "../../constants/EnvironmentConstants";
const backendBaseUrl = Config.BACKEND_BASE_URL;



function ViewCards() {

  const [allCards, setAllCards] = useState([]);
  useEffect(()=>{
        fetchCards()
  },[])
  
  const fetchCards = async (payload) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);    
    try {
        const response = await fetch(`${backendBaseUrl}getcards?userid=${dataObject.userid}`, {       
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setAllCards([...data])
    } catch (error) {
      showBottomCenterToast('error',`Request failed: ${error.message}`);
    }
  };

  const deleteCard = async (cardId) => {
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);
    let crdPayload = {
        "userid": dataObject.userid,
        "cardid": cardId
    }
      
    try {
      const response = await fetch(`${backendBaseUrl}deletecards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crdPayload),
      });
  
      if (response.ok) {
        console.log('Card deleted successfully');
      } else {
        console.error('Failed to delete the card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
;

  return (
      <>
          <div style={{ marginBottom: "10px" }}>
              {
                allCards.length > 0 ?
                  allCards.map((item, index) => (
                      <div className='bgShadow' style={{ width: "30%", marginTop: "25px", padding: "20px 20px 10px 20px", marginRight: "10px", borderRadius: "5px" }}>
                          <p key={index}>
                              <span style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "10px"
                              }}>
                                  <span>{item.cardholdername}</span>
                                  <span>
                                      <MdDelete style={{ fontSize: "24px", color: "red" }} onClick={() => { deleteCard(item.cardid) }} />
                                  </span>
                              </span>
                              <p style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                              }}>
                                  <span>{item.cardnumber}</span>
                                  <span>{item.expirydate}</span>
                                  {
                                      item.cardtype === "Visa" && <span><FaCcVisa style={{ fontSize: "30px" }} /></span>
                                  }
                                  {
                                      item.cardtype === "Master" && <span><FaCcMastercard style={{ fontSize: "30px" }} /></span>
                                  }
                                  {
                                      item.cardtype === "American Express" && <span><SiAmericanexpress style={{ fontSize: "30px" }} /></span>
                                  }
                              </p>
                          </p>

                      </div>
                  ))
                  :
                <>
                <p>No Card are availabe, Please Register your Card</p>
                </>
                    
              }

          </div>
      </>
  );
}

export default ViewCards