import "./index.css";
import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { showBottomCenterToast } from "../../utils/ToastUtils";
import { MdDelete } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Config from "../../constants/EnvironmentConstants";
const backendBaseUrl = Config.BACKEND_BASE_URL;



function ViewCards({refresh,onCardDeleted}) {

  const [allCards, setAllCards] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Store the card to be deleted

  useEffect(()=>{
        fetchCards()
  },[refresh])
  
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

  const deleteCard = async () => {
    if (!selectedCard) {
      console.error("No card selected for deletion.");
      return;
    }
  
    console.log("Selected Card for deletion:", selectedCard); // Debugging log
    const storedData = sessionStorage.getItem('userDataInfo');
    const dataObject = JSON.parse(storedData);
    let crdPayload = {
        "userid": dataObject.userid,
        "cardid": selectedCard.cardid
    }
      
    try {
      const response = await fetch(`${backendBaseUrl}deletecard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crdPayload),
      });
  
      if (response.ok) {
        setShowConfirmModal(false);
        setShowSuccessModal(true); // Show success modal
        if (onCardDeleted) {
          onCardDeleted(); // Trigger refresh in the parent
        }
      } else {
        showBottomCenterToast('error', 'Failed to delete the card');
      }
    } catch (error) {
      showBottomCenterToast('error', `Request failed: ${error.message}`);
    }
  };
  
;

const confirmDelete = (card) => {
  setSelectedCard(card);
  setShowConfirmModal(true); // Show confirmation modal
};

  return (
    <>
    {/* Confirmation Modal */}
    <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the card? 
          {/* with card number <strong>{selectedCard?.cardnumber}</strong> */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteCard}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Success Modal */}
    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Card Deleted</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The card 
          {/* <strong>{selectedCard?.cardnumber}</strong>*/}
            has been successfully deleted.</p> 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>

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
                                      <MdDelete style={{ fontSize: "24px", color: "red" }} onClick={() => { confirmDelete(item) }} />
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
                                      item.cardtype === "Master Card" && <span><FaCcMastercard style={{ fontSize: "30px" }} /></span>
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
                <p>No Cards are availabe, Please Register your Card</p>
                </>
                    
              }

          </div>
      </>
  );
}

export default ViewCards