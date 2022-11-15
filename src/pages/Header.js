import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getApiWithOutToken } from "../Helper/helper";
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";

import { GiHamburgerMenu } from "react-icons/gi";


import { AiFillCloseCircle } from 'react-icons/ai';
import { decNumber, incNumber, AddtoCartaction } from '..//Redux/Actions/ActionFunction';



const Header = () => {
	const [datas, setdatas] = useState("")
	const [loader, setLoader] = useState(false)
	const dispatch = useDispatch();

	const Navigate = useNavigate()

	const Token = localStorage.getItem('token')

	const [size, setSize] = useState(window.innerWidth)

	console.log("window.innerWidth",size)
	
	const ahmed = document.getElementById("conatinerofmobile")

	// useEffect(()=>{
	// 	if(size < 780 )
	// {
	// 	alert("chota size")
	// }
	// else{
	// 	alert("bara size")
	// }

	// }, [])

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

{/* Performs similarly to componentDidMount in classes */}
useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth <= 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
}, [isMobile]);

	
	
//  const yaseen =	ahmed.children[1]
	
	// console.log("container child==>",yaseen)


	useEffect(() => {
		getData()
	}, [])

	const getData = () => {
		getApiWithOutToken('https://pyurelyecommerce.pythonanywhere.com/api/CategoryGet', "")
			.then(({ data }) => {
				setLoader(true)
				setdatas(data.data)
				console.log("Datassss", data)
			}).catch((err) => {
				console.log('err---------', err)

			})
	}

	const Url = ["https://pyurelyecommerce.pythonanywhere.com/media/"]

	const toggle = () => {
		console.log("run")
		let hide_card = document.getElementById("hide-cart");
		if (hide_card.style.display == "none") {
			hide_card.style.display = "block";
		} else {
			hide_card.style.display = "none";
		}
	}

	const [Total, setTotal] = useState([])

	const myState = useSelector((state) => state.counter.counter)
	// console.log("value of count in header", myState)

	// add to cart redux work
	const addcartdetail = useSelector((state) => state.counter.myCart)
	console.log("header addcartdetail ==> ", addcartdetail)


	useEffect(() => {

		addcartdetail.map((a, i) => {
			console.log("map of map", a)
			if (i === 0) {
				setTotal(Number(a.price) * Number(a.quantity))
			} else {
				setTotal((perv) => perv + (Number(a.price) * Number(a.quantity)))

			}



		})


	}, [addcartdetail])

	//  let total =quantity+price
	//  console.log("total amount is ==>",total)

	// console.log("addcartdetail==>", addcartdetail.map((a)=>a['description'] = 'ahmed'))
	// console.log("addcartdetail==>", addcartdetail.map((a) => a['quantity'] = myState))

	// let objIndex = addcartdetail.findIndex((a => a.uid == 0));

	// console.log("addcartdetail array of object work ==>", objIndex)

	// let car = addcartdetail.find(car =>
	// 	{
	// 		if( car.uid === "5d9dd76b-6c9a-44b7-8d30-9859c820b254" ){


	// 			console.log(" using find all planner1   in cart",car)
	// 			// car.push({ age: ''})
	// 		}
	// 	} );


	// 		let redCars = addcartdetail.filter(car => car.uid === "5d9dd76b-6c9a-44b7-8d30-9859c820b254");
	// 		//   redCars.push()
	// console.log("using filter",redCars);



	// 	console.log("addcartdetail name ==>", addcartdetail[0].name)

	const [open, setopen] = useState(false)


	const [show, setShow] = useState(false);

	const handleClose = (e) => {
		console.log("handleClose", e)

		let MapReduxStore = addcartdetail.filter(car => {

			if (car.uid !== e) {
				return {
					car
				}
			}


		})

		dispatch(AddtoCartaction([...MapReduxStore]))


		console.log("jisko delete nai krna hai", MapReduxStore)

	}

	// console.log("handleClose",e)
	// dispatch(AddtoCartaction([]))
	// addcartdetail('')
	// setTotal([])

	// }
	// setShow(false);
	// const handleShow = () => setShow(true);

	const checkoutpage = () => {


		if (Token == null) {
			Navigate("/Login")
		}
		else {

			Navigate("/Checkout")
		}


	}

	const LogoutFunction = () => {


		localStorage.clear()
		// Navigate("/Login")
		dispatch(AddtoCartaction([]))


	}

	const [menuToggle,setmenuToggle]=useState(false)

	const ahmedtoggle = () =>{
		setmenuToggle(!menuToggle)
	}
	

	const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10)
    })
  }, [])




	return (
		<header>
			{/* <!-- header-top-area-start --> */}
			<div  className={scroll ? "header-top-area sticky" : "header-top-area"}  id="sticky-header" >
				<div className="container">
					<div className="row">
						<div className="col-xl-2 col-lg-2 col-md-6 col-6">
							{/* <!-- logo-area-start --> */}
							<div className="logo-area">
								<Link to="/">
									{/* <img src="/img/logo/1.png" alt="logo" /> */}
									<img src="/img/logo/Pyurely-01.png" alt="logo" />
								</Link>
							</div>
							{/* <!-- logo-area-end --> */}
						</div>
						<div className="col-xl-7 col-lg-7 d-none d-lg-block">
							{/* <!-- menu-area-start --> */}
							<div className="menu-area">
								<nav>
									<ul>
										<li><Link to="/">Home</Link></li>
										{
											datas.length > 0 ? datas.map((e, i) => (
												<li key={i}><Link to={"/Shop/" + e.name} >{e.name}</Link></li>
											))
												: null}
										{/* </ul> */}
										{/* {	  
		                datas.map((value) => {
                          return (
							  <h1>{ value.name }</h1>
							
                        //  <li className="active"><Link to="/"><a href="/">{ value.name }</a>
						// 						</Link></li>
											 );

											})
										} */}
										{/* <li><Link to="/">About</Link>
											<ul className="sub-menu">
												<li><Link to="/"><a>Laptop Service</a></Link></li>
												<li><Link to="/"><a>Computer Accessories</a></Link></li>
											</ul>
										</li>
										<li> <Link to="/Shop"><a>Shop</a></Link></li>
										<li><Link to="/shop">Brief Cases</Link></li>
										<li><Link to="/shop">Pens</Link></li>
										<li><Link to="/Contact">Contact Us</Link></li> */}
										{/* <!-- <li><a href="javascript:void(0)">Men</a>
												<ul className="mega-menu">
													<li><a href="#">Integer vestib</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">finibus iaculis</a></li>
															<li><a href="javascript:void(0)">Integer rhoncus</a></li>
															<li><a href="javascript:void(0)">purus elittincidu</a></li>
															<li><a href="javascript:void(0)">tincidunt est</a></li>
														</ul>
													</li>
													<li><a href="#">Phasellus inviv</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">Fusce eurhon</a></li>
															<li><a href="javascript:void(0)">iaculis ipsum</a></li>
															<li><a href="javascript:void(0)">ligula consectet</a></li>
															<li><a href="javascript:void(0)">vestibulum egest</a></li>
														</ul>
													</li>
													<li><a href="#">suscipit mauris</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">Integer rhoncus</a></li>
															<li><a href="javascript:void(0)">ipsum ametus</a></li>
															<li><a href="javascript:void(0)">Morbi vitae</a></li>
															<li><a href="javascript:void(0)">semper vulputate</a></li>
														</ul>
													</li>
													<li><a href="#">viverra lacus</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">Aliquam acsus</a></li>
															<li><a href="javascript:void(0)">Morbi amimi</a></li>
															<li><a href="javascript:void(0)">pretium metus</a></li>
															<li><a href="javascript:void(0)">suscipit felis</a></li>
														</ul>
													</li>
												</ul>
											</li>
											<li><a href="javascript:void(0)">Accessories</a>
												<ul className="mega-menu mega-menu-2">
													<li><a href="#">suscipit mauris</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">Integer rhoncus</a></li>
															<li><a href="javascript:void(0)">ipsum ametus</a></li>
															<li><a href="javascript:void(0)">Morbi vitae</a></li>
															<li><a href="javascript:void(0)">semper vulputate</a></li>
														</ul>
													</li>
													<li><a href="#">viverra lacus</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">Aliquam acsus</a></li>
															<li><a href="javascript:void(0)">Morbi amimi</a></li>
															<li><a href="javascript:void(0)">pretium metus</a></li>
															<li><a href="javascript:void(0)">suscipit felis</a></li>
														</ul>
													</li>
												</ul>
											</li>
											<li><a href="javascript:void(0)">Women</a>
												<ul className="mega-menu mega-menu-2">
													<li><a href="#">fermentum grav</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">arcu dignissim</a></li>
															<li><a href="javascript:void(0)">congue quamm</a></li>
															<li><a href="javascript:void(0)">necfer mentuma</a></li>
															<li><a href="javascript:void(0)">ultricies volutpat</a></li>
														</ul>
													</li>
													<li><a href="#">gravida metus</a>
														<ul className="sub-menu-2">
															<li><a href="javascript:void(0)">acaliquet orci</a></li>
															<li><a href="javascript:void(0)">dignissim placera</a></li>
															<li><a href="javascript:void(0)">risussed trist</a></li>
															<li><a href="javascript:void(0)">Utsuscipit urna</a></li>
														</ul>
													</li>
												</ul>
											</li>
											<li><a href="blog.html">Blog</a>
												<ul className="sub-menu">
													<li><a href="blog.html">blog</a></li>
													<li><a href="blog-details.html">blog details</a></li>
												</ul>
											</li>
											<li><a href="#">pages</a>
												<ul className="sub-menu">
													<li><a href="javascript:void(0)">Shop</a></li>
													<li><a href="product-details.html">product details</a></li>
													<li><a href="blog.html">blog</a></li>
													<li><a href="blog-details.html">blog details</a></li>
													<li><a href="login.html">login</a></li>
													<li><a href="register.html">register</a></li>
													<li><a href="contact.html">contact</a></li>
													<li><a href="about.html">about</a></li>
													<li><a href="cart.html">cart</a></li>
													<li><a href="checkout.html">checkout</a></li>
													<li><a href="wishlist.html">wishlist</a></li>
													<li><a href="404.html">404</a></li>
												</ul>
											</li> --> */}
									</ul>
								</nav>
							</div>
							{/* <!-- menu-area-end --> */}
						</div>
						<div className="col-xl-3 col-lg-3 com-md-6 col-6">
							{/* <!-- header-right-area-start --> */}
							<div className="header-right-area">
								<ul>
									{/* comment search icon with all */}
									{/* <li>
										<a href="#" id="show-search">
											<i className="icon ion-ios-search-strong">
											</i>
										</a>
										<div className="search-content" id="hide-search">
											<span className="close" id="close-search">
												<i className="ion-close"></i>
											</span>
											<div className="search-text">
												<h1>Search</h1>
												<form action="#">
													<input type="text" placeholder="search" />
													<button className="btn" type="button">
														<i className="fa fa-search"></i>
													</button>
												</form>
											</div>
										</div>
									</li> */}
									{/* <li>ahmed</li> */}
									<li>
										<Link to={"/cart"}>
											{/* <a > */}
											{/* <i className="icon ion-bag"> */}
											<AiOutlineShoppingCart />
											{/* </i> */}
											{/* </a> */}
										</Link>

										<span>{addcartdetail.length}</span>


										{
											addcartdetail.length > 0 ?
												<div className="mini-cart-sub">

													{
														addcartdetail?.map((result, index) => {
															return (
																<>
																	<div className="cart-product">
																		{/* add close icon */}
																		{/* <li className='la la-user' ></li> */}

																		<AiFillCloseCircle onClick={() => { handleClose(result.uid) }} style={{ marginLeft: "180", cursor: "pointer" }} fontSize={30} />


																		<div className="single-cart">
																			<div className="cart-img">
																				<a href="#">
																					<img src={`${Url}${result?.Productimage}`} alt="book" />
																				</a>
																			</div>
																			<div className="cart-info">
																				<h5  ><a href="#">{result?.name}</a></h5>
																				<p  >{`${result?.quantity} x ${result?.price}`}</p>
																				<p  >Total:  {result?.quantity * result?.price} </p>
																			</div>
																		</div>







																	</div>
																</>
															)

														})

													}

													{/* {
												addcartdetail.length > 0 ? 
												<> */}

													<div className="cart-totals">
														<h5>Total <span> {Total}</span></h5>
													</div>
													<div className="cart-bottom">
														{/* <Link to={""} > */}
														<a onClick={checkoutpage} >Check out</a>
														{/* </Link> */}
													</div>

													{/* </>
											 : null
												
											} */}



												</div>
												: null



										}







									</li>




									{/* <div className="single-cart">
													<div className="cart-img">
														<a href="#"><img src="/img/product/1.jpg" alt="book" /></a>
													</div>
													<div className="cart-info">
														<h5><a href="#">{addcartdetail.datasn.name}</a></h5> 
														 <p> {`${myState} x ${addcartdetail.datasn.price}`}</p>
													</div> */}
									{/* {
													addcartdetail.map((result, index) => {
														return (
															<>
																<div className="single-cart">
																	<div className="cart-img">
																		<a href="#"><img src="/img/product/3.jpg" alt="book" /></a>
																	</div>
																	<div className="cart-info">
																	<h5 key={index} ><a href="#">{addcartdetail[index].name}</a></h5> 
																		<p key={index} >{`${myState} x ${addcartdetail[index].price}`}</p>
																	</div>
																</div>

															</>
														)
													})

												} */}



									<li onClick={toggle}>
										<a id="show-cart">
											{/* <i className="icon ion-drag"></i> */}
											<GiHamburgerMenu fontSize={30} />

										</a>
										<div className="shapping-area" id="hide-cart" >
											{/* <!-- <div className="single-shapping mb-20">
													<span>Currency</span>
													<ul>
														<li><a href="#">€ Euro </a></li>
														<li><a href="#">£ Pound Sterling</a></li>
														<li><a href="#">$ US Dollar</a></li>
													</ul>
												</div>
												<div className="single-shapping mb-20">
													<span>Language</span>
													<ul>
														<li><a href="#"><img src="img/flag/1.jpg" alt="flag" /> English</a>
														</li>
														<li><a href="#"><img src="img/flag/2.jpg" alt="flag" /> French</a>
														</li>
													</ul>
												</div> --> */}
											<div className="single-shapping">
												<span>My Account</span>
												<ul>
													<li><Link to="/register">Register</Link></li>
													<li><Link to="/login">Login</Link></li>
													<li onClick={LogoutFunction}><Link to="/login">Logout</Link></li>
												</ul>
											</div>
										</div>
									</li>
								</ul>
							</div>
							{/* <!-- header-right-area-end --> */}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- header-top-area-end -->
				<!-- mobile-menu-area-start --> */}

			<div className="mobile-menu-area d-block d-lg-none clearfix">
				<div className={`${isMobile ? "container mean-container" : "container"}`} id='conatinerofmobile'>
					{/* YEH mene add kia hai */}
					<div className="mean-bar">
						<a  onClick={ahmedtoggle} className={menuToggle ? "meanmenu-reveal meanclose" : "meanmenu-reveal"} style={{ background: '', color: '', right: 0, left: 'auto' }}><span><span><span /></span></span>
						</a>
						<nav className="mean-nav">
						<ul id="nav" style={ menuToggle ? { fontSize:"18",right:"0px",left:"0px",textAlign:"center",textIndent:"0px", }
					        :  { display: 'none' }
					}>
						<li><Link to="/">Home</Link></li>
										{
											datas.length > 0 ? datas.map((e, i) => (
												<li key={i}><Link to={"/Shop/" + e.name} >{e.name}</Link></li>
											))
												: null}
							
							{/* <li><a href="javascript:void(0)">Accessories</a>
								<ul className="sub-menu" style={{ display: 'none' }}>
									<li><a href="javascript:void(0)">Laptop Service</a></li>
									<li><a href="javascript:void(0)">Computer Accessories</a></li>
								</ul>
								<a className="mean-expand" href="#" style={{ fontSize: '18px' }}>+</a></li>
							<li><a href="javascript:void(0)">Messenger Bags</a></li>
							<li><a href="javascript:void(0)">Brief Cases</a></li>
							<li><a href="javascript:void(0)">Pens</a></li>
							<li className="mean-last"><a href="javascript:void(0)">Planners</a></li> */}
							
						</ul>
					</nav></div>

					<div className="row">
						<div className="col-lg-12">
							<div className="mobile-menu">
								<nav id="mobile-menu-active">
									<ul id="nav">
										<li className="active"><a href="/">Home</a>
											<ul className="sub-menu">
												<li><a href="index-4.html">Home-2</a></li>
												<li><a href="index-7.html">Home-3</a></li>
											</ul>
										</li>
										<li><a href="javascript:void(0)">Accessories</a>
											<ul className="sub-menu">
												<li><a href="javascript:void(0)">Laptop Service</a></li>
												<li><a href="javascript:void(0)">Computer Accessories</a></li>
											</ul>
										</li>
										<li><a href="javascript:void(0)">Messenger Bags</a></li>
										<li><a href="javascript:void(0)">Brief Cases</a></li>
										<li><a href="javascript:void(0)">Pens</a></li>
										<li><a href="javascript:void(0)">Planners</a></li>
										{/* <!-- <li><a href="javascript:void(0)">Men</a>
												<ul>
													<li><a href="javascript:void(0)">finibus iaculis</a></li>
													<li><a href="javascript:void(0)">Integer rhoncus</a></li>
													<li><a href="javascript:void(0)">purus elittincidu</a></li>
													<li><a href="javascript:void(0)">tincidunt est</a></li>
													<li><a href="javascript:void(0)">Fusce eurhon</a></li>
													<li><a href="javascript:void(0)">iaculis ipsum</a></li>
													<li><a href="javascript:void(0)">ligula consectet</a></li>
													<li><a href="javascript:void(0)">vestibulum egest</a></li>
													<li><a href="javascript:void(0)">Integer rhoncus</a></li>
													<li><a href="javascript:void(0)">ipsum ametus</a></li>
													<li><a href="javascript:void(0)">Morbi vitae</a></li>
													<li><a href="javascript:void(0)">semper vulputate</a></li>
													<li><a href="javascript:void(0)">Aliquam acsus</a></li>
													<li><a href="javascript:void(0)">Morbi amimi</a></li>
													<li><a href="javascript:void(0)">pretium metus</a></li>
													<li><a href="javascript:void(0)">suscipit felis</a></li>
												</ul>
											</li>
											<li><a href="javascript:void(0)">Accessories</a>
												<ul>
													<li><a href="javascript:void(0)">Integer rhoncus</a></li>
													<li><a href="javascript:void(0)">ipsum ametus</a></li>
													<li><a href="javascript:void(0)">Morbi vitae</a></li>
													<li><a href="javascript:void(0)">semper vulputate</a></li>
													<li><a href="javascript:void(0)">Aliquam acsus</a></li>
													<li><a href="javascript:void(0)">Morbi amimi</a></li>
													<li><a href="javascript:void(0)">pretium metus</a></li>
													<li><a href="javascript:void(0)">suscipit felis</a></li>
												</ul>
											</li>
											<li><a href="javascript:void(0)">Women</a>
												<ul>
													<li><a href="javascript:void(0)">arcu dignissim</a></li>
													<li><a href="javascript:void(0)">congue quamm</a></li>
													<li><a href="javascript:void(0)">necfer mentuma</a></li>
													<li><a href="javascript:void(0)">ultricies volutpat</a></li>
													<li><a href="javascript:void(0)">acaliquet orci</a></li>
													<li><a href="javascript:void(0)">dignissim placera</a></li>
													<li><a href="javascript:void(0)">risussed trist</a></li>
													<li><a href="javascript:void(0)">Utsuscipit urna</a></li>
												</ul>
											</li>
											<li><a href="blog.html">blog</a>
												<ul>
													<li><a href="blog.html">Blog</a></li>
													<li><a href="blog-details.html">blog details</a></li>
												</ul>
											</li>
											<li><a href="javascript:void(0)">Pages</a>
												<ul>
													<li><a href="javascript:void(0)">Shop</a></li>
													<li><a href="product-details.html">product details</a></li>
													<li><a href="blog.html">Blog</a></li>
													<li><a href="blog-details.html">blog details</a></li>
													<li><a href="about.html">About</a></li>
													<li><a href="contact.html">Contact</a></li>
													<li><a href="checkout.html">Checkout</a></li>
													<li><a href="cart.html">Cart</a></li>
													<li><a href="login.html">Login</a></li>
													<li><a href="register.html">Register</a></li>
													<li><a href="wishlist.html">Wishlist</a></li>
													<li><a href="404.html">404 Page</a></li>
												</ul>
											</li> --> */}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- mobile-menu-area-end --> */}

		</header >
	)
}

export default Header