
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Link, useNavigate } from "react-router-dom";
import { getApiWithOutToken } from "../Helper/helper";
import '../pages/responsive.css';
import '../pages/style.css';
import Footer from './Footer';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';

import { AddtoCartaction } from '..//Redux/Actions/ActionFunction';
// react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// nofication alert
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';

import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

import { BsFillBagCheckFill } from "react-icons/bs";

import BaseUrlVariable from '../BaseUrl/Baseurl'
import { Loader } from 'react-overlay-loader';


const Index = () => {
    const [Products, setProducts] = useState("");
    const [Categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const key = 'updatable';

    // now for quantity2 increament and decrement
    const [quantity2, setQuantity2] = useState(1)
    const [datasn, setDatasn] = useState([])

    // now for product id
    const [CartDetail, SetCartDetail] = useState([])
    const [EID, setEID] = useState('')

    const [loader, setLoader] = useState(false)


    // CartDetail
    // const [CartDetail, SetCartDetail] = useState([])

    const navigate = new useNavigate();
    const dispatch = useDispatch();

    // modal states
    const [show, setShow] = useState(false);

    const [DataModel, setDataModel] = useState([])

    const [GetEachProduct, setGetEachProduct] = useState([])



    const handleClose = () => setShow(false);


    console.log("value of quantity 2==>", quantity2)


    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        setLoader(true)

        fetch("https://pyurelyecommerce.pythonanywhere.com/api/GetEachProduct", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == true) {
                    setLoader(false)
                    console.log("ahmed api", result.data)
                    //  console.log("ahmed api",result.data[0].name)
                    //  console.log("ahmed api",result.data[1].Productimage)
                    setGetEachProduct(result.data)

                }


            }

            )
            .catch(error => console.log('error', error));


    }, [])
    //   console.log("name1 of ahmed",GetEachProduct[0].name )
    //   console.log("image of ahmed", BaseUrlVariable.imgUrl + GetEachProduct[0].Productimage )
    //   console.log("ahmed baloch",GetEachProduct)
    //   console.log("name2 of ahmed",  GetEachProduct[1].name )
    //   console.log("image of ahmed", BaseUrlVariable.imgUrl + GetEachProduct.Productimage )

    const handleShow = (e) => {





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

    const Url = ["https://pyurelyecommerce.pythonanywhere.com/media/"]

    useEffect(() => {
        getCategories();
        // Product()
    }, [])

    const getCategories = () => {
        getApiWithOutToken('https://pyurelyecommerce.pythonanywhere.com/api/CategoryGet', "")
            .then(({ data }) => {
                setCategories(data.data)
                console.log("ahmed categories ==>", data.data)
                getSpecificCategoryProducts(data.data[0].name);
                console.log("ahmed categories name ==>", data.data[0].name)
                // data.data[1] me accessories phir etc
            }).catch((err) => {
                console.log('err---------', err)
            })
    }

    //  yeh api b tab wali hai planner ke andr kitne product hai wo wali hai
    const getSpecificCategoryProducts = (e) => {
        getApiWithOutToken(`https://pyurelyecommerce.pythonanywhere.com/api/Getspecificcategory?name=${e}`, "")
            .then(({ data }) => {
                setProducts(data.data)

                console.log("ahmed products individuals ==>", Products)
            }).catch((err) => {
                console.log('err---------', err)
            })
    }

    const AddtoCart = (id) => {
        navigate(`/Productdetails/${id}`)
    }


    // carticon add to cart redux work quantity add  static 1 to 1
    const addcartdetail = useSelector((state) => state.counter.myCart)
    console.log("index redux addcartdetail ==> ", addcartdetail)

    const addtocarticon = (e) => {
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
            setShow(false)
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
            setShow(false)
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
            {/* <!-- Add your site or application content here --> */}
            {/* <!-- page-wraper-start --> */}
            <div id="page-wraper">
                {/* <!-- header-area-start --> */}
                <Header />
                {/* <!-- header-area-end -->
                <!-- slider-area-start --> */}
                <AwesomeSlider>
                    <div data-src="img/slider/1new.jpg" />
                    <div data-src="img/banner/1new.png" />
                    <div data-src="img/banner/4new.png" />
                    {/* <div data-src="img/slider/16.jpg" /> */}
                    {/* <div data-src="img/slider/2new.jpg" />
                    <div data-src="img/slider/3new.jpg" />
                    <div data-src="img/slider/4new.jpg" /> */}
                </AwesomeSlider>

                {/* <!-- slider-area-end -->
                <!-- founder-area-start --> */}
                <div className="founder-area ptb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="founder-description text-center">
                                    <h3>Who Are We</h3>
                                    <h1>Welcome To Pyurely</h1>
                                    <img src="img/banner/1.png" alt="banner" />
                                    <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
                                        vel illum dolore eu feugiat nulla facilisis <br /> at vero eros et accumsan et iusto
                                        odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                                        nulla <br /> facilisi.</p>
                                    <h4>xyz <span>CEO Pyurely</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- founder-area-end -->
                <!-- banner-area-start --> */}
                <div className="banner-area">
                    <div className="container">
                        <div className="row">
                            {
                                GetEachProduct.map((result, index) => {
                                    return (
                                        <>

                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-40-2">
                                                {/* <!-- single-banner-start --> */}
                                                <Link to={"/shop/" + result.name} >
                                                    <div className="single-banner mb-20 mb-3">
                                                        <div className="banner-img">
                                                            <a href="#"><img width={250} height={250} src={BaseUrlVariable.imgUrl + result.Productimage} alt="banner" /></a>
                                                        </div>
                                                        <div className="banner-content">
                                                            <a to="#">{result.name}</a>
                                                            {/* {result.name} */}
                                                        </div>
                                                    </div>
                                                    {/* <!-- single-banner-start -->
                                <!-- single-banner-end --> */}
                                                    {/* <div className="single-banner mb-3">
                                                    <div className="banner-img">
                                                        <a href="#"><img src="img/banner/2.jpg" alt="banner" /></a>
                                                    </div>
                                                    <div className="banner-content">
                                                        <Link to="/Productdetails" >Accessories</Link>
                                                    </div>
                                                </div> */}
                                                    {/* <!-- single-banner-end --> */}
                                                </Link>
                                            </div>

                                        </>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
                {/* <!-- banner-area-end -->
                <!-- feature-product-area-start --> */}
                <div className="feature-product-area ptb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title mb-30 text-center">
                                    <h2>Featured Products</h2>
                                    <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit
                                        litterarum formas.</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <Tabs defaultActiveKey="1" centered onChange={(e) => getSpecificCategoryProducts(e)}>
                                    {Categories.map((e) => (
                                        <Tabs.TabPane tab={e.name} key={e.name}>
                                            {/* planner ,accesories etc */}
                                            <div className="row">
                                                {
                                                    Products.length > 0
                                                        ?
                                                        Products.map((e, i) => (
                                                            <div className="col-lg-4" key={i}>
                                                                <div className="product-wrapper">
                                                                    <Link to={`/Productdetails/${e.uid}`}>
                                                                        <div className="product-img">
                                                                            <Link to={`/Productdetails/${e.uid}`}>
                                                                                <img src={`${Url}${e.Productimage}`} alt="product" className="primary" />
                                                                                <img src={`${Url}${e.Productimage}`} alt="product" className="secondary" />
                                                                            </Link>
                                                                            <span className="sale">sale</span>
                                                                            <div className="product-icon">
                                                                                <Link to="" title="Add to Cart">
                                                                                    {/* <i
                                                                                    className="icon ion-bag" onClick={() => addtocarticon(e)} ></i> */}
                                                                                    <BsFillBagCheckFill onClick={() => addtocarticon(e)} />
                                                                                </Link>
                                                                                {/* <a href=""
                                                                                    title="Compare this Product"><i className="icon ion-android-options"></i>
                                                                                    </a> */}

                                                                                <Link to="" title="Quick View">
                                                                                    {/* <i
                                                                                    className="icon ion-android-open" onClick={() => handleShow(e.uid)} >
                                                                                        </i> */}
                                                                                    <BsFillArrowUpRightSquareFill onClick={() => handleShow(e.uid)} />

                                                                                </Link>
                                                                                {/* <a href=""
                                                                                    title="Quick View" handleShow><i className="icon ion-android-open"></i></a> */}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="product-content pt-20">
                                                                        <div className="manufacture-product">
                                                                            <a href="">{e.name}</a>
                                                                            <div className="rating">
                                                                                <ul>
                                                                                    <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                    <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                    <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                    <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                    <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <h2><a href="">{e.name}</a>
                                                                        </h2>
                                                                        <div className="price">
                                                                            <ul>
                                                                                <li className="new-price">${e.price}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        <div className="col-md-12">
                                                            <p>No Product Found!</p>
                                                        </div>
                                                }
                                            </div>
                                        </Tabs.TabPane>
                                    ))}
                                    {/* //static */}
                                    {/* <Tabs.TabPane tab="PLANNERS" key="PLANNERS">
                                        <div className="row">
                                            {
                                                Products.length > 0
                                                    ?
                                                    Products.map((e, i) => (
                                                        <div className="col-lg-4" key={i}>
                                                            <div className="product-wrapper">
                                                                <Link to={`/Productdetails/${e.uid}`}>
                                                                    <div className="product-img">
                                                                        <Link to={`/Productdetails/${e.uid}`}>
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="primary" />
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="secondary" />
                                                                        </Link>
                                                                        <span className="sale">sale</span>
                                                                        <div className="product-icon">
                                                                            <Link to="" title="Add to Cart">
                                                                                <i
                                                                                    className="icon ion-bag" onClick={() => ahmed(e)} >
                                                                                </i>
                                                                            </Link>
                                                                            <a href=""
                                                                                title="Compare this Product"><i className="icon ion-android-options"></i></a>
                                                                            <a href=""
                                                                                title="Quick View"><i className="icon ion-android-open"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="product-content pt-20">
                                                                    <div className="manufacture-product">
                                                                        <a href="">{e.name}</a>
                                                                        <div className="rating">
                                                                            <ul>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <h2><a href="">{e.name}</a>
                                                                    </h2>
                                                                    <div className="price">
                                                                        <ul>
                                                                            <li className="new-price">${e.price}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    <div className="col-md-12">
                                                        <p>No Product Found!</p>
                                                    </div>
                                            }
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="MESSENGER BAGS" key="MESSENGER BAGS">
                                        <div className="row">
                                            {
                                                Products.length > 0
                                                    ? Products.map((e, i) => (
                                                        <div className="col-lg-4" key={i}>
                                                            <div className="product-wrapper">
                                                                <Link to={`/Productdetails/${e.uid}`}>
                                                                    <div className="product-img">
                                                                        <Link to={`/Productdetails/${e.uid}`}>
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="primary" />
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="secondary" />
                                                                        </Link>
                                                                        <span className="sale">sale</span>
                                                                        <div className="product-icon">
                                                                            <Link to="" title="Add to Cart"><i
                                                                                className="icon ion-bag"  ></i></Link>
                                                                            <a href=""
                                                                                title="Compare this Product"><i className="icon ion-android-options"></i></a>
                                                                            <a href=""
                                                                                title="Quick View"><i className="icon ion-android-open"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="product-content pt-20">
                                                                    <div className="manufacture-product">
                                                                        <a href="">{e.name}</a>
                                                                        <div className="rating">
                                                                            <ul>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <h2><a href="">{e.name}</a>
                                                                    </h2>
                                                                    <div className="price">
                                                                        <ul>
                                                                            <li className="new-price">${e.price}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>)) :
                                                    <div className="col-md-12">
                                                        <p>No Product Found!</p>
                                                    </div>
                                            }
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="BRIEF CASES" key="BRIEF CASES">
                                        <div className="row">
                                            {
                                                Products.length > 0
                                                    ? Products.map((e, i) => (
                                                        <div className="col-lg-4" key={i}>
                                                            <div className="product-wrapper">
                                                                <Link to={`/Productdetails/${e.uid}`}>
                                                                    <div className="product-img">
                                                                        <Link to={`/Productdetails/${e.uid}`}>
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="primary" />
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="secondary" />
                                                                        </Link>
                                                                        <span className="sale">sale</span>
                                                                        <div className="product-icon">
                                                                            <Link to="" title="Add to Cart"><i
                                                                                className="icon ion-bag"  ></i></Link>
                                                                            <a href=""
                                                                                title="Compare this Product"><i className="icon ion-android-options"></i></a>
                                                                            <a href=""
                                                                                title="Quick View"><i className="icon ion-android-open"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="product-content pt-20">
                                                                    <div className="manufacture-product">
                                                                        <a href="">{e.name}</a>
                                                                        <div className="rating">
                                                                            <ul>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <h2><a href="">{e.name}</a>
                                                                    </h2>
                                                                    <div className="price">
                                                                        <ul>
                                                                            <li className="new-price">${e.price}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>)) :
                                                    <div className="col-md-12">
                                                        <p>No Product Found!</p>
                                                    </div>
                                            }
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="PENS" key="PENS">
                                        <div className="row">
                                            {
                                                Products.length > 0
                                                    ? Products.map((e, i) => (
                                                        <div className="col-lg-4" key={i}>
                                                            <div className="product-wrapper">
                                                                <Link to={`/Productdetails/${e.uid}`}>
                                                                    <div className="product-img">
                                                                        <Link to={`/Productdetails/${e.uid}`}>
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="primary" />
                                                                            <img src={`${Url}${e.Productimage}`} alt="product" className="secondary" />
                                                                        </Link>
                                                                        <span className="sale">sale</span>
                                                                        <div className="product-icon">
                                                                            <Link to="" title="Add to Cart"><i
                                                                                className="icon ion-bag"  ></i></Link>
                                                                            <a href=""
                                                                                title="Compare this Product"><i className="icon ion-android-options"></i></a>
                                                                            <a href=""
                                                                                title="Quick View"><i className="icon ion-android-open"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="product-content pt-20">
                                                                    <div className="manufacture-product">
                                                                        <a href="">{e.name}</a>
                                                                        <div className="rating">
                                                                            <ul>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                                <li><a href=""><i className="fa fa-star"></i></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <h2><a href="">{e.name}</a>
                                                                    </h2>
                                                                    <div className="price">
                                                                        <ul>
                                                                            <li className="new-price">${e.price}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>)) :
                                                    <div className="col-md-12">
                                                        <p>No Product Found!</p>
                                                    </div>
                                            }
                                        </div>
                                    </Tabs.TabPane> */}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- feature-product-area-end -->
        <!-- testimonial-area-start --> */}
                {/* <!-- <div className="testimonial-area bg ptb-80">
            <div className="container">
                <div className="testimonial-active owl-carousel">
                    <div className="single-testimonial text-center">
                        <div className="testimonial-img">
                            <a href="#"><img src="img/testimonial/1.jpg" alt="man" /></a>
                        </div>
                        <div className="testimonial-content">
                            <p>This is Photoshops version of Lorem Ipsum. Proin gravida nibh vel velit.Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. In molestie augue magna. Pellentesque felis
                                lorem, pulvinar sed eros n..</p>
                            <i className="fa fa-quote-right"></i>
                            <h4>Rebecka Filson</h4>
                        </div>
                    </div>
                    <div className="single-testimonial text-center">
                        <div className="testimonial-img">
                            <a href="#"><img src="img/testimonial/1.jpg" alt="man" /></a>
                        </div>
                        <div className="testimonial-content">
                            <p>Mauris blandit, metus a venenatis lacinia, felis enim tincidunt est, condimentum
                                vulputate orci augue eu metus. Fusce dictum, nisi et semper ultricies, felis tortor
                                blandit odio, egestas consequat pur..</p>
                            <i className="fa fa-quote-right"></i>
                            <h4>Nathanael Jaworski</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div> --> */}
                {/* <!-- testimonial-area-end -->
        <!-- arrivals-area-start --> */}
                {/* <!-- <div className="arrivals-area ptb-80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title mb-30 text-center">
                            <h2>Latest Arrivals </h2>
                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit
                                litterarum formas. </p>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="product-active owl-carousel">
                      
                        <div className="product-wrapper">
                            <div className="product-img">
                                <a href="#">
                                    <img src="img/product/23.jpg" alt="product" className="primary" />
                                    <img src="img/product/24.jpg" alt="product" className="secondary" />
                                </a>
                                <span className="sale">sale</span>
                                <div className="product-icon">
                                    <a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i
                                            className="icon ion-bag"></i></a>
                                    <a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i
                                            className="icon ion-android-options"></i></a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i
                                            className="icon ion-android-open"></i></a>
                                </div>
                            </div>
                            <div className="product-content pt-20">
                                <div className="manufacture-product">
                                    <a href="#">Chanel</a>
                                    <div className="rating">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h2><a href="#">Sopo Designs Woolrich Klettersack Backpack</a></h2>
                                <div className="price">
                                    <ul>
                                        <li className="new-price">$122.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="product-wrapper">
                            <div className="product-img">
                                <a href="#">
                                    <img src="img/product/31.jpg" alt="product" className="primary" />
                                    <img src="img/product/32.jpg" alt="product" className="secondary" />
                                </a>
                                <div className="product-icon">
                                    <a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i
                                            className="icon ion-bag"></i></a>
                                    <a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i
                                            className="icon ion-android-options"></i></a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i
                                            className="icon ion-android-open"></i></a>
                                </div>
                            </div>
                            <div className="product-content pt-20">
                                <div className="manufacture-product">
                                    <a href="#">Dior</a>
                                    <div className="rating">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h2><a href="#">Topo Designs Woolrich Klettersack Backpack</a></h2>
                                <div className="price">
                                    <ul>
                                        <li className="new-price">$122.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="product-wrapper">
                            <div className="product-img">
                                <a href="#">
                                    <img src="img/product/7.jpg" alt="product" className="primary" />
                                    <img src="img/product/8.jpg" alt="product" className="secondary" />
                                </a>
                                <span className="sale">sale</span>
                                <div className="product-icon">
                                    <a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i
                                            className="icon ion-bag"></i></a>
                                    <a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i
                                            className="icon ion-android-options"></i></a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i
                                            className="icon ion-android-open"></i></a>
                                </div>
                            </div>
                            <div className="product-content pt-20">
                                <div className="manufacture-product">
                                    <a href="#">Chanel </a>
                                    <div className="rating">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h2><a href="#">Dopo Designs Woolrich Klettersack Backpack</a></h2>
                                <div className="price">
                                    <ul>
                                        <li className="new-price">$122.00</li>
                                        <li className="old-price">$98.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="product-wrapper">
                            <div className="product-img">
                                <a href="#">
                                    <img src="img/product/11.jpg" alt="product" className="primary" />
                                    <img src="img/product/12.jpg" alt="product" className="secondary" />
                                </a>
                                <div className="product-icon">
                                    <a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i
                                            className="icon ion-bag"></i></a>
                                    <a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i
                                            className="icon ion-android-options"></i></a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i
                                            className="icon ion-android-open"></i></a>
                                </div>
                            </div>
                            <div className="product-content pt-20">
                                <div className="manufacture-product">
                                    <a href="#">Chanel</a>
                                    <div className="rating">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h2><a href="#">Eopo Designs Woolrich Klettersack Backpack</a></h2>
                                <div className="price">
                                    <ul>
                                        <li className="new-price">$98.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="product-wrapper">
                            <div className="product-img">
                                <a href="#">
                                    <img src="img/product/33.jpg" alt="product" className="primary" />
                                    <img src="img/product/34.jpg" alt="product" className="secondary" />
                                </a>
                                <div className="product-icon">
                                    <a href="#" data-bs-toggle="tooltip" title="Add to Cart"><i
                                            className="icon ion-bag"></i></a>
                                    <a href="#" data-bs-toggle="tooltip" title="Compare this Product"><i
                                            className="icon ion-android-options"></i></a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#mymodal" title="Quick View"><i
                                            className="icon ion-android-open"></i></a>
                                </div>
                            </div>
                            <div className="product-content pt-20">
                                <div className="manufacture-product">
                                    <a href="#">IVY Moda</a>
                                    <div className="rating">
                                        <ul>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                            <li><a href="#"><i className="fa fa-star"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h2><a href="#">Ropo Designs Woolrich Klettersack Backpack</a></h2>
                                <div className="price">
                                    <ul>
                                        <li className="new-price">$142.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --> */}
                {/* <!-- arrivals-area-end -->
        <!-- banner-area-start -->
        <div className="banner-area"> */}

            </div>
            {/* <!-- banner-area-end -->
        <!-- banner-area-2-start --> */}
            <div className="banner-area-2">
                <div className="container">
                    <div className="br-bottom ptb-80">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                {/* <!-- single-banner-2-start --> */}
                                <div className="single-banner-2 text-center mb-3">
                                    <div className="banner-icon">
                                        <a href="#"><img src="/img/banner/2.png" alt="banner" /></a>
                                    </div>
                                    <div className="banner-text">
                                        <h2>Free Shipping Worldwide</h2>
                                        <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
                                    </div>
                                </div>
                                {/* <!-- single-banner-2-end --> */}
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                {/* <!-- single-banner-2-start --> */}
                                <div className="single-banner-2 text-center mb-3">
                                    <div className="banner-icon">
                                        <a href="#"><img src="img/banner/3.png" alt="banner" /></a>
                                    </div>
                                    <div className="banner-text">
                                        <h2>Money Back Guarantee</h2>
                                        <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
                                    </div>
                                </div>
                                {/* <!-- single-banner-2-end --> */}
                            </div>
                            {/* <!-- single-banner-2-start --> */}
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                <div className="single-banner-2 text-center">
                                    <div className="banner-icon">
                                        <a href="#"><img src="img/banner/4.png" alt="banner" /></a>
                                    </div>
                                    <div className="banner-text">
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
            <!-- blog-area-start --> */}
            {/* <!-- <div className="blog-area ptb-80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title mb-30 text-center">
                            <h2>From Our Blog</h2>
                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit
                                litterarum formas.</p>
                        </div>
                    </div>
                </div>
                <div className="blog-active owl-carousel">
                    <div className="single-blog">
                        <div className="blog-img">
                            <a href="#"><img src="img/blog/1.jpg" alt="blog" /></a>
                            <div className="date">
                                Aug <span>09</span>
                            </div>
                        </div>
                        <div className="blog-content pt-20">
                            <h3><a href="#">Aypi non habent claritatem insitam.</a></h3>
                            <span>HasTech</span>
                            <p>Aypi non habent claritatem insitam. Aypi non habent claritatem insitam. Aypi non habent
                                claritatem insitam.Aypi non habent claritatem insitam. Aypi non habent claritatem
                                insitam.</p>
                            <a href="#">Read more ...</a>
                        </div>
                    </div>
                    <div className="single-blog">
                        <div className="blog-img">
                            <a href="#"><img src="img/blog/2.jpg" alt="blog" /></a>
                            <div className="date">
                                Aug <span>09</span>
                            </div>
                        </div>
                        <div className="blog-content pt-20">
                            <h3><a href="#">Bypi non habent claritatem insitam.</a></h3>
                            <span>HasTech</span>
                            <p>Aypi non habent claritatem insitam. Aypi non habent claritatem insitam. Aypi non habent
                                claritatem insitam.Aypi non habent claritatem insitam. Aypi non habent claritatem
                                insitam.</p>
                            <a href="#">Read more ...</a>
                        </div>
                    </div>
                    <div className="single-blog">
                        <div className="blog-img">
                            <a href="#"><img src="img/blog/3.jpg" alt="blog" /></a>
                            <div className="date">
                                Aug <span>09</span>
                            </div>
                        </div>
                        <div className="blog-content pt-20">
                            <h3><a href="#">Cypi non habent claritatem insitam.</a></h3>
                            <span>HasTech</span>
                            <p>Aypi non habent claritatem insitam. Aypi non habent claritatem insitam. Aypi non habent
                                claritatem insitam.Aypi non habent claritatem insitam. Aypi non habent claritatem
                                insitam.</p>
                            <a href="#">Read more ...</a>
                        </div>
                    </div>
                    <div className="single-blog">
                        <div className="blog-img">
                            <a href="#"><img src="img/blog/2.jpg" alt="blog" /></a>
                            <div className="date">
                                Aug <span>09</span>
                            </div>
                        </div>
                        <div className="blog-content pt-20">
                            <h3><a href="#">Bypi non habent claritatem insitam.</a></h3>
                            <span>HasTech</span>
                            <p>Aypi non habent claritatem insitam. Aypi non habent claritatem insitam. Aypi non habent
                                claritatem insitam.Aypi non habent claritatem insitam. Aypi non habent claritatem
                                insitam.</p>
                            <a href="#">Read more ...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> --> */}
            {/* <!-- blog-area-end -->
        <!-- newslatter-area-start --> */}
            {/* <!-- <div className="newslatter-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bt-top ptb-80">
                            <div className="newlatter-content text-center">
                                <h6>Special Offers For Subscribers</h6>
                                <h3>Ten Percent Member Discount</h3>
                                <p>Subscribe to our newsletters now and stay up to date with new collections, the latest
                                    lookbooks and exclusive offers.</p>
                                <form action="#">
                                    <input type="text" placeholder="Enter your email address here..." />
                                    <button type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --> */}
            {/* <!-- newslatter-area-end -->
        <!-- footer-area-start --> */}
            <Footer />

            {/* <!-- footer-area-end -->
        <!-- modal-area-start --> */}
            {/* <div className="modal-area"> */}
            {/* <!-- single-modal-start --> */}
            {/* <div className="modal fade" id="mymodal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-img">
                                    <div className="single-img">
                                        <img src="img/product/2.jpg" alt="hat" className="primary" />
                                    </div>
                                </div>
                                <div className="model-text">
                                    <h2><a href="#">Pyrolux Pyrostone</a> </h2>
                                    <div className="product-rating">
                                        <a href="#"><i className="fa fa-star"></i></a>
                                        <a href="#"><i className="fa fa-star"></i></a>
                                        <a href="#"><i className="fa fa-star"></i></a>
                                        <a href="#"><i className="fa fa-star"></i></a>
                                        <a href="#"><i className="fa fa-star-o"></i></a>
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
                                        <input type="number" value="1" />
                                        <button type="submit">Add to cart</button>
                                    </form>
                                    <div className="product-meta">
                                        <span>
                                            Categories:
                                            <a href="#">albums</a>,<a href="#">Music</a>
                                        </span>
                                        <span>
                                            Tags:
                                            <a href="#">albums</a>,<a href="#">Music</a>
                                        </span>
                                    </div> */}
            {/* <!-- social-icon-start --> */}
            {/* <div className="social-icon mt-20">
                                        <ul>
                                            <li><a href="#" data-bs-toggle="tooltip"
                                                title="Share on Facebook"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip"
                                                title="Share on Twitter"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip"
                                                title="Email to a Friend"><i className="fa fa-envelope-o"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip"
                                                title="Pin on Pinterest"><i className="fa fa-pinterest"></i></a></li>
                                            <li><a href="#" data-bs-toggle="tooltip"
                                                title="Share on Google+"><i className="fa fa-google-plus"></i></a></li>
                                        </ul>
                                    </div> */}

            {/* </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

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
                            <img  src={BaseUrlVariable.imgUrl + DataModel.Productimage} alt="hat" className="primary" />
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

export default Index
