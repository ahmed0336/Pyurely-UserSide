import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
// import { Space, Table, Tag } from 'antd';

import BaseVariable from '../BaseUrl/Baseurl'

// material table 

import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteIcon from '@material-ui/icons/Delete';
import { cardClasses } from '@mui/material';
import { AddtoCartaction } from '../Redux/Actions/ActionFunction';
// import { useSelector, useDispatch } from 'react-redux';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Cart = () => {

	const dispatch = useDispatch();
	// const[CartData,SetCartData] =useState([])
	const Navigate=useNavigate();
	const [name, Setname] = useState('')
	// const [Total ,setTotal] =useState('')
	const [Total ,setTotal] =useState([])

    const Token =localStorage.getItem('token')

	// add to cart redux work
	const ReduxCartDetail = useSelector((state) => state.counter.myCart)
	console.log("ReduxCartDetail ==> ", ReduxCartDetail)



	const DeleteService = (e) => {

        console.log("value of e==>", e)

				let redCars = ReduxCartDetail.filter(car =>
					{
                       if( car.uid !== e )
					   {
						// console.log("filter",redCars)
						return{
							car
						}
					   }
					} );

					dispatch(AddtoCartaction([...redCars]))


				console.log("filter",redCars)
          
			
		}


		useEffect(()=>{

			ReduxCartDetail.map((a,i)=>{
				console.log("map of map",a)
				if(i === 0){
					setTotal(Number(a.price)*Number(a.quantity))
				}else{
					setTotal((perv)=>perv + (Number(a.price)*Number(a.quantity)))
	
				}
				
	
				
			})
			
	
		},[ReduxCartDetail])

    
		const checkoutfunction = () =>{
			// alert("hello baloch")
			if(Token == null)
			{
				Navigate('/Login')

			}
			else{
            
				Navigate('/Checkout')
				 
			}
		}


	return (
		<>

			{/* <!-- page-wraper-start --> */}
			<div id="page-wraper">
				{/* <!-- header-area-start --> */}
				<Header />
				{/* <!-- header-area-end --> */}
				{/* <!-- breadcrumbs-area-start --> */}
				<div className="breadcrumbs-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="breadcrumb-content text-center">
									<h2>cart</h2>
									<ul>
										<li><a href="/">Home /</a></li>
										<li className="active"><a href="javascript:void(0)">cart</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- breadcrumbs-area-end -->
			<!-- shop-main-area-start --> */}

				<div class="shop-main-area">
					{/* <!-- cart-main-area-start --> */}
					<div className="cart-main-area">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">

									{/* <form action="#">
										<div className="table-content table-responsive">
											<table>
												<thead>
													<tr>
														<th className="product-thumbnail">Image</th>
														<th className="product-name">Product</th>
														<th className="product-price">Price</th>
														<th className="product-quantity">Quantity</th>
														<th className="product-subtotal">Total</th>
														<th className="product-remove">Remove</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="product-thumbnail"><a href="#"><img src="img/cart/1.jpg" alt="man" /></a></td>
														<td className="product-name"><a href="#">Vestibulum suscipit</a></td>
														<td className="product-price"><span className="amount">£165.00</span></td>
														<td className="product-quantity"><input type="number" defaultValue={1} /></td>
														<td className="product-subtotal">£165.00</td>
														<td className="product-remove"><a href="#"><i className="fa fa-times" /></a></td>
													</tr>
													<tr>
														<td className="product-thumbnail"><a href="#"><img src="img/cart/2.jpg" alt="man" /></a></td>
														<td className="product-name"><a href="#">Vestibulum dictum magna</a></td>
														<td className="product-price"><span className="amount">£50.00</span></td>
														<td className="product-quantity"><input type="number" defaultValue={1} /></td>
														<td className="product-subtotal">£50.00</td>
														<td className="product-remove"><a href="#"><i className="fa fa-times" /></a></td>
													</tr>
												</tbody>
											</table>
										</div>
									</form> */}
									<div style={{ maxWidth: "100%" }}>
										<MaterialTable
											icons={tableIcons}
											columns={[
												
												// { title: "Product", field: 'Productimage' },
												{ title: "Product", field: "Productimage", render: item => <img src={BaseVariable.imgUrl + item.Productimage} alt="" border="3" height="100" width="100" /> },
												{ title: "Name", field: 'name' },
												// { title: "Category", field: "CategoryName" },
												{ title: "Price", field: "price" },
												{ title: "Quantity", field: "quantity" },
												{
													title: "Total", field: "total", render: rowData => Number(rowData.price) * Number(rowData.quantity)
													// console.log("ahmed rowdata",`${rowData.price} ${rowData.quantity}`)
													// console.log("rowData",Number(rowData.price)*Number(rowData.quantity) )

												}

											]}
											
											data={

												ReduxCartDetail

											}
                                           
											actions={
												[
													// {
													//     icon: Edit,
													//     tooltip: 'Edit User',
													//     onClick: (event, rowData) => {
													//         // console.log("edit btn ==>", rowData.SId)
													//         console.log("edit btn ==>", rowData)
													//         // setFname2(rowData.Fname)
													//         // setLname2(rowData.Lname)
													//         // setContact2(rowData.ContactNo)
													//         // setId2(rowData.id)
													//         // Edited(rowData.SId)
													//         // handleShow3()
													//     }
													// },
													{
			
														icon: DeleteIcon,
														tooltip: 'Delete User ',
														onClick: (event, rowData) => {
															console.log("rowdata of delete", rowData)
			
															DeleteService(rowData.uid)
			
														}
													},
			
												]
			
											}

											options={{
												actionsColumnIndex: -1
											}}
										title=""
										/>
									</div>
								</div>

							</div>
							<div className="row">
								<div className="col-xl-8 col-lg-8 col-md-7 col-12">
									<div className="buttons-cart mb-30 mt-3">
										<ul>
											{/* <li><a href="#">Update Cart</a></li> */}
											<li><Link to={"/"} > <a>Continue Shopping</a></Link></li>
											{/* <li><Link to={"/Checkout"} > <a>Checkout</a></Link></li> */}
											<li><a onClick={checkoutfunction} style={{color:"#fff"}} >Checkout</a></li>
										</ul>
									</div>
									{/* <div className="coupon">
										<h3>Coupon</h3>
										<p>Enter your coupon code if you have one.</p>
										<form action="#">
											<input type="text" placeholder="Coupon code" />
											<a href="#">Apply Coupon</a>
										</form>
									</div> */}
								</div>
								<div className="col-xl-4 col-lg-4 col-md-5 col-12">
									<div className="cart_totals">
										<h2>Cart Totals</h2>
										<table>
											<tbody>
												<tr className="cart-subtotal">
													<th>Subtotal</th>
													<td>
														<span className="amount">${Total} </span>
													</td>
												</tr>
												{/* <tr className="shipping">
													<th>Shipping</th>
													<td>
														<ul id="shipping_method">
															<li>
																<input type="radio" />
																<label>
																	Flat Rate:
																	<span className="amount">£7.00</span>
																</label>
															</li>
															<li>
																<input type="radio" />
																<label> Free Shipping </label>
															</li>
														</ul>
														<a href="#">Calculate Shipping</a>
													</td>
												</tr> */}
												<tr className="order-total">
													<th>Total</th>
													<td>
														<strong>
															<span className="amount">${Total}</span>
														</strong>
													</td>
												</tr>
											</tbody>
										</table>
										<div className="wc-proceed-to-checkout">
											<link to="/Checkout" />Proceed to Checkout
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- cart-main-area-end --> */}
				</div>
				{/* <!-- shop-main-area-end -->
			<!-- footer-area-start --> */}
				<Footer />
				{/* <!-- footer-area-end --> */}
			</div>
			{/* <!-- page-wraper-start -->
	   */}






		</>
	)
}

export default Cart