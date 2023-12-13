import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './AccountSettings.css';

const AccountSettings = ({ user }) => {
  const [userdata, setuserdata] = useState({});
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const validateName = (name) => {
    if (name.length === 0 || name.length > 30) {
      setNameError('Name should be between 1 and 30 characters');
      return false;
    }
    setNameError(null);
    return true;
  };

  // const validatePhone = (phone) => {
  //   if (!phone || !/^(\+65\d{8}|\d{8})$/.test(phone)) {
  //     setPhoneError('Please enter a valid Singapore phone number');
  //     return false;
  //   }
  //   setPhoneError(null);
  //   return true;
  // };

  const validatePhone = (phone) => {
    // Check if the phone is falsy or doesn't match the specified pattern
    if (!phone || !/^(\+65\d{8}|\d{8})$/.test(phone)) {
      setPhoneError('Please enter a valid Singapore phone number');
      return false;
    }
  
    setPhoneError(null);
    return true;
  };
  

  const editprofile = () => {
    const isNameValid = validateName(userdata.B2CCustomerName);
    const isPhoneValid = validatePhone(userdata.MobileNo);

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    userdata.MobileNo = `${userdata.MobileNo}`;

    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/EditProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.Code === 200) {

          toast.success('Profile Updated Successfully');
          updateuserdata();
        } else {
          toast.error('Something Went Wrong');
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong');
        console.log(err);
      });
  };

  const updateuserdata = () => {
    let user = localStorage.getItem('token');
    user = JSON.parse(user);
    fetch(
      process.env.REACT_APP_BACKEND_URL +
        '/B2CCustomerRegister/Getbycode?OrganizationId=' +
        process.env.REACT_APP_BACKEND_ORGANIZATION +
        '&B2CCustomerId=' +
        user[0].B2CCustomerId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    setuserdata(user[0]);
  }, [user]);

  return (
    <div className='accountsettings'>
      <h1 className='mainhead2'>Personal Information</h1>
      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name <span>*</span>{nameError && <div style={{color:'red'}} className='error-message'>{nameError}</div>}</label>
          <input
            type='text'
            name='name'
            id='name'
            value={userdata?.B2CCustomerName}
            onChange={(e) => {
              setuserdata({ ...userdata, B2CCustomerName: e.target.value });
              validateName(e.target.value);
            }}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone/Mobile <span>*</span>{phoneError && <div style={{color:'red'}} className='error-message'>{phoneError}</div>}</label>
          <input
            type='text'
            name='phone'
            id='phone'
            value={userdata?.MobileNo}
            onChange={(e) => {
              setuserdata({ ...userdata, MobileNo: e.target.value });
              validatePhone(e.target.value);
            }}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email <span>*</span></label>
          <input
            style={{ background: '#d3d3d3' }}
            type='email'
            name='email'
            id='email'
            readOnly
            value={userdata?.EmailId}
            onChange={(e) => setuserdata({ ...userdata, EmailId: e.target.value })}
          />
        </div>
      </div>

      <button onClick={editprofile} disabled={!!nameError || !!phoneError}>
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;
