import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getApiWithOutToken } from "../Helper/helper";
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import Header from './Header';

import Baseurl from '../BaseUrl/Baseurl';


// nofication alert
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';


// redux work
import { useSelector, useDispatch } from 'react-redux';

import { decNumber, incNumber, AddtoCartaction } from '..//Redux/Actions/ActionFunction';
import { Card } from 'antd';



const Productdetails = () => {
	const dispatch = useDispatch();
	const [status, setStatus] = React.useState(true)
	const [status2, setStatus2] = React.useState(false)
	const [status3, setStatus3] = React.useState(false)
	const [datasn, setDatasn] = useState([])
	const [quantity, setQuantity] = useState(1)
	const key = 'updatable';

	// const [quantity, setQuantity] = useState(1)

	// getting api data inthe form of array of objects
	const [CartDetail, SetCartDetail] = useState([])


	const [CategoryName, setCategoryName] = useState()
	const [name, setname] = useState('')
	const [price, setprice] = useState('')
	const [imagelistData, SetimagelistData] = useState([])

	const { id } = useParams();
	const Token = localStorage.getItem("token")
	const Url = ["https://pyurelyecommerce.pythonanywhere.com/media/"]
	useEffect(() => {
		Product()
		GetAllImages(id)
	}, [])
	const Product = () => {

		getApiWithOutToken(`https://pyurelyecommerce.pythonanywhere.com/api/GetspecificProduct?uid=${id}`, "")
			.then(({ data }) => {
				console.log("get api detail 1==>", data)
				console.log("get api detail 2==>", data.data)
				setDatasn(data.data[0])
				SetCartDetail(data.data)
				// setDatasn(data)
			}).catch((err) => {
				console.log('err---------', err)
			})
	}



	const GetAllImages = (id) => {
        console.log("this baloch id of iamges ===>", id)
        var requestOptions = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + Token
            },
            redirect: 'follow'
        };
        // setLoader(true)
		// https://pyurelyecommerce.pythonanywhere.com/api/Product_image?uid=d7d73365-9eb3-4f3a-aa2a-87b17f2544d1
        fetch(`${Baseurl.baseUrl}/Product_image?uid=${id}`, requestOptions)

            .then(response => response.json())
            .then(result => {
                // setLoader(false)
                console.log("getting all images result", result.data)
                SetimagelistData(result.data)
            }
            )
            .catch(error => {
                // setLoader(false)
                console.log('error', error)
            }
            );
    }


	// const adddetail = {

	// 	datasn

	// }


	// const adddetail = {

	// 	CartDetail

	// }







	const myState = useSelector((state) => state.counter.counter)
	console.log("mystate value is ==>", myState)

	const addcart = useSelector((state) => state.counter.myCart)
	console.log("value of add to cart object", addcart)

	// console.log("value of CartDetail ==> ",adddetail,addcart)

	const addtocartfunction = () => {

		console.log("array detail single ==>", CartDetail)
		// CartDetail['quantity']= 1  
		CartDetail[0]['quantity'] = quantity
		console.log(CartDetail, "asdsad")
		// console.log(quantity, "quantity")

		if (addcart.filter((add) => add.uid === id).length) {
			const rCars = addcart.map((cart) => {
				if (cart?.uid === id) {
					return {
						...cart,
						quantity: cart.quantity + quantity
					}
				} else {
					return cart
				}
			}) || []
			console.log(CartDetail, "value of redcars", rCars)

			dispatch(AddtoCartaction([...rCars]))
			// setShow(false)
            notification.open({
				key,
				message: 'Success',
				description: "Product Sucessfully added ",
				duration: 3,
				icon: <SmileOutlined style={{ color: '#108ee9' }} />,
			});
		} else {
			dispatch(AddtoCartaction([...CartDetail, ...addcart]))

		}

	}

	//   const increamentcart = () => {

	//     if()

	//   }


	return (
		<>
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
									<h2>product details</h2>
									<ul>
										<li><a href="/">Home /</a></li>
										<li class="active"><a href="javascript:void(0)">product details</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- breadcrumbs-area-end -->
			<!-- shop-main-area-start --> */}
				<div class="shop-main-area">
					<div class="container">
						<div class="row">
							<div class="col-xl-6 col-lg-6 col-md-6 col-12">
								{/* <!-- zoom-area-start --> */}
								{/* <div class="zoom-area mb-3">
									<img id="zoompro" src={`${Url}${datasn.Productimage}`} data-zoom-image="img/zoom/large/1.jpg" alt="zoom" />
									<div id="gallery" class="mt-30">
										<a href="#" data-image="img/zoom/small/1.jpg" data-zoom-image="img/zoom/large/1.jpg">
											<img src={`${Url}${datasn.Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/2.jpg" data-zoom-image="img/zoom/large/2.jpg">
											<img src={`${Url}${datasn.Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/3.jpg" data-zoom-image="img/zoom/large/3.jpg">
											<img src={`${Url}${datasn.Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/4.jpg" data-zoom-image="img/zoom/large/4.jpg">
											<img src={`${Url}${datasn.Productimage}`} alt="zoom" />
										</a>
									</div>
								</div> */}
								<div class="zoom-area mb-3">
									{
										CartDetail.map((result, index) => {
											return (
												<>
													<img key={index} id="zoompro" src={`${Url}${result.Productimage}`} data-zoom-image="img/zoom/large/1.jpg" alt="zoom" />

													<div id="gallery" class="mt-30">
                                                  {
													imagelistData.map((a,index)=>{
                                                        return(
															<>
                                                            <a href="#"  data-zoom-image="img/zoom/large/1.jpg">
															<img key={index} src={ Baseurl.imgUrl + a.image} alt="zoom" />
														</a>
															</>
														)
													})
												  }
												  </div> 
													

														

													
													{/* https://pyurelyecommerce.pythonanywhere.com/api/Product_image?uid=d7d73365-9eb3-4f3a-aa2a-87b17f2544d1 */}
												</>
											)

										})

									}
									{/* <img id="zoompro" src={`${Url}${CartDetail[0].Productimage}`} data-zoom-image="img/zoom/large/1.jpg" alt="zoom" />
									<div id="gallery" class="mt-30">
										<a href="#" data-image="img/zoom/small/1.jpg" data-zoom-image="img/zoom/large/1.jpg">
											<img src={`${Url}${CartDetail[0].Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/2.jpg" data-zoom-image="img/zoom/large/2.jpg">
											<img src={`${Url}${CartDetail[0].Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/3.jpg" data-zoom-image="img/zoom/large/3.jpg">
											<img src={`${Url}${CartDetail[0].Productimage}`} alt="zoom" />
										</a>
										<a href="#" data-image="img/zoom/small/4.jpg" data-zoom-image="img/zoom/large/4.jpg">
											<img src={`${Url}${CartDetail[0].Productimage}`} alt="zoom" />
										</a>
									</div> */}
								</div>
								{/* <!-- zoom-area-end --> */}
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-12">
								{/* <!-- zoom-product-details-start --> */}
								<div class="zoom-product-details">
									<h1>{datasn.name}</h1>
									<div class="main-area mtb-30">
										<div class="rating">
											<ul>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
												<li><a href="#"><i class="fa fa-star"></i></a></li>
											</ul>
										</div>
										<div class="review-2">
											<a href="#">1 reviews</a>
											<a href="#">Write a review</a>
										</div>
									</div>
									<div class="price">
										<ul>
											<li class="new-price">${datasn.price}</li>
										</ul>
										<p>{datasn.description}</p>
									</div>
									<div class="list-unstyled-2">
										<ul>
											<li>Ex Tax: $100.00</li>
											<li>Reward Points: %s 200</li>
										</ul>
									</div>
									<div class="list-unstyled">
										<ul>
											<li>Brands <a href="#">Armani</a></li>
											<li>Product Code: <a href="#">Product 1</a></li>
											<li>Reward Points:  <a href="#">400</a></li>
											<li>Availability:  <a href="#">In Stock</a></li>
										</ul>
									</div>
									{/* <!-- <div class="catagory-select mb-30">
									<h3>Available Options</h3>
									<form action="#">
										<label>Select:</label>
										<select  class="sorter-options" data-role="sorter">
											<option selected="selected" value="Lowest">Blue</option>
											<option value="Highest">White</option>
											<option value="Product">Green</option>
										</select>
									</form>
								</div> --> */}
									<form action="#">

										<div class="quality-button">
											{/* <p>{myState}</p> */}



											<Button className='mx-1 ' onClick={() => { setQuantity(quantity - 1) }} disabled={quantity == 1}>
												-
											</Button>
											{/* {' '} */}
											{/* <p>{myState}</p> */}
											<Button className='mx-1 '  >{quantity}</Button>
											{/* <Button type='button' className='mx-1  ' onClick={increamentcart} >
												+
											</Button> */}
											<Button type='button' className='mx-1  ' onClick={() => { setQuantity(quantity + 1) }} >
												+
											</Button>


										</div>

										{/*CartDetail ek array of object jo api se aa rha hai working code  */}
										{/* <button type="submit" onClick={() => { dispatch(AddtoCartaction([...CartDetail,...addcart])) }}  ><Link to="#">Add to cart</Link></button> */}

										{/* new try */}
										<button  type='button' onClick={addtocartfunction}  >Add to cart</button>
										{/* <div class="product-icon">
											<a href="#" title="Add to Cart"><i class="icon ion-bag"></i></a>
											<a href="#" title="Compare this Product"><i class="icon ion-android-options"></i></a>
										</div> */}
									</form>
								</div>
								{/* <!-- zoom-product-details-end --> */}
							</div>
						</div>
						<div class="row">
							{/* <!-- products-detalis-area-start --> */}
							<div class="products-detalis-area pt-80">
								<div class="col-lg-12">
									{/* <!-- tab-menu-start --> */}
									<div class="tab-menu mb-30 text-center">
										<ul class="nav">
											<li><a class="active" href="#Description" onClick={() => {
												setStatus(!status)
												setStatus2(false)
												setStatus3(false)
											}}
											>Description</a></li>
											{/* <li><a href="#Reviews" onClick={() => {
												setStatus(false)
												setStatus2(true)
												setStatus3(false)
											}}>Reviews (0)</a></li> */}
											{/* <li><a href="#Tags" onClick={() => {
												setStatus(false)
												setStatus2(false)
												setStatus3(true)
											}}>Add Tags
											</a>
											</li> */}
										</ul>
									</div>
									{/* <!-- tab-menu-end --> */}
								</div>
								{/* <!-- tab-area-start --> */}
								<div class="">
									<div class="">
										<div class="col-lg-12">
											{
												status ?


													<div class="tab-description">
														{
														CartDetail.map((a,i)=>{
															return(
																<>
																<p dangerouslySetInnerHTML={{__html: a.longdescription}}  key={i}></p>
																
																</>
															)
														})
													}
														{/* <p>Bacon ipsum dolor sit amet ut nostrud chuck, voluptate adipisicing veniam kielbasa fugiat ex spare ribs. Incididunt sint officia non cow, ut et. Cillum porchetta tongue occaecat laborum bacon aliquip fatback flank dolore short loin ball tip bresaola deserunt dolor. Shoulder fugiat ut in ut tail swine dolore, capicola ullamco beef occaecat meatball. Laboris turkey in et chuck deserunt ad incididunt do.</p>
														<p>Capicola chuck tongue, anim consequat leberkas laborum ut enim bacon. Ribeye hamburger pastrami nisi ad consectetur dolor exercitation pork belly officia brisket pariatur mollit nulla turkey. Est dolore nulla cupidatat pork chop. Sausage officia pastrami chicken.</p>
														<p>Tail sed sausage magna quis commodo swine. Aliquip strip steak esse ex in ham hock fugiat in. Labore velit pork belly eiusmod ut shank doner capicola consectetur landjaeger fugiat excepteur short loin. Pork belly laboris mollit in leberkas qui. Pariatur swine aliqua pork chop venison veniam. Venison sed cow short loin bresaola shoulder cupidatat capicola drumstick dolore magna shankle.</p>
														<p>Sunt tail est sirloin meatloaf shank, brisket tempor duis swine fugiat dolore. Spare ribs esse jowl consectetur hamburger quis magna. Doner andouille dolore eiusmod, shank short ribs sausage adipisicing ball tip drumstick et. Ribeye in tenderloin bresaola laborum eu voluptate dolor sausage.</p> */}
													</div> : null
											}
										</div>
									</div>
									{/* review tab */}
									{/* <div class="" id="">
										<div class="col-lg-12">
											{
												status2 ?

													<div class="reviews-area">
														<h3>Reviews</h3>
														<p>Be the first to review “Apple 16Gb iPad Mini” </p>
														<div class="rating-area mb-10">
															<h4>Your Rating</h4>
															<a href="#"><i class="fa fa-star" ></i></a>
															<a href="#"><i class="fa fa-star" ></i></a>
															<a href="#"><i class="fa fa-star" ></i></a>
															<a href="#"><i class="fa fa-star" ></i></a>
														</div>
														<div class="comment-form mb-10">
															<label>Your Review</label>
															<textarea name="comment" id="comment" cols="20" rows="7"></textarea>
														</div>
														<div class="comment-form-author mb-10">
															<label>Name</label>
															<input type="text" />
														</div>
														<div class="comment-form-email mb-10">
															<label>email</label>
															<input type="text" />
														</div>
														<button type="submit">submit</button>
													</div> : null
											}
										</div>
									</div> */}
									{/* add tag tab */}
									{/* <div class="" id="">
										<div class="col-lg-12">
											{
												status3 ?

													<div class="">
														<p> Custom Tab Content here. <br />
															Tail sed sausage magna quis commodo swine. Aliquip strip steak esse ex in ham hock fugiat in. Labore velit pork belly eiusmod ut shank doner capicola consectetur landjaeger fugiat excepteur short loin. Pork belly laboris mollit in leberkas qui. Pariatur swine aliqua pork chop venison veniam. Venison sed cow short loin bresaola shoulder cupidatat capicola drumstick dolore magna shankle. </p>
													</div> : null
											}
										</div>
									</div> */}
								</div>
								{/* <!-- tab-area-end --> */}
							</div>
							{/* <!-- products-detalis-area-end --> */}
						</div>
					</div>
				</div>
				{/* <!-- shop-main-area-end -->
			<!-- arrivals-area-start --> */}
				{/* <div class="arrivals-area ptb-80">
					<div class="container">
						<div class="row">
							<div class="col-lg-12">
								<div class="section-title mb-30 text-center">
									<h2>Related Products</h2>
									<p> Order online and have your products delivered to your closest store for free </p>
								</div>
							</div>
						</div>
						<div class="">
							<div class="row">
								<div className="col-lg-4">
									<div class="product-wrapper">
										<div class="product-img">
											<a href="javascript:void(0)">
												<img src="/img/product/23.jpg" alt="product" class="primary" />
												<img src="/img/product/24.jpg" alt="product" class="secondary" />
											</a>
											<span class="sale">sale</span>
											<div class="product-icon">
												<a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i class="icon ion-bag"></i></a>
												<a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i class="icon ion-android-options"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i class="icon ion-android-open"></i></a>
											</div>
										</div>
										<div class="product-content pt-20">
											<div class="manufacture-product">
												<a href="#">Chanel</a>
												<div class="rating">
													<ul>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
													</ul>
												</div>
											</div>
											<h2><a href="#">Sopo Designs Woolrich Klettersack Backpack</a></h2>
											<div class="price">
												<ul>
													<li class="new-price">$122.00</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div class="product-wrapper">
										<div class="product-img">
											<a href="javascript:void(0)">
												<img src="/img/product/31.jpg" alt="product" class="primary" />
												<img src="/img/product/32.jpg" alt="product" class="secondary" />
											</a>
											<div class="product-icon">
												<a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i class="icon ion-bag"></i></a>
												<a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i class="icon ion-android-options"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i class="icon ion-android-open"></i></a>
											</div>
										</div>
										<div class="product-content pt-20">
											<div class="manufacture-product">
												<a href="#">Dior</a>
												<div class="rating">
													<ul>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
													</ul>
												</div>
											</div>
											<h2><a href="#">Topo Designs Woolrich Klettersack Backpack</a></h2>
											<div class="price">
												<ul>
													<li class="new-price">$122.00</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div class="product-wrapper">
										<div class="product-img">
											<a href="javascript:void(0)">
												<img src="/img/product/7.jpg" alt="product" class="primary" />
												<img src="/img/product/8.jpg" alt="product" class="secondary" />
											</a>
											<span class="sale">sale</span>
											<div class="product-icon">
												<a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i class="icon ion-bag"></i></a>
												<a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i class="icon ion-android-options"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i class="icon ion-android-open"></i></a>
											</div>
										</div>
										<div class="product-content pt-20">
											<div class="manufacture-product">
												<a href="#">Chanel </a>
												<div class="rating">
													<ul>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
													</ul>
												</div>
											</div>
											<h2><a href="#">Dopo Designs Woolrich Klettersack Backpack</a></h2>
											<div class="price">
												<ul>
													<li class="new-price">$122.00</li>
													<li class="old-price">$98.00</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div class="product-wrapper">
										<div class="product-img">
											<a href="javascript:void(0)">
												<img src="/img/product/11.jpg" alt="product" class="primary" />
												<img src="/img/product/12.jpg" alt="product" class="secondary" />
											</a>
											<div class="product-icon">
												<a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i class="icon ion-bag"></i></a>
												<a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i class="icon ion-android-options"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i class="icon ion-android-open"></i></a>
											</div>
										</div>
										<div class="product-content pt-20">
											<div class="manufacture-product">
												<a href="#">Chanel</a>
												<div class="rating">
													<ul>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
													</ul>
												</div>
											</div>
											<h2><a href="#">Eopo Designs Woolrich Klettersack Backpack</a></h2>
											<div class="price">
												<ul>
													<li class="new-price">$98.00</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div class="product-wrapper">
										<div class="product-img">
											<a href="javascript:void(0)">
												<img src="/img/product/33.jpg" alt="product" class="primary" />
												<img src="/img/product/34.jpg" alt="product" class="secondary" />
											</a>
											<div class="product-icon">
												<a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i class="icon ion-bag"></i></a>
												<a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i class="icon ion-android-options"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i class="icon ion-android-open"></i></a>
											</div>
										</div>
										<div class="product-content pt-20">
											<div class="manufacture-product">
												<a href="#">IVY Moda</a>
												<div class="rating">
													<ul>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
														<li><a href="#"><i class="fa fa-star"></i></a></li>
													</ul>
												</div>
											</div>
											<h2><a href="#">Ropo Designs Woolrich Klettersack Backpack</a></h2>
											<div class="price">
												<ul>
													<li class="new-price">$142.00</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				{/* <!-- arrivals-area-end -->
			<!-- banner-area-2-start --> */}
				<div class="banner-area-2">
					<div class="container">
						<div class="br-bottom ptb-80">
							<div class="row">
								<div class="col-xl-4 col-lg-4 col-md-4 col-12">
									{/* <!-- single-banner-2-start --> */}
									<div class="single-banner-2 text-center mb-3">
										<div class="banner-icon">
											<a href="javascript:void(0)"><img src="/img/banner/2.png" alt="banner" /></a>
										</div>
										<div class="banner-text">
											<h2>Free Shipping Worldwide</h2>
											<p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
										</div>
									</div>
									{/* <!-- single-banner-2-end --> */}
								</div>
								<div class="col-xl-4 col-lg-4 col-md-4 col-12">
									{/* <!-- single-banner-2-start --> */}
									<div class="single-banner-2 text-center mb-3">
										<div class="banner-icon">
											<a href="javascript:void(0)"><img src="/img/banner/3.png" alt="banner" /></a>
										</div>
										<div class="banner-text">
											<h2>Money Back Guarantee</h2>
											<p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
										</div>
									</div>
									{/* <!-- single-banner-2-end --> */}
								</div>
								<div class="col-xl-4 col-lg-4 col-md-4 col-12">
									{/* <!-- single-banner-2-start --> */}
									<div class="single-banner-2 text-center">
										<div class="banner-icon">
											<a href="javascript:void(0)"><img src="/img/banner/4.png" alt="banner" /></a>
										</div>
										<div class="banner-text">
											<h2>online support 24/7</h2>
											<p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
										</div>
									</div>
									{/* <!-- single-banner-2-end --> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- banner-area-2-end -->
			<!-- footer-area-start --> */}
				<Footer />
				{/* <!-- footer-area-end -->
			<!-- modal-area-start --> */}
				<div class="modal-area">
					{/* <!-- single-modal-start --> */}
					<div class="modal fade" id="mymodal" tabindex="-1" role="dialog">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="modal-img">
										<div class="single-img">
											<img src="/img/product/2.jpg" alt="hat" class="primary" />
										</div>
									</div>
									<div class="model-text">
										<h2><a href="#">Pyrolux Pyrostone</a> </h2>
										<div class="product-rating">
											<a href="#"><i class="fa fa-star"></i></a>
											<a href="#"><i class="fa fa-star"></i></a>
											<a href="#"><i class="fa fa-star"></i></a>
											<a href="#"><i class="fa fa-star"></i></a>
											<a href="#"><i class="fa fa-star-o"></i></a>
										</div>
										<div class="price-rate">
											<span class="old-price"><del>$30.00</del></span>
											<span class="new-price">$28.00</span>
										</div>
										<div class="short-description mt-20">
											<p>Bacon ipsum dolor sit amet ut nostrud chuck, voluptate adipisicing veniam kielbasa fugiat ex spare ribs. Incididunt sint officia non cow, ut et. Cillum porchetta tongue occaecat laborum bacon aliquip fatback flank dolore short loin ball tip bresaola deserunt dolor. Shoulder fugiat ut in ut tail swine dolore, capicola ullamco beef occaecat meatball. Laboris turkey in et chuck deserunt ad incididunt do.</p>
										</div>
										<form action="#">
											<input type="number" value="1" />
											<button type="submit">Add to cart</button>
										</form>
										<div class="product-meta">
											<span>
												Categories:
												<a href="#">albums</a>,<a href="#">Music</a>
											</span>
											<span>
												Tags:
												<a href="#">albums</a>,<a href="#">Music</a>
											</span>
										</div>
										{/* <!-- social-icon-start --> */}
										<div class="social-icon mt-20">
											<ul>
												<li><a href="#" data-bs-toggle="tooltip" title="Share on Facebook"><i class="fa fa-facebook"></i></a></li>
												<li><a href="#" data-bs-toggle="tooltip" title="Share on Twitter"><i class="fa fa-twitter"></i></a></li>
												<li><a href="#" data-bs-toggle="tooltip" title="Email to a Friend"><i class="fa fa-envelope-o"></i></a></li>
												<li><a href="#" data-bs-toggle="tooltip" title="Pin on Pinterest"><i class="fa fa-pinterest"></i></a></li>
												<li><a href="#" data-bs-toggle="tooltip" title="Share on Google+"><i class="fa fa-google-plus"></i></a></li>
											</ul>
										</div>
										{/* <!-- social-icon-end --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- single-modal-end --> */}
				</div>
				{/* <!-- modal-area-end --> */}
			</div>
		</>
	)
}

export default Productdetails
