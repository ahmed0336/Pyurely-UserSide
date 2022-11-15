// import React, { useState,useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
// // import Swal from 'sweetalert2'
// // import baseUrl from '../../../baseurl/BaseUrl';
// import "./PaymentFailedcss.css"


// export default function PaymentResponse() {
//   const [searchParams] = useSearchParams();
//   const store = useSelector(store => store)
//   const [Ids, setIds] = useState([]);


//   const Navigate = useNavigate()
//   const location = useLocation();




//   const Navi = () => {
//     Navigate("/")
//   }

// //   useEffect(() => {
// //     const params = new Proxy(new URLSearchParams(window.location.search), {
// //       get: (searchParams, prop) => searchParams.get(prop),
// //     });

// //     if (params.status != "true") {
// //       PaymentExecute()
      
    


// //     }



// //     // PaymentExecute()
// //   }, []);

//   const Token = localStorage.getItem("Token")

// //   const PaymentExecute = () => {
// //     // setLoader(true);
// //     const formData = new FormData();
// //     // formData.append("paymentId", searchParams.get('paymentId'));
// //     formData.append("startdate", store.counter.amount.state.startdate);
// //     formData.append("enddate", store.counter.amount.state.enddate);
// //     formData.append("starttime", store.counter.amount.state.starttime);
// //     formData.append("endtime", store.counter.amount.state.endtime);
// //     formData.append("totalamout", store.counter.amount.state.totalamout);
// //     formData.append("name", store.counter.form.state.fnames);
// //     formData.append("lastname", store.counter.form.state.lnames);
// //     formData.append("countrycode", store.counter.form.state.countrycode);
// //     formData.append("phone", store.counter.form.state.phonenumber);
// //     formData.append("alternatephone", store.counter.form.state.alphonenumber);
// //     formData.append("vehicleColor", store.counter.form.state.vehicleColor);
// //     formData.append("vehicleMake", store.counter.form.state.vehicleMake);
// //     formData.append("vehicleModel", store.counter.form.state.vehicleModel);
// //     formData.append("licensePlate", store.counter.form.state.licensePlate);
// //     formData.append("departure_airline", store.counter.form.state.departure_airline);
// //     formData.append("return_airline", store.counter.form.state.return_airline);
// //     formData.append("customerpay", searchParams.get('paymentId'));
// //     formData.append("customer", store.counter.amount.state.id);
// //     formData.append("service", store.counter.amount.state.serviceId);
// //     formData.append("email", store.counter.form.state.email);
// //     formData.append("paytype", store.counter.form.method);
// //     formData.append("additional", JSON.stringify( store.counter.amount.state.additionalid  ));


// //     var requestOptions = {
// //       method: 'POST',
// //       headers: {
// //         Authorization: "Bearer " + Token
// //       },
// //       body: formData,
// //     };
// //     fetch(`${baseUrl.baseUrl}webapi/customerbooking?role=customer`, requestOptions)
// //       .then(response => response.json())
// //       .then(result => {
// //         // setLoader(false);
// //         if (result.status === false) {
// //           Navigate("/PaymentFailed")
       
          
// //         } else {
// //           Swal.fire({
// //             title: "success",
// //             text: result.message,
// //             icon: "success",
// //             confirmButtonColor: "#03bafe",
// //           })
// //         }
// //       }).catch(error => {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Oops...',
// //           text: error,
// //           confirmButtonColor: "#03bafe",
// //         })
// //       });
// //   }


//   function tConvert (time) {
//     // Check correct time format and split into components
//     time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
//     if (time.length > 1) { // If time format correct
//       time = time.slice (1);  // Remove full string match value
//       time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
//       time[0] = +time[0] % 12 || 12; // Adjust hours
//     }
//     return time.join (''); // return adjusted time or original string
//   }

//   return (<>
//     {/* <Header /> */}
//     {/* <Slidar /> */}
//     <div className='container'>
//       <div className='row'>
//         <div className='col-md-12'>
//           <div className="bgfailed">
//             <div className="card">
//               <span className="card__success"><i className="fa fa-check" /></span>
//               <div className='row text-center'>
//                 <div className="col-md-12">
//                   <img src='assets/images/logo1.png' width="60%" height="100px" alt={""} />
//                 </div>
//               </div>
//               <h1 className="card__msg mt-2">Payment Complete</h1>
//               <h2 className="card__submsg">Thank you for your transfer</h2>
//               <div className="card__body">
//                 <div className="row">
//                   <div className='col-md-6 text-left'>
//                     <p>Name</p>
//                     <p>Email</p>
//                     <p>Start Date</p>
//                     <p>End Date</p>
//                     <p>Start Time</p>
//                     <p>End Time</p>
//                   </div>
//                   <div className='col-md-6 text-right'>
//                     {/* <p className="">{store.counter.amount.state.fname + " " + store.counter.amount.state.lname}</p> */}
//                     {/* <p className="">{store.counter.form.state.email}</p> */}
//                     {/* <p className="">{store.counter.amount.state.startdate}</p> */}
//                     {/* <p className="">{store.counter.amount.state.enddate}</p> */}
//                     {/* <p className="">{tConvert(store.counter.amount.state.starttime) }</p> */}
//                     {/* <p className="">{tConvert(store.counter.amount.state.endtime)}</p> */}
//                   </div>
//                 </div>
//                 {/* <span>Your Total Amount  <h1 className="card__price"><span>$</span>{store.counter.amount.state.totalamout.toFixed(2)}<span></span></h1></span> */}
//                 {/* <p className="card__method">Payment method</p> */}
//                 {/* <div className="card__payment">
//                   <div className="type" >
//                     <div className="logo">
//                       <i className="fa fa-paypal" style={{ fontSize: "40px" }} />
//                     </div>
//                     <div className="text"  >
//                       <p>Pay with PayPal</p>
//                     </div>
//                   </div>
//                 </div> */}
//                 <div className='col-md-12 text-center mt-3'>
//         <button onClick={() => Navi()} style={{ backgroundCOlor: "rgba(3, 156, 213)" }} type="button" className="btn btn-primary btn-lg">Back to Dashboard</button>
//       </div>
//                 {/* <div className="card__payment">
//                   <img src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png" className="card__credit-card" />
//                   <div className="card__card-details">
//                     <p className="card__card-type">Credit / debit card</p>
//                     <p className="card__card-number">Visa ending in **89</p>
//                   </div>
//                 </div> */}
//               </div>
//               {/* <div className="card__tags">
//                 <span className="card__tag">completed</span>
//                 <span className="card__tag">#123456789</span>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
 
//     </div>
//     {/* <Footer /> */}
//   </>
//   )
// }
