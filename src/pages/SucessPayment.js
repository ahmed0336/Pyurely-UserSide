import React from 'react'
import "./SucessPaymentcss.css"
import { useNavigate} from "react-router-dom";
import { AddtoCartaction } from '..//Redux/Actions/ActionFunction';
import { useSelector, useDispatch } from 'react-redux';


export default function PaymentFailed() {
  const Navigate = useNavigate()
  const dispatch = useDispatch();

  const addcartdetail = useSelector((state) => state.counter.myCart)
	console.log("header addcartdetail ==> ", addcartdetail)


    const Navi = ()=>{

        dispatch(AddtoCartaction([]))
        Navigate("/")



    }
  return (


   <>
    <div className='container'>

<div className='row'>

  <div className='col-md-12'>
    <div className="bgsucess">
      <div className="card">
        <span className="card_color"><i className="fa fa-check"  /></span>
        <div className='row text-center'>
          <div className="col-md-12">

            <img src='assets/images/logo1.png' width="60%" height="100px" alt={""}/>
          </div>

        </div>

        <h1 className="card__msg mt-2">Payment Complete</h1>
        {/* <h2 className="card__submsg">Thank you for your transfer</h2> */}
        <div className="card__body">

          {/* <div className="row">
            <div className='col-md-6 text-left'>
              <p>Name</p>
              <p>Email</p>
              <p>Start_Date</p>
              <p>End_Date</p>
              <p>Start_Time</p>
              <p>End_Time</p>




            </div>

            <div className='col-md-6 text-right'>

               <p className="">{store.counter.amount.state.fname + " " + store.counter.amount.state.lname}</p>
              <p className="">{store.counter.amount.state.email}</p>
              <p className="">{store.counter.amount.state.startdate}</p>
              <p className="">{store.counter.amount.state.enddate}</p>
              <p className="">{store.counter.amount.state.starttime}</p>
              <p className="">{store.counter.amount.state.endtime}</p> 



            </div>

          </div> */}
        {/* <span>Your Total Amount  <h1 className="card__price"><span>$</span>{store.counter.amount.state.totalamout}<span>.00</span></h1></span> */}
          {/* <p className="card__method">Payment method</p> */}
          <div className="card__payment">
<p>Thank you for your Order</p>
     
            </div>
            <div className='col-md-12 text-center mt-3'>


<button onClick={()=>Navi()}  style={{ backgroundCOlor: "rgba(3, 156, 213)" }} type="button" className="btn btn-primary btn-lg">Back to Dashboard</button>
</div>
          {/* <div className="card__payment">
            <img src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png" className="card__credit-card" />
            <div className="card__card-details">
              <p className="card__card-type">Credit / debit card</p>
              <p className="card__card-number">Visa ending in **89</p>
            </div>
          </div> */}
        </div>
       
      </div>
    </div>

  </div>

</div>


</div>
   
   </>
  )
}
