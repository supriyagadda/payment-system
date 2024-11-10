import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showBottomCenterToast = (type, message) => {
  if(type=="success"){
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      transition: Bounce
    });
  }else if(type=="error"){
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      transition: Bounce
    });
  }
  
 
};
