import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './Sucess.css';

const Sucess = () => {
  const [ordersuccessorderid, setordersuccessorderid] = React.useState(null);
  const preorderarray = JSON.parse(localStorage.getItem('preorderarray'));
  //localStorage.removeItem('preorderarray');
 // const [reloadnavbar, setreloadnavbar] = React.useState(false);
  const [placeorderCalled, setPlaceorderCalled] = React.useState(false);
  //const [reloadKey, setReloadKey] = React.useState(0); // Add a reload key
  const paymentId = localStorage.getItem('paymentId');

  console.log(preorderarray , "OPOPOPOPOPOP");

  const placesuccessorder = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerOrder/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preorderarray)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Order Code ', data.Data);
      if (data.Message === 'Sucess' && data.Code === 200) {
        setordersuccessorderid(data.Data);
        const emptyCart = [];
        localStorage.setItem('cart', JSON.stringify(emptyCart));
        //setreloadnavbar(!reloadnavbar);
       // setReloadKey(prevKey => prevKey + 1); // Increment the reload key
      }
      else {
        // Handle order placement failure
      }
    })
    .catch(err => {
      // Handle order placement failure
    });
  }

  useEffect(() => {
    if (!placeorderCalled) {
      placesuccessorder();
      setPlaceorderCalled(true); // Set the flag to true after calling placeorder
    }
  }, [placeorderCalled]);


  const converttofloat = (value) => {
    // console.log(parseFloat(value) + 0.001)
    value = value.toFixed(2)
    // console.log(value , parseFloat(value) + 0.001)
    // check if value has decimal
    if (!value.includes('.00')) {
        console.log(value, parseFloat(value))
        return parseFloat(value)
    }
    else {
        console.log(value, parseFloat(value) + 0.001)
        return parseFloat(value) + 0.001
    }
}


  return (
    <div>
      {/* Pass reloadKey as a prop to Navbar */}
      <Navbar   />
      <div className="success-container">
        <h1 className="success-heading">Thank You for Your Order!</h1>
        <p className="success-message">Your order has been successfully placed. </p>
        <div className="order-summary">
          {/* Display Order details here */}
        </div>
        <div className="shipping-info">
          {/* Display shipping details here */}
        </div>
        <div className="payment-info">
          {/* Display payment details here */}
        </div>
        <p className="order-number">Your Order Number: {ordersuccessorderid}</p>
      





        <div className='confirmationcont'>
        {/* <div className='c1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <h2>{message}</h2>
        </div> */}


        {/* <div className='c2'>
          <h2>Order Summary</h2>
          <div>
            <p>Order Number</p>
            <p>{orderdata.OrderNo}</p>
          </div>

          <div>
            <p>Order Date</p>
            <p>{
              new Date().toLocaleDateString()
            }</p>
          </div>

          <div>
            <p>Name</p>
            <p>{orderdata.CustomerName
            }</p>
          </div>

          <div>
            <p>Email</p>
            <p>
              {
                user.EmailId
              }
            </p>
          </div>

          <div>
            <p>Payment Method</p>
            <p>{orderdata.PaymentType}</p>
          </div>

          <div>
            <p>Shipping Address</p>
            <p>{orderdata.CustomerShipToAddress
            }</p>
          </div>

          <div>
            <p>Tax</p>
            <p>$ {orderdata.Tax}</p>
          </div>

          <div>
            <p>Sub Total</p>
            <p>$ {orderdata.Total}</p>
          </div>

        </div> */}


<div className='c3'>
          <table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>

              {

preorderarray.OrderDetail && preorderarray.OrderDetail.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td>
                        <p>{index + 1}</p>
                      </td>
                      <td>
                        <p>{item.ProductName}</p>
                      </td>
                      <td>
                        <p>S$ {item.Price ? item.Price.toFixed(2) : 0.00}</p>
                      </td>
                      <td>
                        <p>{item.Qty}</p>
                      </td>

                      <td>
                        <p>S$ {
                          ((
                            item.Price
                          )
                            *
                            item.Qty).toFixed(2)
                        }</p>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className='right'>
            <div>
              <p>Subtotal</p>
              <p>S$ {converttofloat(23).toFixed(2)}</p>
            </div>

            <div>
              <p>Shipping</p>
              <p>S$ {converttofloat(2).toFixed(2)}</p>
            </div>

            <div>
              <p>Tax</p>
              <p>S$ f3</p>
            </div>

            <div>
              <p>Total</p>
              <p>S$ {converttofloat(333).toFixed(2)}</p>
            </div>
          </div>
        </div>


      </div>


      
        {/* <p className="order-number">Your Payment Id: {paymentId}</p> */}
        <Link to="/" className="continue-shopping-link">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Sucess;