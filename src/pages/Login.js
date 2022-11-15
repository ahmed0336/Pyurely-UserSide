import React, { useState, } from "react";
import Footer from './Footer'
import Header from './Header'
import axios from "axios";
import { notification } from 'antd';
import { PostApiWithOutToken } from "../Helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
import { Loader } from 'react-overlay-loader';

const Login = () => {
	const key = 'updatable';
	const [userDatas, setuserData] = useState(localStorage.getItem("tokenen"))
	const [dataError, setdataError] = useState("")
	const [status, setStatus] = React.useState(true)
	const [show, setShow] = useState(false)
	const Navigate = useNavigate();

	const handleshow = () => {
		setShow(!show)
	}

	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [loader, setLoader] = useState(false)
	
	const onSubmit = () => {
		setLoader(true);
		const formData = new FormData()
		formData.append("email", email)
		formData.append("password", password)
		PostApiWithOutToken('https://pyurelyecommerce.pythonanywhere.com/api/admin_login', formData)
			.then(({ data }) => {
				setLoader(true);
				if (data.status) {
					localStorage.setItem("token", data.token)
					notification.open({
						key,
						message: 'Success',
						description: data.message,
						duration: 3,
						icon: <SmileOutlined style={{ color: '#108ee9' }} />,
					});
					Navigate('/')
				}
				else {
					notification.info({
						key,
						message: 'Opps',
						description: data.message,
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
			{/* <!-- header-area-end -->
			<!-- breadcrumbs-area-start --> */}
			<div class="breadcrumbs-area">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="breadcrumb-content text-center">
								<h2>login</h2>
								<ul>
									<li><Link to="/">Home /</Link></li>
									<li class="active"><a href="javascript:void(0)">login</a></li>
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
							<div class="col-xl-6 col-lg-8 col-md-12 col-12 ml-auto mr-auto">
								<div class="login-form">
									<div class="single-login">
										<label>Username or email<span>*</span></label>
										<input type="text" onChange={(e) => { setemail(e.target.value) }} />
									</div>
									<div class="single-login">
										<label>Password <span>*</span></label>
										<input type={show ? "text" : "password"} onChange={(e) => { setpassword(e.target.value) }} />
										<span onClick={handleshow} style={{cursor:"pointer"}} class="d-flex flex-row-reverse">{show ? "hide" : "show"}</span>
									</div>
									<div class="single-login single-login-2">
										<button type="button" onClick={onSubmit} className="btn btn-outline-secondary" tabindex="4">login</button>
									</div>
									<p align="center">Not Register? <Link to={"/register"}>Register</Link></p>
									{/* <a href="#">Lost your password?</a> */}
								</div>
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

export default Login
