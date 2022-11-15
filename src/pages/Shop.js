import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getApiWithOutToken } from "../Helper/helper";

// import BaseUrlVariable from '../BaseUrl/Baseurl'
import { FaThList } from 'react-icons/fa';
import { FaTh } from 'react-icons/fa';

import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

import { BsFillBagCheckFill } from "react-icons/bs";
import { Loader } from 'react-overlay-loader';





import BaseUrlVariable from '../BaseUrl/Baseurl'
import { useSelector, useDispatch } from 'react-redux';

import { AddtoCartaction } from '..//Redux/Actions/ActionFunction';
// nofication alert
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';

// react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



const Shop = () => {

	const { id } = useParams();
	const key = 'updatable';

	const navigate = new useNavigate();
    const dispatch = useDispatch();

	console.log("id of useparms", id)

	const Token = localStorage.getItem("token")

	const [CategoriesProduct, setCategoriesProduct] = useState([])
	const [loader, setLoader] = useState(false)
	
	const [tablist, settablist] = useState(true)
	// const [tabth,settabth]=useState(false)
	const [quantity, setQuantity] = useState(1)

	// for moadal
	const [quantity2, setQuantity2] = useState(1)
	
	const [EID, setEID] = useState('')

	// modal states
    const [show, setShow] = useState(false);

    const [DataModel, setDataModel] = useState([])

	const handleClose = () =>{
		setShow(false);

	} 

	const handleShow = (e) =>{
		
        console.log("modal of e ==>", e)




        getApiWithOutToken(`https://pyurelyecommerce.pythonanywhere.com/api/GetspecificProduct?uid=${e}`, "")
            .then(({ data }) => {
                console.log("model 1==>", data)
                console.log("model detail 2==>", data.data)
                setDataModel(data.data[0])
                // SetCartDetail(data.data)
                // setDatasn(data)
            }).catch((err) => {
                console.log('err---------', err)
            })

			setShow(true);
	} 
	// modal scroll work
    document.body.style.removeProperty("overflow")

	useEffect(() => {




		var requestOptions = {
			method: 'GET',
			// headers: myHeaders,
			headers: {
				Authorization: "Bearer " + Token
			},
			redirect: 'follow'
		};
		setLoader(true)

		//   fetch(`${Baseurl.baseUrl}/productImages?uid=${id}`, requestOptions)
		//   fetch(`${BaseUrlVariable.baseUrl}/categorynameproduct?name=${id}`, requestOptions)
		fetch(`${BaseUrlVariable.baseUrl}/categorynameproduct?name=${id}`, requestOptions)
			.then(response => response.json())
			.then(result => {

				if (result.status) {
					setLoader(false)
					console.log("shop==>", result.data)
					setCategoriesProduct(result.data)
				}


			}
			)
			.catch(error => console.log('error', error));




	}, [id])

	// yahan tak kia age kal krunga
	// carticon add to cart redux work quantity add  static 1 to 1
    const addcartdetail = useSelector((state) => state.counter.myCart)
    console.log("index redux addcartdetail ==> ", addcartdetail)

    const addtocarticon = (e) => {
		console.log("checking product of specific",e)
        let b = e
        b['quantity'] = quantity
        console.log("getting specific product ==>", b)

        setEID(e)

        let filter = addcartdetail.filter((add) => add.uid === b.uid)

        if (filter.length !== 0) {
            const rCars = addcartdetail.map((cart) => {
                if (cart?.uid === e.uid) {
                    return {
                        ...cart,
                        quantity: cart.quantity + quantity
                    }
                } else {
                    return cart
                }
            }) || []
            dispatch(AddtoCartaction([...rCars]))
			// setShow(false);
			notification.open({
				key,
				message: 'Success',
				description: "Product Sucessfully added ",
				duration: 3,
				icon: <SmileOutlined style={{ color: '#108ee9' }} />,
			});
        } else {
            console.log("else")
            dispatch(AddtoCartaction([b, ...addcartdetail]))
        }
    }


	// yeh modal wala kam hai
    const addtocartfunction = (e) => {

        console.log("getting object of specific modal work", e)

        let b = e
        setEID(b)
        b['quantity'] = quantity2
        console.log("getting specific product ==>", b)



        // console.log("array detail single getting useffect of product ==>", CartDetail)
        // CartDetail['quantity']= 1  
        // CartDetail[0]['quantity'] = quantity2
        // console.log(CartDetail, "asdsad")
        // console.log(quantity, "quantity")

        let filter = addcartdetail.filter((add) => add.uid === b.uid)

        if (filter.length !== 0) {
            const rCars = addcartdetail.map((cart) => {
                if (cart?.uid === e.uid) {
                    return {
                        ...cart,
                        quantity: cart.quantity + quantity2
                    }
                } else {
                    return cart
                }
            }) || []
            dispatch(AddtoCartaction([...rCars]))
			setShow(false);
			notification.open({
				key,
				message: 'Success',
				description: "Product Sucessfully added ",
				duration: 3,
				icon: <SmileOutlined style={{ color: '#108ee9' }} />,
			});
        } else {
            console.log("else")
            dispatch(AddtoCartaction([b, ...addcartdetail]))
        }

    }

	return (
		<>

			{loader == true ?
				<Loader fullPage loading /> : null
			}
			{/* <body class="shop"> */}
				{/* <!--[if lt IE 8]> */}
				{/* <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience.</p> */}
				{/* <![endif]--> */}

				{/* <!-- Add your site or application content here -->
		<!-- page-wraper-start --> */}
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
										<h2>shop</h2>
										<ul>
											<li><a href="/">Home /</a></li>
											<li class="active"><a href="javascript:void(0)">shop</a></li>
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
								<div class="col-lg-12">
									{/* <!-- page-bar-start --> */}
									<div class="page-bar">
										<div class="shop-tab">
											{/* <!-- tab-menu-start --> */}
											<div class="tab-menu-3">
												<ul class="nav">
													<li>
														<a className={tablist ? "active" : ""}
															onClick={() => { settablist(!tablist) }}

															data-bs-toggle="tab">
															{/* <i class="fa fa-list"></i> */}
															<FaTh fontSize={20} />
														</a>
													</li>


													<li>

														<a className={tablist ? "" : "active"} data-bs-toggle="tab"
															onClick={() => { settablist(!tablist) }}
														>
															{/* <i class="fa fa-th"></i> */}


															<FaThList fontSize={20} />


														</a>
													</li>
												</ul>
											</div>
											{/* <!-- tab-menu-end -->
									<!-- toolbar-sorter-start -->
									<!-- <div class="toolbar-sorter">
										<select  class="sorter-options" data-role="sorter">
											<option selected="selected" value="Lowest">Sort By: Default</option>
											<option value="Highest">Sort By: Name (A - Z)</option>
											<option value="Product">Sort By: Name (Z - A)</option>
										</select>
									</div> --> */}
											{/* <!-- toolbar-sorter-end -->
									<!-- toolbar-sorter-2-start --> */}
											{/* <!-- <div class="toolbar-sorter-2">
										<select  class="sorter-options" data-role="sorter">
											<option selected="selected" value="Lowest">Show: 9</option>
											<option value="Highest">Show: 25</option>
											<option value="Product">Show: 50</option>
										</select>
									</div> --> */}
											{/* <!-- toolbar-sorter-2-end --> */}
										</div>
									</div>
									{/* <!-- page-bar-end --> */}
								</div>
							</div>
							<div class="row">
								<div class="col-xl-9 col-lg-9 col-md-12 col-12 pull-right">
									{/* <!-- shop-right-area-start --> */}
									<div class="shop-right-area mb-40-2 mb-30">
										{/* <!-- tab-area-start --> */}
										<div class="tab-content">
											<div class={tablist ? "tab-pane fade" : "tab-pane fade active show"} id="th">
												{/* <!-- product-wrapper-start --> */}

												{
													CategoriesProduct.map((result) => {
														return (
															<>
																<div className="product-wrapper product-wrapper-3 mb-40">
																	<div className="product-img">
																		<link to="/Productdetails" />
																		<img src={BaseUrlVariable.imgUrl + result.Productimage} alt="product" className="primary" />
																		{/* <img src="img/product/2.jpg" alt="product" className="secondary" /> */}
																		<div className="product-icon">
																			{/* <link to="/Cart" title="Add to Cart" /><i className="icon ion-bag" /> */}
																			<a href="#" data-bs-toggle="tooltip" title="Add to Cart">
																				{/* <i className="icon ion-bag" /> */}
																				<BsFillBagCheckFill onClick={() => addtocarticon(result)}  />
																			</a>
																			{/* <a href="#" data-bs-toggle="tooltip" title="Compare this Product"> */}
																			{/* <i className="icon ion-android-options" /> */}

																			{/* </a> */}
																			<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View">
																				{/* <i className="icon ion-android-open" /> */}
																				<BsFillArrowUpRightSquareFill onClick={() => handleShow(result.uid)}  />

																			</a>

																		</div>
																	</div>
																	<div className="product-content">
																		<div className="manufacture-product">
																			<a href="#">{result.name}</a>
																			<div className="rating">
																				<ul>
																					<li><a href="#"><i className="fa fa-star" /></a></li>
																					<li><a href="#"><i className="fa fa-star" /></a></li>
																					<li><a href="#"><i className="fa fa-star" /></a></li>
																					<li><a href="#"><i className="fa fa-star" /></a></li>
																					<li><a href="#"><i className="fa fa-star" /></a></li>
																				</ul>
																			</div>
																		</div>
																		<h2><link to="/Productdetails" />{result.shortdescription}</h2>
																		<div className="price">
																			<ul>
																				<li className="new-price">{result.price}</li>
																			</ul>
																		</div>
																		<p>
																			{result.longdescription}

																		</p>
																	</div>
																</div>

															</>
														)
													})
												}


												{/* <!-- product-wrapper-end --> */}
											</div>
											<div class={tablist ? "tab-pane active" : "tab-pane"} id="list">
												<div class="row">
													{
														CategoriesProduct.map((result, index) => {
															return (
																<>
																	<div className="col-xl-4 col-lg-4 col-md-6 col-12">
																		{/* product-wrapper-start */}
																		<div className="product-wrapper mb-40">
																			<div className="product-img">
																				<a />
																				{/* src={BaseUrlVariable.imgUrl + result.i } */}
																				<img src={BaseUrlVariable.imgUrl + result.Productimage} alt="product" className="primary" />
																				{/* <img src="img/product/2.jpg" alt="product" className="secondary" /> */}

																				<a />
																				<span className="sale">sale</span>
																				<div className="product-icon">
																					{/* <link to="/cart" title="Add to Cart" />  */}

																					<a href="#" data-bs-toggle="tooltip" title="Add to Cart">
																						{/* <i className="icon ion-bag" /> */}
																						<BsFillBagCheckFill onClick={() => addtocarticon(result)}  />
																					</a>
																					{/* <i className="icon ion-bag" /> */}
																					{/* <a href="#" data-bs-toggle="tooltip" title="Compare this Product">
																						<i className="icon ion-android-options" />
																						<BsFillArrowUpRightSquareFill />
																						</a> */}
																					<a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View">
																						{/* <i className="icon ion-android-open" /> */}
																						<BsFillArrowUpRightSquareFill onClick={() => handleShow(result.uid)} />
																					</a>

																				</div>
																			</div>
																			<div className="product-content pt-20">
																				<div className="manufacture-product">
																					<a >{result.name}</a>
																					<div className="rating">
																						<ul>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																							<li><a href="#"><i className="fa fa-star" /></a></li>
																						</ul>
																					</div>
																				</div>
																				<h2><link to="/Productdetails" />{result.shortdescription}</h2>
																				<div className="price">
																					<ul>
																						<li className="new-price">{result.price}</li>
																					</ul>
																				</div>
																			</div>
																		</div>
																		{/* product-wrapper-end */}
																	</div>


																</>
															)
														})

													}

												</div>
											</div>
										</div>
										{/* <!-- tab-area-end -->
								<!-- pagination-area-start --> */}
										{/* <div class="pagination-area">
											<div class="pagination-number">
												<ul>
													<li><a href="#"><i class="fa fa-angle-left"></i></a></li>
													<li class="active"><a href="#">1</a></li>
													<li><a href="#">2</a></li>
													<li><a href="#">3</a></li>
													<li><a href="#"><i class="fa fa-angle-right"></i></a></li>
												</ul>
											</div>
											<div class="product-count">
												<p>Showing 1 - 12 of 13 items</p>
											</div>
										</div> */}
										{/* <!-- pagination-area-end --> */}
									</div>
									{/* <!-- shop-right-area-end --> */}
								</div>

							</div>
						</div>
					</div>
					{/* <!-- shop-main-area-end -->
			<!-- banner-area-2-start --> */}
					<div class="banner-area-2">
						<div class="container">
							<div class="br-bottom ptb-80">
								<div class="row">
									<div class="col-xl-4 col-lg-4 col-md-4 col-12">
										{/* <!-- single-banner-2-start --> */}
										<div class="single-banner-2 text-center mb-3">
											<div class="banner-icon">
												<a >
													<img src="/img/banner/2.png" alt="banner" />

												</a>
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
												<img src="img/product/2.jpg" alt="hat" class="primary" />
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

					</div>

				</div>

			{/* </body> */}

			{/* modal time */}
            <Modal show={show} onHide={handleClose}  >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* {
                        Categories.map((e)=>{
                            return(
                                <>
                                 <h1>{e.name}</h1>
                                  
                                </>
                            )
                           
                        })
                        

                    } */}



                    <div className="modal-img">
                        <div className="single-img">
                            <img src={BaseUrlVariable.imgUrl + DataModel.Productimage}  alt="hat" className="primary" />
                        </div>
                    </div>
                    <div className="model-text">
                        <h2><a href="javascript:void(0)"> {DataModel.name}</a> </h2>
                        {/* <div className="product-rating">
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star-o" /></a>
            </div> */}
                        <div className="price-rate">
                            <span className="old-price"><del>$30.00</del></span>
                            <span className="new-price">${DataModel.price}</span>
                        </div>
                        <div className="short-description mt-20">
                            <p>{DataModel.longdescription}</p>
                        </div>
                        <form action="#">
                            {/* <input type="number" defaultValue={1} /> */}
                            <Button style={{ padding: 5 }} className='mx-1 ' onClick={() => { setQuantity2(quantity2 - 1) }} disabled={quantity2 == 1}>
                                -
                            </Button>
                            {/* {' '} */}
                            {/* <p>{myState}</p> */}
                            <Button style={{ padding: 7 }} className='mx-1 '  >{quantity2}</Button>
                            {/* <Button type='button' className='mx-1  ' onClick={increamentcart} >
												+
											</Button> */}
                            <Button style={{ padding: 5 }} type='button' className='mx-1 ' onClick={() => { setQuantity2(quantity2 + 1) }} >
                                +
                            </Button>
                            <Button type="button" onClick={() => { addtocartfunction(DataModel) }} style={{ padding: 15 }} >Add to cart</Button>

                        </form>
                        <div className="product-meta">
                            <span>
                                Categories: {DataModel.CategoryName}
                                {/* <a href="javascript:void(0)">albums</a>,<a href="javascript:void(0)">Music</a> */}
                            </span>
                            {/* <span>
                Tags:
                <a href="javascript:void(0)">albums</a>,<a href="javascript:void(0)">Music</a>
              </span> */}
                        </div>
                        {/* social-icon-start */}
                        {/* <div className="social-icon mt-20">
              <ul>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Facebook"><i className="fa fa-facebook" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Twitter"><i className="fa fa-twitter" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Email to a Friend"><i className="fa fa-envelope-o" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Pin on Pinterest"><i className="fa fa-pinterest" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Google+"><i className="fa fa-google-plus" /></a></li>
              </ul>
            </div> */}
                        {/* social-icon-end */}
                    </div>
                    {/* <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form> */}
                    {/* <div className="modal-area"> */}
                    {/* single-modal-start */}
                    {/* <div className="modal fade" id="mymodal" tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-img">
            <div className="single-img">
              <img src="img/product/2.jpg" alt="hat" className="primary" />
            </div>
          </div>
          <div className="model-text">
            <h2><a href="javascript:void(0)">Pyrolux Pyrostone</a> </h2>
            <div className="product-rating">
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star" /></a>
              <a href="javascript:void(0)"><i className="fa fa-star-o" /></a>
            </div>
            <div className="price-rate">
              <span className="old-price"><del>$30.00</del></span>
              <span className="new-price">$28.00</span>
            </div>
            <div className="short-description mt-20">
              <p>Bacon ipsum dolor sit amet ut nostrud chuck, voluptate adipisicing veniam
                kielbasa fugiat ex spare ribs. Incididunt sint officia non cow, ut et. Cillum
                porchetta tongue occaecat laborum bacon aliquip fatback flank dolore short loin
                ball tip bresaola deserunt dolor. Shoulder fugiat ut in ut tail swine dolore,
                capicola ullamco beef occaecat meatball. Laboris turkey in et chuck deserunt ad
                incididunt do.</p>
            </div>
            <form action="#">
              <input type="number" defaultValue={1} />
              <button type="submit">Add to cart</button>
            </form>
            <div className="product-meta">
              <span>
                Categories:
                <a href="javascript:void(0)">albums</a>,<a href="javascript:void(0)">Music</a>
              </span>
              <span>
                Tags:
                <a href="javascript:void(0)">albums</a>,<a href="javascript:void(0)">Music</a>
              </span>
            </div>
            {/* social-icon-start */}
                    {/* <div className="social-icon mt-20">
              <ul>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Facebook"><i className="fa fa-facebook" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Twitter"><i className="fa fa-twitter" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Email to a Friend"><i className="fa fa-envelope-o" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Pin on Pinterest"><i className="fa fa-pinterest" /></a></li>
                <li><a href="javascript:void(0)" data-bs-toggle="tooltip" title="Share on Google+"><i className="fa fa-google-plus" /></a></li>
              </ul>
            </div> */}
                    {/* social-icon-end */}
                    {/* </div>
        </div>
      </div>
    </div>
  </div> */}
                    {/* single-modal-end */}
                    {/* </div> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

		</>
	)
}

export default Shop