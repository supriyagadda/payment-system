// import React from 'react';
// import Modal from 'react-bootstrap/Modal';


// function BillPayModel({show, handleClose}) {
//   return (
//     <>
//      <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{billTypeName} Bill</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <form onSubmit={handleSubmit(onSubmit)}>
//       <label>Account No</label>
//       <input
//       placeholder="Enter Account No"
//       type="text"
//         {...register("accountNo", {
//           required: true,
//           maxLength: 10,
//           pattern: /^[0-9]/i
//         })}
//       />
//       {errors?.accountNo?.type === "required" && <p className="p_error">Account No is required</p>}
//       {errors?.accountNo?.type === "maxLength" && (
//         <p className="p_error">Account No cannot exceed 10 characters</p>
//       )}
//       {errors?.accountNo?.type === "pattern" && (
//         <p className="p_error">Numbers only</p>
//       )}
// {/* ------------------- */}
// <label>Bill Amount</label>
// <input
//       placeholder="Enter Bill Amount"
//       {...register("billAmount",{required: true})}
//       />
//       {errors?.billAmount?.type === "required" && <p className="p_error">Bill Amount is required</p>}

// {/* ------------------- */}
// <label>Payment Card</label>
//       <select {...register("paymentCard", {required: true})} className='inputSelect'>
//         <option value="">Select Card</option>
//         <option value="4323-8765-0995-4567">4323-8765-0995-4567</option>
//         <option value="8765-8876-0995-4567">8765-8876-0995-4567</option>
//         <option value="8995-6655-1221-4567">8995-6655-1221-4567</option>
//       </select>
//       {errors?.paymentCard?.type === "required" && <p className="p_error">Select Payment Card is required</p>}


// <hr/>
// <div className="divReset" style={{
//     justifyContent: "end"

// }}>
//       <input style={{margin:"0px 10px 0px 0px"}} type="reset" onClick={reset} />
//       <input style={{margin:"0px"}}  type="submit" value="Pay"/>
//       </div>
    
//     </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

// export default BillPayModel