// import { Input } from 'postcss';
import React, {useState, useEffect} from 'react'

function Signup({axios, setActiveComponent, notifyError, notifySuccess}) {
  const [user, setUser]= useState({
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
  });
  const handleFormFieldChange=(fieldName, e)=>{
      setUser({...user , [fieldName]: e.target.value});
  }
  const createAccount=async(e)=>{
     e.preventDefault()
     if(user.name=="" || user.email=="" || user.password=="" || user.passwordConfirm){
         return notifyError("please provide all the details")
     }
     notifySuccess("wait creating Account")

     try {
        const response=await axios({
           method: "POST",
           url: `/api/v1/user/signup`,
           withCredentials: true,
           data:{
              name: user.name,
              email: user.email,
              password: user.password,
              passwordConfirm: user.passwordConfirm

           }
        });

        if(response.data.status=="success"){
          notifySuccess("Account Created Successfully")
          localStorage.setItem(
            "USER_MEMBERSHIP",
            response.data.data.user.membership
          );
          notifySuccess("Account Created Successfully")
          localStorage.setItem(
            "CryptoBot_Backend",
            response.data.data.user._id
          );
          localStorage.setItem(
            "CryptoAUTH_TOKEN",
            response.data.token
          );
          window.location.reload();
        }
        else{
          notifySuccess("Something went Wrong")
        }
     } catch (error) {
        console.log(error)
     }
  }
  return (
    <div className='techwave_fn_sign'>
      <div className='sign__content'>
        <h1 className='logo'>Design By me</h1>
        <form className='login'>
             <div className='form__content'>
                <div className='form__title'>Sign Up</div>
                <div className='form__username'>
                   <label htmlFor='user_login'>Name</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("name", e)}/>
                </div>
                <div className='form__username'>
                   <label htmlFor='user_login'>Email</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("Email", e)}/>
                </div>
                <div className='form__username'>
                   <label htmlFor='user_login'>Password</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("Password", e)}/>
                </div>
                <div className='form__username'>
                   <label htmlFor='user_login'>Password Confirm</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("PasswordConfirm", e)}/>
                </div>

                <div className='form__alternative'>
                  <a onClick={(e)=> createAccount(e)} className='techwave_fn_button'>
                    <span>Create Account</span>
                  </a>
                </div>
             </div>

        </form>
        <div className='sign__desc'>
          <p>Not a member? 
            <a onClick={()=>setActiveComponent("Login")}>Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup