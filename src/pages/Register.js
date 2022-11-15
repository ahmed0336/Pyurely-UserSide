import React, { useState, } from "react";
import Footer from './Footer'
import Header from './Header'
import axios from "axios";
import { notification } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PostApi } from "../Helper/helper";
import { Link, Router, useNavigate } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
import { Loader } from "react-overlay-loader";

const Register = () => {
	const [firstname, setfirstname] = useState("")
	const [lastname, setlastname] = useState("")
	const [contactno, setcontactno] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [loader, setLoader] = useState("")
	const [userData, setuserData] = useState(localStorage.getItem("token"))
	const Navigate = useNavigate();

	const send = () => {
		setLoader(true);
		const key = 'updatable';
		let formdata = new FormData()
		formdata.append("firstname", firstname)
		formdata.append("lastname", lastname)
		formdata.append("contactno", contactno)
		formdata.append("email", email)
		formdata.append("password", password)
		PostApi('https://pyurelyecommerce.pythonanywhere.com/api/signup', formdata, userData)
			.then((response) => {
				setLoader(false);
				console.log('response', response)
				if (response.data.status) {
					notification.open({
						key,
						message: 'Success',
						description: response.data.message,
						icon: <SmileOutlined style={{ color: '#108ee9' }} />,
						duration: 3,
					});
					Navigate('/login')
				} else {
					notification.info({
						key,
						message: 'Opps',
						description: response.data.message,
						duration: 3,
					});
				}
			}).catch((err) => {
				setLoader(false);
				console.log('errrrr', err)
			})

	}
	return (
		<div id="page-wraper">
			{/* <!-- header-area-start --> */}
			{loader ? <Loader fullPage loading /> : null}
			<Header />
			{/* <!-- header-top-area-end -->
			{/* <!-- header-area-end -->
			<!-- breadcrumbs-area-start --> */}
			<div class="breadcrumbs-area">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="breadcrumb-content text-center">
								<h2>register</h2>
								<ul>
									<li><Link to="/">Home /</Link></li>
									<li class="active"><a href="javascript:void(0)">register</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- breadcrumbs-area-end -->
			<!-- shop-main-area-start --> */}
			<div class="shop-main-area">
				{/* <!-- user-login-area-start --> */}
				<div class="user-login-area">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-xl-8 col-lg-10 col-md-12 col-12 ml-auto mr-auto">
								<form action="#">
									<div class="billing-fields">
										<div class="row">
											<div class="col-xl-6 col-lg-6 col-md-6 col-12">
												<div class="single-register">
													<label>First Name<span>*</span></label>
													<input type="text" onChange={(e) => { setfirstname(e.target.value) }} />
												</div>
											</div>
											<div class="col-xl-6 col-lg-6 col-md-6 col-12">
												<div class="single-register">
													<label>Last Name<span>*</span></label>
													<input type="text" onChange={(e) => { setlastname(e.target.value) }} />
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-xl-6 col-lg-6 col-md-6 col-12">
												<div class="single-register">
													<label>Phone<span>*</span></label>
													<input type="tel" onChange={(e) => { setcontactno(e.target.value) }} />
												</div>
											</div>

											<div class="col-xl-6 col-lg-6 col-md-6 col-12">
												<div class="single-register">
													<label>Email Address<span>*</span></label>
													<input type="email" onChange={(e) => { setemail(e.target.value) }} />
												</div>
											</div>
										</div>
										<div class="single-register">
											<label>Password<span>*</span></label>
											<input type="password" onChange={(e) => { setpassword(e.target.value) }} />
										</div>
										<div class="single-register">
											<button type="button" class="btn btn-outline-secondary" onClick={send}>Register</button>
										</div>
									<p align="center">Already have an account? <Link to={"/login"}>Login</Link></p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- user-login-area-end --> */}
			</div>
			{/* <!-- shop-main-area-end -->
			<!-- footer-area-start --> */}
			<Footer />
			{/* <!-- footer-area-end --> */}
		</div>
	)
}

export default Register
