import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Grid, Paper, Typography, Button , TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slider from 'react-slick';
import LinearProgress from '@mui/material/LinearProgress';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useRecoilState } from 'recoil'
import { cartQuantity } from '../../Providers/CartQuantity'
import { wishQuantity } from '../../Providers/WishListQuantityProvider'
import { cartReloadState } from '../../Providers/CartReload'
import './ProductCard.css'
import { productPopupProvider } from '../../Providers/ProductpopupProvider'
import ProductPopup from './ProductPopup'
import noimage from '../../ASSETS/noimage.png'
import { productPopupIdProvider } from '../../Providers/ProductPopupIdProvider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AuthPopup from '../Auth/AuthPopup';
import { authPopupState } from '../../Providers/AuthPopupProvider';
import logo from '../../ASSETS/loaderGif.gif'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'8px',
  p: 4,
  zIndex:9999,
  minHeight: '85vh !important',
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'8px',
  p: 4,
  zIndex:9999,
  minHeight: '85vh !important',
  display:'flex',
  justifyContent:'center',
};

const CustomPrevArrow = (props) => (
  <div className="custom-arrow custom-prev" onClick={props.onClick}>
    <ArrowBackIosNewIcon />
  </div>
);

const CustomNextArrow = (props) => (
  <div className="custom-arrow custom-next" onClick={props.onClick}>
    <ArrowForwardIosIcon />
  </div>
);


