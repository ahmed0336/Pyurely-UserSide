
import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Contact = () => {
  return (
    <>
     <body class="contact">
        {/* <!--[if lt IE 8]> */}
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        {/* <![endif]--> */}

        {/* <!-- Add your site or application content here -->
		<!-- page-wraper-start --> */}
		<div id="page-wraper">
			{/* <!-- header-area-start --> */}
			<Header/>
			{/* <!-- header-area-end -->
			<!-- breadcrumbs-area-start --> */}
			<div class="breadcrumbs-area">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="breadcrumb-content text-center">
								<h2>contact</h2>
								<ul>
									<li><a href="/">Home /</a></li>
									<li class="active"><a href="javascript:void(0)">contact</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- breadcrumbs-area-end -->
			<!-- shop-main-area-start --> */}
			<div class="shop-main-area">
				{/* <!-- googleMap-area-start --> */}
				
				{/* <!-- googleMap-end -->
				<!-- contact-area-start --> */}
				<div class="contact-area ptb-80">
					<div class="container">
						<div class="row">
							<div class="col-xl-6 col-lg-6 col-md-12 col-12">
								<div class="contact-info mb-3 mb-40-2">
									<h3>Contact info</h3>
									<ul>
										<li>
											<i class="fa fa-map-marker"></i>
											<span>Address</span>
											Your address goes here. 							
										</li>
										<li>
											<i class="fa fa-envelope"></i>
											<span>Phone</span>
											(800) 0123 4567 890 
										</li>
										<li>
											<i class="fa fa-mobile"></i>
											<span>Email</span>
											<a href="#">demo@example.com</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-12 col-12">
								<div class="contact-form">
									<h3><i class="fa fa-envelope-o"></i>Leave a Message</h3>
									<div class="row">
										<div class="col-xl-6">
											<div class="single-form-3">
												<form action="#">
													<input type="text" placeholder="Name (required)" />
												</form>
											</div>
										</div>
										<div class="col-xl-6">
											<div class="single-form-3">
												<form action="#">
													<input type="email" placeholder="Email (required)" />
												</form>
											</div>
										</div>
									</div>
									<div class="single-form-3">
										<form action="#">
											<input type="text" placeholder="Subject" />
										</form>
									</div>
									<div class="single-form-3">
										<form action="#">
											<textarea name="massage" placeholder="Massage" cols="30" rows="6"></textarea>
											<input type="submit" value="Submit Form"/>
										</form>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				{/* <!-- contact-area-end --> */}
			</div>
			{/* <!-- shop-main-area-end --> */}
			{/* <!-- footer-area-start --> */}
			<Footer/>
			{/* <!-- footer-area-end --> */}
	   </div>
	 
    </body>
      
    </>
  )
}

export default Contact

