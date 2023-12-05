import React , {useState} from 'react'
import noimage from '../../ASSETS/noimage.png'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { wishPopupState } from '../../Providers/WishPopupProvider'
import './Wishlist.css';
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
import { cartQuantity } from '../../Providers/CartQuantity'
import { wishQuantity } from '../../Providers/WishListQuantityProvider'
import { cartReloadState } from '../../Providers/CartReload'
import { productPopupProvider } from '../../Providers/ProductpopupProvider'
import { productPopupIdProvider } from '../../Providers/ProductPopupIdProvider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AuthPopup from '../Auth/AuthPopup';
import { authPopupState } from '../../Providers/AuthPopupProvider';
import logo from '../../ASSETS/loaderGif.gif'
import { Grid, Paper, Typography, Button , TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


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


// import '../Cart/CartItem.css'
const WishListItem = ({ item, getwishlist }) => {
    console.log(item)
    const [showdelete, setshowdelete] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  const [productData , setProductdata] = useState(null);
  const [popCount, setPopCount] = useState(1);
  const [count, setCount] = useState(1)

  const [cartdataquantity, setcartdataquantity] = useRecoilState(cartQuantity)
  const [showreview, setshowreview] = React.useState(false)

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



  // const getcartitems = () => {
  //   let cart = JSON.parse(localStorage.getItem('cart'))
  //   if (cart !== null) {
  //     let qty = 0;
  //     cart.forEach((item) => {
  //       qty += item.quantity
  //     })
  //     setcartdataquantity(qty)
  //   }
  //   else {
  //     setcartdataquantity(0)
  //   }
  // }


  const getcartitems = () => {
    const userData = JSON.parse(localStorage.getItem('token'));
    const userId = userData && userData.length ? userData[0].B2CCustomerId : null;

    const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

    if (userId) {
        const userCart = cartArray.find((userCart) => userCart.UserId === userId);

        if (userCart) {
            let qty = 0;
            userCart.CartItems.forEach((item) => {
                qty += item.quantity;
            });
            setcartdataquantity(qty);
        } else {
            // User has no items in the cart
            setcartdataquantity(0);
        }
    } else {
        // User is not logged in or has invalid data
        setcartdataquantity(0);
    }
};


  const getProductById = async (code) => {

    console.log("API"  , process.env.REACT_APP_BACKEND_URL + '/Product/Getbycode?OrganizationId=3&ProductCode='+code )


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


//   const addtocartPop = () => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const itemInCart = cart.find(item => item.data.ProductCode === productData.ProductCode);

//     if (itemInCart) {
//         itemInCart.quantity += count;
//     } else {
//         cart.push({ data: productData, quantity: count });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));

//     toast.success('Product added to cart', {
//         position: "bottom-right",
//         autoClose: 1000,
//     });

//     getcartitems();
// }

const addtocartPop = () => {
  const userData = JSON.parse(localStorage.getItem('token'));
  const userId = userData && userData.length ? userData[0].B2CCustomerId : null;

  let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

  if (userId) {
      const userCart = cartArray.find((userCart) => userCart.UserId === userId);

      if (userCart) {
          const itemInCart = userCart.CartItems.find(item => item.data.ProductCode === productData.ProductCode);

          if (itemInCart) {
              itemInCart.quantity += count;
          } else {
              userCart.CartItems.push({ data: productData, quantity: count });
          }
      } else {
          // User has no cart, create a new entry for the user
          cartArray.push({ UserId: userId, CartItems: [{ data: productData, quantity: count }] });
      }

      localStorage.setItem('cartArray', JSON.stringify(cartArray));

      toast.success('Product added to cart', {
          position: "bottom-right",
          autoClose: 1000,
      });

      getcartitems(); // Assuming you have a function to update cart quantity in UI
  } else {
      // Handle the case where the user is not logged in
      // You may want to show a message or redirect the user to the login page
      console.log('User not logged in');
  }
};


  const handleOpen = (code) => {
    getProductById(code);
    getProducts();
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);


    const removewishlist = () => {
        let user = JSON.parse(localStorage.getItem('token'));

        // console.log(`${process.env.REACT_APP_BACKEND_URL}/B2CCustomerWishList/Remove?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}&ProductCode=${item[0].ProductCode}&UserName=${user[0].B2CCustomerName}`);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/B2CCustomerWishList/Remove?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}&ProductCode=${item[0].ProductCode}&UserName=${user[0].B2CCustomerName}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                getwishlist();
            })
            .catch(err => {
                getwishlist();
                console.log(err);
            });
    };

    // const addtocart = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart'))
    //     if (cart === null) {
    //         cart = []

    //         cart.push({ data: item[0], quantity: 1 })
    //         localStorage.setItem('cart', JSON.stringify(cart))
    //         toast.success('Product added to cart', {
    //             position: "bottom-right",
    //             autoClose: 1000,
    //         })
    //         removewishlist()

    //     }
    //     else{
    //         let flag = 0
    //         cart.forEach((item1) => {
    //             if (item1.data.ProductCode === item[0].ProductCode) {
    //                 flag = 1
    //                 item1.quantity = item1.quantity + 1
    //             }
    //         })
    //         if (flag === 0) {
    //             cart.push({ data: item[0], quantity: 1 })
    //         }
    //         localStorage.setItem('cart', JSON.stringify(cart))
    //         toast.success('Product added to cart', {
    //             position: "bottom-right",
    //             autoClose: 1000,
    //         })
    //         removewishlist()
    //     }

    //     let user = JSON.parse(localStorage.getItem('token'));

    // }


    const addtocart = () => {
      const userData = JSON.parse(localStorage.getItem('token'));
      const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
  
      let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
  
      if (userId) {
          const userCart = cartArray.find((userCart) => userCart.UserId === userId);
  
          if (userCart) {
              let flag = false;
  
              userCart.CartItems.forEach((item1) => {
                  if (item1.data.ProductCode === item[0].ProductCode) {
                      flag = true;
                      item1.quantity = item1.quantity + 1;
                  }
              });
  
              if (!flag) {
                  userCart.CartItems.push({ data: item[0], quantity: 1 });
              }
          } else {
              // User has no cart, create a new entry for the user
              cartArray.push({ UserId: userId, CartItems: [{ data: item[0], quantity: 1 }] });
          }
  
          localStorage.setItem('cartArray', JSON.stringify(cartArray));
          toast.success('Product added to cart', {
              position: "bottom-right",
              autoClose: 1000,
          });
          removewishlist();
      } else {
          // Handle the case where the user is not logged in
          // You may want to show a message or redirect the user to the login page
          console.log('User not logged in');
      }
  };
  

    const [wishlistpopupshow, setwishlistpopupshow] = useRecoilState(wishPopupState);
    return (
        <>

<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{zIndex:'9999'}}
        >
            <Box sx={style} className='pop-responsive'>
                <CloseIcon sx={{ position:'relative' , float:'right' , cursor:'pointer'}} onClick={handleClose} />
                {productData ? (
                <>
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
                </>
                ):(
                  <>
                  <div style={{display:'flex' , justifyContent:'center'}}>
                    <img src={logo} alt="Loading..." />
                  </div>
                  </>
                )}

            </Box>
        </Modal>


        <div
            className='wishlistitem'
        >
            <div className='s1'
                onMouseEnter={() => setshowdelete(true)}
                onMouseLeave={() => setshowdelete(false)}
            >
                <img src={item[0].ProductImageFileName != 'NoImage.jpg' ? item[0].ProductImagePath : noimage} alt='no image'
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noimage
                    }}

                />
                {
                    showdelete &&
                    <div className='removeitem'>
                        <button
                            onClick={removewishlist}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }
            </div>
            <div className='s2'>

            <Typography sx={{padding:'0px 10px'}}  onClick={(e) => {handleOpen(item[0].ProductCode)}}>{item[0].ProductName}</Typography>
            </div>
            <div className='s3'>
                <p className='amount'>S$ {item[0].SellingCost?.toFixed(2)}</p>
                <div className='cartout'
                    onClick={addtocart}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
            </div>
        </div>
    </>
    )
}

export default WishListItem