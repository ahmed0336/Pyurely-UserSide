import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import StripeCheckout from 'react-stripe-checkout';

import { useSelector, useDispatch } from 'react-redux';

import { AddtoCartaction } from '..//Redux/Actions/ActionFunction';
import { useState } from 'react';
import { Button } from 'antd';
import { Loader } from 'react-overlay-loader';
 import Swal from 'sweetalert2'


const Checkout = () => {


    // const onToken = (token) => {

    //      console.log("stripe token",token.id)
    //     fetch('/save-stripe-token', {
    //         method: 'POST',
    //         body: JSON.stringify(token),
    //     }).then(response => {
    //         response.json().then(data => {
    //             alert(`We are in business, ${data.email}`);
    //         });
    //     });
    // }
    const Navigate = new useNavigate();

    const [FirstName, SetFirstName] = useState('')
    const [LastName, SetLastName] = useState('')
    const [Address, SetAddress] = useState('')
    const [City, SetCity] = useState('')
    const [Country, SetCountry] = useState('')
    const [PostCode, SetPostCode] = useState('')
    const [Email, SetEmail] = useState('')
    const [Phone, SetPhone] = useState('')

    const [loader, setLoader] = useState(false)

    const [couponbtn, setcouponbtn] = useState(false)

    const [CouponDetail, setCouponDetail] = useState([])


    const [ApplyCoupon, setApplyCoupon] = useState(false)
    const [Discount, setDiscount] = useState('')


    // couponcodeinput
    const [CouponCodeInput, SetCouponCodeInput] = useState('')
    



    // const [alldata, setalldata] = useState()

    // const initialvalues = {
    //     fname: "",
    //     lname: ""
    //   };
    // const [currentUser, setCurrentUser] = useState();


    // const handleEditInputChange = (e) => {
    //     // set the new state value to what's currently in the edit input box

    //     // setCurrentUser({ ...currentUser, FirstName: e.target.value, LastName: e.target.value });
    //     setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });


    // }

    // console.log("current user object ==>",currentUser)
    const Token = localStorage.getItem('token')


    const addcart = useSelector((state) => state.counter.myCart)
    console.log("checkout page==>", addcart)



    useEffect(() => {

        addcart.map((a, i) => {
            console.log("map of map", a)
            if (i === 0) {
                setTotal(Number(a.price) * Number(a.quantity))

            } else {
                setTotal((perv) => perv + (Number(a.price) * Number(a.quantity)))
                // console.log(Number(a.price) * Number(a.quantity) -CouponDetail.discount )

            }



        })


    }, [addcart])






    const [Total, setTotal] = useState([])

    const onToken = (token) => {
        console.log("usman token==>", token)
        PaymentExecute(token.id, "stripe")
    }

    const PaymentExecute = (token, method) => {
        console.log("paymentexecute running", token)




        var formdata = new FormData();

        formdata.append("amount", Total);
        formdata.append("token", token);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://pyurelyecommerce.pythonanywhere.com/api/GenerateStripeToken", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("token of api==>", result)
                console.log("token of api==>", result.stripePay)
                if (result.status == true) {

                    OrderDetailFunction(result.stripePay)
                }

            }

            )
            .catch(error => console.log('error', error));


    }

    const paymentStripe = () => {
        // e.preventDefault()
        // console.log("click")
        let a = document.getElementById('paymentmethod')
        a.children[0].click()
        // a.children[0].click()
    }

    const OrderDetailFunction = (token) => {

        var formdata = new FormData();

        formdata.append("firstname", FirstName);
        formdata.append("lastname", LastName);
        formdata.append("address", Address);
        formdata.append("city", City);
        formdata.append("state", Country);
        formdata.append("zipcode", PostCode);
        formdata.append("emailAddress", Email);
        formdata.append("phone", Phone);
        formdata.append("product", JSON.stringify(addcart));
        formdata.append("paymentmethod", 'stripe');
        formdata.append("paymenttoken", token);

        formdata.append("Coupanid", CouponDetail.uid);
        formdata.append("discount", Discount);
        formdata.append("Total", Total);






        // coupon id 
        // coupon discount price
        // coupon status



        // formdata.append("amount", Total);
        var requestOptions = {
            method: 'POST',
            // Token
            // headers: myHeaders,
            headers: {
                Authorization: "Bearer " + Token
            },
            body: formdata,
            redirect: 'follow'
        };
        setLoader(true)

        fetch("https://pyurelyecommerce.pythonanywhere.com/api/orderDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == true) {
                    setLoader(false)
                    console.log("order is sucessfully==>", result)
                    Navigate('/sucesspayment')
                }
                else {

                    setLoader(false)
                }

            }

            )
            .catch(error => {
                setLoader(false)
                console.log('error', error)
            }
            );

    }


    const ahmed = () => {
        setcouponbtn(!couponbtn)
    }


    // get coupon detail

    // useEffect(() => {

    //     GetCouponDetail()

    // }, [])

    const GetCouponDetail = () => {


        const ahmed = Total - (Total * CouponDetail.discount) / 100
        console.log("discount price ==>", ahmed)

        // setDiscount(ahmed)

        // setApplyCoupon(true)

        // console.log("value of abc=>",CouponCodeInput)

        // var formdata = new FormData();

        // formdata.append("coupan_code",CouponCodeInput);
        setLoader(true)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://pyurelyecommerce.pythonanywhere.com/api/GetCoupan?coupan_code=${CouponCodeInput}`, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.status == true) {
                    console.log("coupon api ===>", result)
                    console.log("coupon api ===>", result.data[0].coupan_status)

                    setCouponDetail(result.data[0])
                    setDiscount(ahmed)
                    

                    Swal.fire({
                        title: "success",
                        text: "Coupon Apply Sucessfully",
                        icon: "success",
                        confirmButtonColor: "#29BF12",
                    });
                    SetCouponCodeInput('')
                    setLoader(false)


                }
                else {
                    setLoader(false)
                    Swal.fire({
                        title: "Oops",
                        text: result.message,
                        icon: "error",
                        confirmButtonColor: "#29BF12",
                    });

                }

            })
            .catch(error =>
                { 
                    setLoader(false)
                    console.log('error', error)
            }
                );

    }


    // const MyCouponApply = () => {

    //     // alert("coupon applied")

    //     // const ahmed =addcart.toal
    //     const ahmed = Total - (Total * CouponDetail.discount) / 100
    //     console.log("discount price ==>", ahmed)

    //     setDiscount(ahmed)

    //     setApplyCoupon(true)


    // }





    return (
        <>
            {/* <body class="checkout"> */}

            {/* <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience.</p> */}
            {loader == true ?
                <Loader fullPage loading /> : null
            }

            <div id="page-wraper">
                {/* <!-- header-area-start --> */}
                <Header />

                {/* <!-- header-area-end -->
			<!-- breadcrumbs-area-start --> */}
                <div class="breadcrumbs-area">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="breadcrumb-content text-center">
                                    <h2>checkout</h2>
                                    <ul>
                                        <li><a href="/">Home /</a></li>
                                        <li class="active"><a href="javascript:void(0)">checkout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- breadcrumbs-area-end -->
			<!-- shop-main-area-start --> */}
                <div class="shop-main-area">
                    {/* <!-- coupon-area-area-start --> */}

                    {
                        // CouponDetail.coupan_status == true ?
                        // CouponDetail.coupan_status == true ?

                            // <div class="coupon-area">
                            //     <div class="container">
                            //         <div class="row">
                            //             <div class="col-lg-12">
                            //                 <div class="coupon-accordion">
                            //                     <h3>Discount We are Offering are? <span id="showlogin"><h1>{CouponDetail.discount} %</h1></span></h3>
                            //                     {/* <div class="coupon-content" id="checkout-login">
                            //                     <div class="coupon-info">
                            //                         <p class="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est sit amet ipsum luctus.</p>
                            //                         <form action="#">
                            //                             <p class="form-row-first">
                            //                                 <label>Username or email <span class="required">*</span></label>
                            //                                 <input type="text" />
                            //                             </p>
                            //                             <p class="form-row-last">
                            //                                 <label>Password  <span class="required">*</span></label>
                            //                                 <input type="text" />
                            //                             </p>
                            //                             <p class="form-row">
                            //                                 <input type="submit" value="Login" />
                            //                                 <label>
                            //                                     <input type="checkbox" />
                            //                                     Remember me
                            //                                 </label>
                            //                             </p>
                            //                             <p class="lost-password">
                            //                                 <a href="#">Lost your password?</a>
                            //                             </p>
                            //                         </form>
                            //                     </div>
                            //                 </div> */}
                            //                     <h3>Have a coupon? <span id="showcoupon" onClick={ahmed} >Click here to  Apply Coupon</span></h3>
                            //                     <div class="coupon-checkout-content" id="checkout_coupon" style={couponbtn ? { display: "block" } : { display: "none" }} >
                            //                         <div class="coupon-info">
                            //                             {/* <form action="#"> */}
                            //                             <p class="checkout-coupon">
                            //                                 <input type="text" placeholder="Coupon code" 
                            //                                  onChange={(e)=>{ SetCouponCodeInput(e.target.value) }}
                            //                                   />
                            //                                 <input type="button" onClick={GetCouponDetail} value="Apply Coupon" />
                            //                             </p>
                            //                             {/* </form> */}
                            //                         </div>
                            //                     </div>
                            //                 </div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                            // :
                            // console.log("hide")
                            // null

                        // CouponDetail.map((a)=>{
                        //     return(
                        //         <>
                        //         </>
                        //     )
                        // })
                    }


                    {/* <!-- coupon-area-area-end -->
				<!-- checkout-area-start --> */}
                    <div class="checkout-area">
                        <div class="container">
                            {/* <form action="#"> */}
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div class="checkbox-form">
                                        <h3>Billing Details</h3>
                                        <div class="row">
                                            {/* <div class="col-xl-12">
                                                <div class="country-select">
                                                    <label>Country <span class="required">*</span></label>
                                                    <select>
                                                      <option value="volvo">bangladesh</option>
                                                      <option value="saab">Algeria</option>
                                                      <option value="mercedes">Afghanistan</option>
                                                      <option value="audi">Ghana</option>
                                                      <option value="audi2">Albania</option>
                                                      <option value="audi3">Bahrain</option>
                                                      <option value="audi4">Colombia</option>
                                                      <option value="audi5">Dominican Republic</option>
                                                    </select> 										
                                                </div>
                                            </div> */}
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12 ">
                                                <div class="checkout-form-list">
                                                    <label>First Name <span class="required">*</span></label>
                                                    <input type="text" placeholder="First Name"
                                                        onChange={(e) => { SetFirstName(e.target.value) }}
                                                    // value={currentUser.FirstName}
                                                    // onChange={handleEditInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div class="checkout-form-list">
                                                    <label>Last Name <span class="required">*</span></label>
                                                    <input type="text" placeholder="Last Name"
                                                        //  value={currentUser.LastName}
                                                        //  onChange={handleEditInputChange}
                                                        onChange={(e) => { SetLastName(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div class="col-xl-12">
                                                <div class="checkout-form-list">
                                                    <label>Company Name</label>
                                                    <input type="text" placeholder=""/>
                                                </div>
                                            </div> */}
                                            <div class="col-xl-12">
                                                <div class="checkout-form-list">
                                                    <label>Address <span class="required">*</span></label>
                                                    <input type="text" placeholder="Street address"
                                                        onChange={(e) => { SetAddress(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div class="col-xl-12">
                                                        <div class="checkout-form-list">
                                                            <input type="text" placeholder="Apartment, suite, unit etc. (optional)" />
                                                        </div>
                                                    </div> */}
                                            <div class="col-xl-12">
                                                <div class="checkout-form-list">
                                                    <label>Town / City <span class="required">*</span></label>
                                                    <input type="text" placeholder="Town / City"
                                                        onChange={(e) => { SetCity(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div class="checkout-form-list">
                                                    <label>State / County <span class="required">*</span></label>
                                                    <input type="text" placeholder="State / County"
                                                        onChange={(e) => { SetCountry(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div class="checkout-form-list">
                                                    <label>Postcode / Zip <span class="required">*</span></label>
                                                    <input type="number" min={"0"} placeholder="Postcode / Zip"
                                                        onChange={(e) => { SetPostCode(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div class="checkout-form-list">
                                                    <label>Email Address <span class="required">*</span></label>
                                                    <input type="email" placeholder="Email Address"
                                                        onChange={(e) => { SetEmail(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div class="checkout-form-list">
                                                    <label>Phone Number  <span class="required">*</span></label>
                                                    <input type="number" min={"0"} placeholder="Phone Number"
                                                        onChange={(e) => { SetPhone(e.target.value) }}

                                                    />
                                                </div>
                                            </div>

                                            {/* <div class="col-xl-12">
                                                <div class="checkout-form-list create-acc">
                                                    <input type="checkbox" id="cbox" />
                                                    <label>Create an account?</label>
                                                </div>
                                                <div class="checkout-form-list create-account" id="cbox_info"  >
                                                    <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                                    <label>Account password  <span class="required">*</span></label>
                                                    <input type="password" placeholder="password" />
                                                </div>
                                            </div> */}
                                          
                                            <div class="col-xl-12">
                                            <div class="coupon-area">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="coupon-accordion">
                                                          
                                                          {
                                                            CouponDetail.coupan_status == true ?
                                                                <h6>Discount We are Offering are? <span id="showlogin"><h1>{CouponDetail.discount} %</h1></span></h6>
                                                                :
                                                                null

                                                          }
                                                                {/* <div class="coupon-content" id="checkout-login">
                                                <div class="coupon-info">
                                                    <p class="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est sit amet ipsum luctus.</p>
                                                    <form action="#">
                                                        <p class="form-row-first">
                                                            <label>Username or email <span class="required">*</span></label>
                                                            <input type="text" />
                                                        </p>
                                                        <p class="form-row-last">
                                                            <label>Password  <span class="required">*</span></label>
                                                            <input type="text" />
                                                        </p>
                                                        <p class="form-row">
                                                            <input type="submit" value="Login" />
                                                            <label>
                                                                <input type="checkbox" />
                                                                Remember me
                                                            </label>
                                                        </p>
                                                        <p class="lost-password">
                                                            <a href="#">Lost your password?</a>
                                                        </p>
                                                    </form>
                                                </div>
                                            </div> */}
                                                                <h6>Enter a gift card ,voucher or promotional code? <span id="showcoupon" onClick={ahmed} >Click here to  Apply </span></h6>
                                                                <div class="coupon-checkout-content" id="checkout_coupon"
                                                                 style={couponbtn ? { display: "block" } : { display: "none" }} 
                                                                //  style={couponbtn ? { display: "block" } : { display: "none" }} 
                                                                 
                                                                 >
                                                                    <div class="coupon-info">
                                                                        {/* <form action="#"> */}
                                                                        <p class="checkout-coupon">
                                                                            <input type="text" placeholder="Coupon code"
                                                                            onChange={(e)=>{ SetCouponCodeInput(e.target.value) }}
                                                                            
                                                                            />
                                                                            <input type="button" onClick={GetCouponDetail} value="Apply Coupon" />
                                                                            
                                                                        </p>
                                                                        {/* </form> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">

                                    <div class="your-order">
                                        <h3>Your order</h3>

                                        <div class="your-order-table table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="product-name">Product</th>
                                                        <th class="product-total">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        addcart.map((result, index) => {
                                                            return (
                                                                <>
                                                                    <tr class="cart_item">
                                                                        <td class="product-name">
                                                                            {result.name} <strong class="product-quantity"> ×  {result?.quantity}</strong>
                                                                        </td>
                                                                        <td class="product-total">
                                                                            <span class="amount">{result?.price}</span>
                                                                        </td>
                                                                    </tr>

                                                                </>
                                                            )
                                                        })

                                                    }
                                                    {/* <tr class="cart_item">
                                                                <td class="product-name">
                                                                    Vestibulum dictum magna	<strong class="product-quantity"> × 1</strong>
                                                                </td>
                                                                <td class="product-total">
                                                                    <span class="amount">£50.00</span>
                                                                </td>
                                                            </tr> */}
                                                </tbody>
                                                <tfoot>
                                                    <tr class="cart-subtotal">
                                                        <th>Cart Subtotal</th>
                                                        <td><span class="amount">{Total}</span></td>
                                                    </tr>
                                                    {/* <tr class="shipping">
                                                                <th>Shipping</th>
                                                                <td>
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>
                                                                                Flat Rate: <span class="amount">£7.00</span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>Free Shipping:</label>
                                                                        </li>
                                                                        <li></li>
                                                                    </ul>
                                                                </td>
                                                            </tr> */}
                                                    {
                                                        // ApplyCoupon == true ?
                                                        CouponDetail.coupan_status == true ?


                                                            <>

                                                                <tr class="cart-subtotal">
                                                                    <th>Applying Coupon</th>
                                                                    <td><strong><span class="amount">{(Total * CouponDetail.discount) / 100} </span></strong>
                                                                        {/* <td><strong><span class="amount">{ (Total  * CouponDetail.discount)/100 } </span></strong> */}

                                                                    </td>
                                                                </tr>

                                                                <tr class="order-total">
                                                                    <th>Order Total</th>
                                                                    {/* <td><strong><span class="amount">{Total - (Total * CouponDetail.discount) / 100}</span></strong> */}
                                                                    <td><strong><span class="amount">{Total - (Total * CouponDetail.discount) / 100}</span></strong>
                                                                    </td>
                                                                </tr>
                                                            </>

                                                            :
                                                            <tr class="order-total">
                                                                <th>Order Total</th>
                                                                <td><strong><span class="amount">{Total}</span></strong>
                                                                </td>
                                                            </tr>
                                                        // null

                                                    }




                                                </tfoot>
                                            </table>
                                        </div>


                                        {/* <div class="your-order-table table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th class="product-name">Product</th>
                                                                <th class="product-total">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="cart_item">
                                                                <td class="product-name">
                                                                    Vestibulum suscipit <strong class="product-quantity"> × 1</strong>
                                                                </td>
                                                                <td class="product-total">
                                                                    <span class="amount">£165.00</span>
                                                                </td>
                                                            </tr>
                                                            <tr class="cart_item">
                                                                <td class="product-name">
                                                                    Vestibulum dictum magna	<strong class="product-quantity"> × 1</strong>
                                                                </td>
                                                                <td class="product-total">
                                                                    <span class="amount">£50.00</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr class="cart-subtotal">
                                                                <th>Cart Subtotal</th>
                                                                <td><span class="amount">£215.00</span></td>
                                                            </tr>
                                                            <tr class="shipping">
                                                                <th>Shipping</th>
                                                                <td>
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>
                                                                                Flat Rate: <span class="amount">£7.00</span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>Free Shipping:</label>
                                                                        </li>
                                                                        <li></li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr class="order-total">
                                                                <th>Order Total</th>
                                                                <td><strong><span class="amount">£215.00</span></strong>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div> */}
                                        {/* <StripeCheckout
                                                    // id='paymentmethod'
                                                    token={onToken}
                                                    // stripeKey="my_PUBLISHABLE_stripekey"
                                                    stripeKey="pk_test_51LmyFsLLZ9RFFqkdlBZkZwsm5IU9ylynnzk4D1uP5QtXAZTQNzvRA48HBTgYN9iLFy69JKhllFpMxVrBmqXE9WfP002GBrtFqS"


                                                /> */}
                                        <div id='paymentmethod' className='d-none'>
                                            <StripeCheckout
                                                token={onToken}
                                                // stripeKey="my_PUBLISHABLE_stripekey"
                                                stripeKey="pk_test_51LmyFsLLZ9RFFqkdlBZkZwsm5IU9ylynnzk4D1uP5QtXAZTQNzvRA48HBTgYN9iLFy69JKhllFpMxVrBmqXE9WfP002GBrtFqS"
                                                name='payment'
                                            />
                                        </div>
                                        <div class="payment-method">
                                            <div class="payment-accordion">
                                                <div class="collapses-group">
                                                    <div class="panel-group" id="accordion" role="tablist">
                                                        <div class="panel panel-default">
                                                            <div class="panel-heading" role="tab" id="headingOne">
                                                                <h4 class="panel-title mb-2">
                                                                    {/* Payment With Strip */}
                                                                    {/* <a data-bs-toggle="collapse" href="#collapseOne"> */}
                                                                    {/* Direct Bank Transfer */}

                                                                    {/* </a> */}
                                                                </h4>
                                                            </div>
                                                            <div id="collapseOne" data-parent="#accordion" class="panel-collapse collapse show">
                                                                <div class="panel-body">
                                                                    {/* <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p> */}
                                                                    {/* <StripeCheckout
                                                                                token={onToken}
                                                                                // stripeKey="my_PUBLISHABLE_stripekey"
                                                                                stripeKey="pk_test_51LmyFsLLZ9RFFqkdlBZkZwsm5IU9ylynnzk4D1uP5QtXAZTQNzvRA48HBTgYN9iLFy69JKhllFpMxVrBmqXE9WfP002GBrtFqS"

                                                                                
                                                                            /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div class="panel panel-default">
                                                                    <div class="panel-heading" role="tab" id="headingTwo">
                                                                        <h4 class="panel-title">
                                                                            <a class="collapsed" role="button" data-bs-toggle="collapse" href="#collapseTwo">
                                                                                Cheque Payment
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseTwo" data-parent="#accordion" class="panel-collapse collapse">
                                                                        <div class="panel-body">
                                                                            <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="panel panel-default">
                                                                    <div class="panel-heading" role="tab" id="headingThree">
                                                                        <h4 class="panel-title">
                                                                            <a class="collapsed" role="button" data-bs-toggle="collapse" href="#collapseThree">
                                                                                PayPal <img src="img/2.png" alt="payment" />
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseThree" data-parent="#accordion" class="panel-collapse collapse">
                                                                        <div class="panel-body">
                                                                            <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-button-payment" onClick={() => paymentStripe()} >
                                                <input type="button" value="Place order" />
                                                {/* <Button type='button' onClick={() => paymentStripe()}>Place order</Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                    {/* <!-- checkout-area-end --> */}
                </div>
                {/* <!-- shop-main-area-end -->
			<!-- footer-area-start --> */}
                <Footer />
                {/* <!-- footer-area-end --> */}
            </div>

            {/* </body> */}



        </>
    )
}

export default Checkout