const ProductCard = ({ data, wishlist }) => {





  const [open, setOpen] = React.useState(false);
  const [show, setshow] = useState(false)
  const [count, setCount] = useState(1)
  const [productcode, setproductcode] = useState(data.ProductCode)
  const [showreview, setshowreview] = React.useState(false)

  const [cartdataquantity, setcartdataquantity] = useRecoilState(cartQuantity)
  const [wishlistdataquantity, setwishlistdataquantity] = useRecoilState(wishQuantity)
  const [authPopupShow, setAuthPopupShow] = useRecoilState(authPopupState);

  const [productpopup, setproductpopup] = useRecoilState(productPopupProvider)
  const [productpopupid, setproductpopupid] = useRecoilState(productPopupIdProvider)
  const navigate = useNavigate()

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  useEffect(() => {
    // Code to run when the component mounts
    let cart = JSON.parse(localStorage.getItem('cart'));
    //console.log(cart,data.ProductCode);
    if (cart) {
      cart.forEach((item) => {
        if (item.data.ProductCode === data.ProductCode) {
          setshow(true);
          console.log(item.quantity);
          setCount(item.quantity);
          getwhishlist();
        }
      });
    }
  }, []);

  const getcartitems = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart !== null) {
      let qty = 0;
      cart.forEach((item) => {
        qty += item.quantity
      })
      setcartdataquantity(qty)
    }
    else {
      setcartdataquantity(0)
    }
  }



  const addtocart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart === null) {
      cart = []

      cart.push({ data, quantity: count })
      localStorage.setItem('cart', JSON.stringify(cart))
      toast.success('Product added to cart', {
        position: "bottom-right",
        autoClose: 1000,
      })
      getcartitems()
    }
    else {
      let flag = 0
      cart.forEach((item) => {
        if (item.data.ProductCode === data.ProductCode) {
          flag = 1
          item.quantity = item.quantity + count
          setshow(true);
          toast.success('Product added to cart', {
            position: "bottom-right",
            autoClose: 1000,
          })
        }
      })
      if (flag === 0) {
        cart.push({ data, quantity: count })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      getcartitems()
    }
  }

  const incrementcartqty = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach((item) => {
      if (item.data.ProductCode === data.ProductCode) {
        item.quantity = item.quantity + 1
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    getcartitems()

  }

  const decrementcartqty = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach((item) => {
      if (item.data.ProductCode === data.ProductCode && item.quantity > 1) {
          item.quantity = item.quantity - 1;
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    getcartitems()

  }


  const [prodid, setprodid] = useState(null)
  const [isinwhishlist, setisinwhishlist] = useState(wishlist)
  // const addtowhishlist = () => {
  //   let user = localStorage.getItem('token')
  //   user = JSON.parse(user)
  //   // console.log(user)
  //   // console.log({
  //   //   "OrgId": "2",
  //   //   "CustomerId": user[0].B2CCustomerId,
  //   //   "ProductCode": data.ProductCode,
  //   //   "ProductName": data.ProductName,
  //   //   "IsActive": true,
  //   //   "CreatedBy": user[0].B2CCustomerId,
  //   //   "CreatedOn": `${new Date()}`,
  //   // })

  //   if (user) {
  //     fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerWishList/Create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "OrgId": "3",//REACT_APP_BACKEND_ORGANIZATION
  //         "CustomerId": user[0].B2CCustomerId,
  //         "ProductCode": data.ProductCode,
  //         "ProductName": data.ProductName,
  //         "IsActive": true,
  //         "CreatedBy": user[0].B2CCustomerId,
  //         "CreatedOn": `${new Date()}`,
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data)
  //         if (data.Code == 200) {
  //           setisinwhishlist(true)
  //           getwhishlist()
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  //   else {
  //     toast.error('Please signin to add to wishlist', {
  //       position: "bottom-right",
  //       autoClose: 1000,
  //     })
  //   }
  // }
  const addtowhishlist = () => {
    let user = localStorage.getItem('token');
    user = JSON.parse(user);
  
    if (user) {
      fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerWishList/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "OrgId": "3",
          "CustomerId": user[0].B2CCustomerId,
          "ProductCode": data.ProductCode,
          "ProductName": data.ProductName,
          "IsActive": true,
          "CreatedBy": user[0].B2CCustomerId,
          "CreatedOn": `${new Date()}`,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.Code === 200) {
            setisinwhishlist(true);
            getwhishlist();
            toast.success('Product added to favourites', {
              position: "bottom-right",
              autoClose: 1000,
            });
          }
        })
        .catch(err => {
          console.log(err);
          toast.error('Product could not be able to added to cart', {
            position: "bottom-right",
            autoClose: 1000,
        });
        });
    }
    else {
      // toast.error('Please sign in to add to wishlist', {
      //   position: "bottom-right",
      //   autoClose: 1000,
      // });
      setAuthPopupShow(true)
    }
    //localStorage.setItem('wishlist_' + productcode, 'true');
  }
  const getwhishlist = () => {
    let user = localStorage.getItem('token')
    user = JSON.parse(user)
    if (user) {
      fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.Code == 200) {
            data.Data.forEach((item) => {
              setwishlistdataquantity(data.Data.length)
              if (item.ProductCode === productcode) {
                setisinwhishlist(true)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const removewhishlist = () => {
    let user = localStorage.getItem('token')
    user = JSON.parse(user)
    if (user) {
      fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/Remove?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}&ProductCode=${productcode}&UserName=admin`)

        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.Code == 200) {
            setisinwhishlist(false);
            getwhishlist();
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
   // localStorage.removeItem('wishlist_' + productcode);
  }

  const [PopProducts, setproducts] = useState([]);

  const getProducts = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setproducts(data.Result)
        })
  }

  useEffect(() => {
    let user = localStorage.getItem('token');
    user = JSON.parse(user);
    if (user) {
      fetchWhishlistStatus(user[0].B2CCustomerId);
      getwhishlist();
    }
  }, []);
  const fetchWhishlistStatus = (customerId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${customerId}`)
      .then(res => res.json())
      .then(data => {
        if (data.Code === 200) {
          data.Data.forEach(item => {
            if (item.ProductCode === productcode) {
              setisinwhishlist(true);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  const [productData , setProductdata] = useState(null);
  const [popCount, setPopCount] = useState(1);

  const getProductById = async (code) => {

    fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId=3&ProductCode='+code, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  })
      .then(response => response.json())
      .then(data => {
          if (data.Code == 200) {
              setProductdata(data.Result[0])
                // let myimgset = []
                // myimgset.push({ id: 1, image: data.Result[0].ProductImagePath })
                // setimageset(myimgset)
                // setproductdata(data.Result[0])
                // setactiveimg(myimgset[0])
                // setProductName( data?.Result?.[0]?.Name || "" )
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  }


  
  const handleOpen = (code) => {
    getProductById(code);
    getProducts();
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);


  const addtocartPop = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemInCart = cart.find(item => item.data.ProductCode === productData.ProductCode);

    if (itemInCart) {
        itemInCart.quantity += count;
    } else {
        cart.push({ data: productData, quantity: count });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    toast.success('Product added to cart', {
        position: "bottom-right",
        autoClose: 1000,
    });

    getcartitems();
}

  return (
    <>

            {
                authPopupShow && <AuthPopup />
            }
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{zIndex:'9999'}}
        >
                {productData ? (
                <>
              <Box sx={style} className='pop-responsive'>
                             {productData && (
                <Grid container width='98%' >
                    <Grid item sm={12} md={8} >
                      <Grid container direction='row'>
                        <Grid item md={2.5} sx={{display:'flex' , justifyContent:'center' , alignItems:'flex-start'}}>
                            <Grid container direction='column' justifyContent='center'  alignItems='center'>
                              <Grid item p={2} m={1} sx={{border:'1px solid #02b290'}}>
                                  <img src={productData.ProductImagePath || noimage} alt='' width='90px' height='110px' />
                              </Grid>
                              {/* <Grid item p={2} m={1} sx={{border:'1px solid #02b290'}}>
                                  <img src={productData.ProductImagePath} alt='' width='90px' height='110px' />
                              </Grid>
                              <Grid item p={2} m={1} sx={{border:'1px solid #02b290'}}>
                                  <img src={productData.ProductImagePath} alt='' width='90px' height='110px' />
                              </Grid> */}
                     
                            </Grid>
                        </Grid>
                        <Grid item md={9} m={1}>
                          <Grid container justifyContent="center" alignItems="center" sx={{ border: '1px solid #02b290' , padding:'100px 0' }}>
                            <img src={productData.ProductImagePath || noimage} alt="" width="230px" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <Typography sx={{fontWeight:'500' , fontSize:'20px' , wordBreak:'break-all'}}>{productData.Name}</Typography>
                        {/* <Typography>1 each</Typography> */}
                        <Typography sx={{fontWeight:'bolder', fontSize:'20px'}} >S${productData.SellingCost}</Typography>
                        <Typography sx={{color:'#F98F60' , padding:'10px 0'}}>only items left</Typography>
                        <Grid className="calc-box" container sx={{borderRadius:'5px'}}>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'30px' , cursor:'pointer'}} 
                                   onClick={() => {
                                      if (popCount > 1) {
                                        setPopCount(popCount - 1)
                                      }
                                  }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'20px'}}>{popCount}</Typography>
                            </Grid>
                            <Grid item> 
                              <AddIcon   sx={{fontSize:'30px' , cursor:'pointer'}} 
                                  onClick={() => {
                                   if (productData?.EcommerceDetail && productData.EcommerceDetail[0].StockAvailability) {
                                       if (popCount < productData.EcommerceDetail[0].QtyOnHand) {
                                        setPopCount(popCount + 1)
                                       }
                                       else {
                                           toast.error('You have reached maximum quantity', {
                                               position: "bottom-right",
                                               autoClose: 1000,
                                           })
                                       }
                                   }
                                   else {
                                    setPopCount(popCount + 1)
                                   }
                               }}
                              />
                            </Grid>
                        </Grid>
                        <Grid className="cart-box" container 
                          onClick={() => {
                              addtocartPop()
                          }}>
                            <Grid item>
                                <ShoppingBagOutlinedIcon />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontWeight:'bold' , cursor:'pointer'}}>Add to Cart</Typography>
                            </Grid>
                        </Grid>
                        {/* <Grid container direction='row' justifyContent='space-between'>
                            <Grid className="pop-box" item md={5.5}>
                                <FavoriteBorderIcon />
                                <Typography>Wishlist</Typography>
                            </Grid> 
                            <Grid className="pop-box" item md={5.5}>
                                < ReplyOutlinedIcon />
                                <Typography>Share</Typography>
                            </Grid>
                        </Grid> */}
                        <Grid pt={2}>
                            <Typography sx={{fontWeight:'600'}}>Product Details:</Typography>
                        </Grid>
                        <Grid>
                          <Typography>
                            <div dangerouslySetInnerHTML={{ __html: productData && productData.EcommerceDetail[0].Desciption || '-' }} />
                          </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
             {showreview ? (
              <>
                  <Grid container pt={2} pb={2} justifyContent='space-between'>
                    <Grid item md={5.5}>
                      <Typography sx={{padding:'20px 0px' , fontSize:'20px'}}>Submit Your review</Typography>
                        <Grid container> 
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Name"
                            sx={{marginBottom:'20px'}}
                          />
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Email"
                            sx={{marginBottom:'20px'}}
                          />
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Review"
                            sx={{marginBottom:'20px'}}
                          />
                          <Rating name="no-value" value={null} sx={{fontSize:'50px'}} />
                        </Grid>
                        <Button sx={{margin:'10px 0',padding:'8px 30px' , backgroundColor:'#02b290' , color:'white' , fontWeight:'bold' , fontSize:'15px'}}>Submit</Button>
                    </Grid>
                    <Grid item md={5.5}>
                        <Typography sx={{padding:'20px 0px' , fontSize:'20px'}}>Product reviews</Typography>

                    </Grid>
                  </Grid>
              </>
             ):(
              <></>
             )}

                <Grid sx={{margin:'30px 0 '}}>
                    <Typography sx={{fontWeight:'bold' ,fontSize:'25px'}}>Related products</Typography>
                </Grid>
                <Grid className="slider-container">
 
                          {PopProducts.length > 0 ? (
                           <>
                                <Slider {...settings}>
                                  {PopProducts && PopProducts.length && PopProducts.map((item , index) => (
                                    <div style={{ display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                                      <Grid item xs={6} sm={4} md={3} lg={3} xl={2.4}  key={index} className="image-hover-effect" sx={{margin:'10px' , minWidth:'200px' }}>
                                        <Card sx={{cursor:'pointer'}} >
                                        <CardContent>
                                            <Grid container direction='column'>
                                                <Grid item sx={{ display: 'flex', justifyContent: 'unset'}} >
                                                    <div>
                                                        <img
                                                        src={item.ProductImagePath || noimage}
                                                        alt='c1'
                                                        width='150px'
                                                        height='160px'
                                                        style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' , paddingLeft:'10px' }}
                                                        className="image-hover-effect"
                                                    />
                                                    </div>
                                                </Grid>
                                                <Grid item  sx={{zIndex:'9999' , paddingTop:'10px' }} >
                                                    <Grid container sx={{ display:'flex' , flexDirection:'column' , justifyContent:'space-between' ,  minHeight:'150px'}} >
                                                        <Grid item>
                                                            <Typography sx={{fontWeight:'bold' , lineHeight:'1.5rem' ,fontSize:'1rem'}}>S${item.PcsPrice} - S${item.SellingCost}</Typography>
                                                            <Typography sx={{padding:' 10px 0px' , color:'#595959' , fontSize:'14px' , wordBreak:'break-all'}}>{item.Name}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography>1 each</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        </Card>
                                      </Grid>
                                    </div>
                                  ))}
                                </Slider>
                            </>
                          ) 

                    : (
                      <></>
                    )}
                </Grid> 
                </Box>
                </>
                ):(
                  <>
                <Box sx={style2} className='pop-responsive'>
                  <div style={{display:'flex' , justifyContent:'center'}}>
                    <img src={logo} alt="Loading..." />
                  </div>
                </Box>
                  </>
                )}
                <CloseIcon sx={{ position:'relative' , float:'right' , cursor:'pointer'}} onClick={handleClose} />
        </Modal>



                <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4}  className="image-hover-effect">
                    <Card sx={{cursor:'pointer'}} 
                    // onClick={() => {
                    //   setproductpopupid(data.ProductCode)
                    //   navigate(`/product/${data.ProductCode}`)
            
                    //   window.location.href = `/product/${data.productshorturl}`
                      
                    // }}
                    >
                    <CardContent>
                      <Grid container direction='column'>
                        <Grid item>
                          {
                             isinwhishlist ? (
                              < FavoriteIcon sx={{float:'right'}} onClick={removewhishlist} />
                             ):(
                              < FavoriteBorderIcon sx={{float:'right'}} onClick={addtowhishlist} />
                             )
                          }
                          <ToastContainer />
                          <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            onClick={(e) => {handleOpen(data.ProductCode)}}
                          >
                              <div>
                                  <img
                                      src={data.ProductImagePath || noimage}
                                      alt='c1'
                                      width='110px'
                                      height='120px'
                                      style={{
                                          objectFit: 'cover',
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          paddingLeft: '10px'
                                      }}
                                      className="image-hover-effect"
                                  />
                              </div>
                          </Grid>
                          {show ? (
                            <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                              <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                                <Grid item>
                                    <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} 
                                      onClick={() => {
                                        if (count > 1) {
                                          setCount(count - 1)
                                          decrementcartqty()
                                        }else{
                                          setshow(false)
                                        }
                                      }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography  sx={{fontSize:'16px'}}>{count}</Typography>
                                </Grid>
                                <Grid item>
                                    <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}
                                      onClick={() => {
                                        if (data?.EcommerceDetail && data.EcommerceDetail[0].StockAvailability) {
                                          if (count < data.EcommerceDetail[0].QtyOnHand) {
                                            if(count < 10){
                                              setCount(count + 1)
                                              incrementcartqty()
                                            }
                                          } else {
                                            toast.error('You have reached the maximum quantity', {
                                              position: "bottom-right",
                                              autoClose: 1000,
                                            })
                                          }
                                        } else {
                                          setCount(count + 1)
                                          incrementcartqty()
                                        }
                                      }}
                                    />
                                </Grid>
                              </Grid>  
                              {/* < CancelIcon onClick={() => setshow(false)} sx={{color:'red' , marginTop:'-31px'}}/> */}
                            </Grid>
                          ):(
                            <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                              <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}
                                // onClick={() => {
                                //   setproductpopupid(data.ProductCode)
                                //   navigate(`/product/${data.productshorturl}`)
                                // }}
                                onClick={(e) => {handleOpen(data.ProductCode)}}
                              />
                              <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}
                                onClick={() => {
                                  addtocart()
                                  setshow(true)
                                }}
                              />
                            </Grid>
                          )}
                   
                        </Grid>
                          <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} onClick={(e) => {handleOpen(data.ProductCode)}}>
                              <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                                  <Grid item>
                                      <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ {
                                       data.SellingCost.toFixed(2)}</Typography>
                                      <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>{data.ProductName}</Typography>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </Grid>
                    </CardContent>
                    </Card>
                </Grid>

    {/* <div className='product'>
       {
         isinwhishlist ?
       // localStorage.getItem('wishlist_' + productcode) === 'true' ?
          <div className='wishlistbtn1'
          onClick={() => {
            removewhishlist()
          }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          :
          <div className='wishlistbtn'
            onClick={() => {
              addtowhishlist()
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
      } 
     
       <ToastContainer /> 
      <div className='s1'
        onClick={() => {
          setproductpopupid(data.ProductCode)
          navigate(`/product/${data.ProductCode}`)

          window.location.href = `/product/${data.productshorturl}`
          
        }}
      >
       
        {
          data.ProductImagePath ?
            <img src={data.ProductImagePath} alt={'no img'} loading="lazy"/>
            :
            <img src={noimage} alt={'no img'} loading="lazy"/>
        }
        
      </div>
      <div className='s2'>
        <h3>
          $ {
            data.SellingCost.toFixed(2)
          }
        </h3>
        <p>
          <b>
          {
          data.ProductName
        }</b></p>
      </div>

      {
        show ?
        <div className='addbtn'>
        <div className='qty' style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <button className='qtybtn'
            onClick={() => {
              if (count > 1) {
                setCount(count - 1)
                decrementcartqty()
              }
            }}
            style={{ margin: '0 5px' }} >-</button>
          <p >{count}</p>
          <button className='qtybtn'
            onClick={() => {
              if (data?.EcommerceDetail && data.EcommerceDetail[0].StockAvailability) {
                if (count < data.EcommerceDetail[0].QtyOnHand) {
                  setCount(count + 1)
                  incrementcartqty()
                } else {
                  toast.error('You have reached the maximum quantity', {
                    position: "bottom-right",
                    autoClose: 1000,
                  })
                }
              } else {
                setCount(count + 1)
                incrementcartqty()
              }
            }}
            style={{ margin: '0 5px' }}>+</button>
    
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={() => setshow(false)}
   
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
        </div>
      </div>
      
          :
          <div className='addbtn'>
 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"

              onClick={() => {
                setproductpopupid(data.ProductCode)
                navigate(`/product/${data.productshorturl}`)
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
              onClick={() => {
                addtocart()
                setshow(true)
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

          </div>
      }
    </div> */}
    </>
  )
}

export default ProductCard