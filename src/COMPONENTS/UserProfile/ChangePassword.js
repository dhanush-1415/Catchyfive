import React , {useState , useEffect} from 'react'
import { toast } from 'react-toastify'
import './ChangePassword.css'
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useRecoilState } from 'recoil'
import { authPopupState } from '../../Providers/AuthPopupProvider'
import AuthPopup from '../Auth/AuthPopup'

const ChangePassword = ({ userid, oldpass, emailid }) => {
  

  console.log(userid, oldpass , "PPPPPPPPPPPPPPPPP")

  const [oldpassword, setoldpassword] = React.useState('')
  const [newpassword, setnewpassword] = React.useState('')
  const [confirmpassword, setconfirmpassword] = React.useState('')
  const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [authPopupShow, setAuthPopupShow] = useRecoilState(authPopupState);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(() => {
      if (newpassword === confirmpassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }, [newpassword, confirmpassword]);

  const handleChange = (e) => {
    e.preventDefault()

    if (oldpassword != oldpass) {
      toast.error('Old Password is Incorrect')
      return
    }


    if (newpassword != confirmpassword) {
      toast.error('New Password and Confirm Password does not match')
      return
    }

    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/EditProfilePassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "OrgId": 3,
            "B2CCustomerId": userid,
            "EmailId": emailid,
            "Password": newpassword,
          }
        ),
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.Code === 200) {
          toast.success('Password Changed Successfully')
        }
        else {
          toast.error('Something Went Wrong')
        }
      })

  }

  return (
    

    <div className='accountsettings'>
    <h1 className='mainhead2'>Change Password</h1>
    <div className='form'>
      <div className='form-group' style={{ position: 'relative' }} >
        <label htmlFor='oldPassword'>Old Password <span>*</span></label>
        <input
          type={showOldPassword ? 'text' : 'password'} // Toggle input type based on showOldPassword
          value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)}
        />
        
            <span
              onClick={() => setShowOldPassword(!showOldPassword)}
              style={{
                position: 'absolute',
                right: '10px', // Adjust the right position as needed
                top: '50%',
                transform: 'translateY(0%)',
                cursor: 'pointer',
              }}
            >
              {showOldPassword ? <Eye /> : <EyeSlash />}
            </span>
      </div>

      <div className='form-group' style={{ position: 'relative' }}>
        <label htmlFor='newPassword'>New Password <span>*</span></label>
        <input
          type={showNewPassword ? 'text' : 'password'} // Toggle input type based on showNewPassword
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
        />
       
         <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{
                position: 'absolute',
                right: '10px', // Adjust the right position as needed
                top: '50%',
                transform: 'translateY(0%)',
                cursor: 'pointer',
              }}
            >
              {showNewPassword ? <Eye /> : <EyeSlash />}
            </span>
        
      </div>

      <div className='form-group' style={{ position: 'relative' }}>
        <label htmlFor='confirmPassword'>Confirm New Password <span>*</span>{passwordsMatch && <span style={{color:'red'}}>Password dosen't match</span>} </label>
        <input
          type={showConfirmPassword ? 'text' : 'password'} // Toggle input type based on showConfirmPassword
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
        <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px', // Adjust the right position as needed
                top: '50%',
                transform: 'translateY(0%)',
                cursor: 'pointer',
              }}
            >
              {showConfirmPassword ? <Eye /> : <EyeSlash />}
            </span>
        
        {/* <span
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    >
                      {showConfirmPassword ? (
                        <EyeSlash />
                      ) : (
                        <Eye />
                      )}
                    </span> */}
      </div>
    </div>

    <button className='mainbutton1' onClick={(e) => handleChange(e)}>
      Save Changes
    </button>
    <p style={{color:'#02b290' , fontWeight:'bold'}} >try another way</p>
    {
        authPopupShow && <AuthPopup />
    }
  </div>
  )
}

export default ChangePassword