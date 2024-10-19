import React, {useState} from 'react'

function Login({setActiveComponent, axios, notifyError, notifySuccess}) {
  const [user, setUser]= useState({
    email:"",
    password: ""
});
const handleFormFieldChange=(fieldName, e)=>{
    setUser({...user , [fieldName]: e.target.value});
}
const apiLogin=async(e)=>{
   e.preventDefault()
   if(user.email=="" || user.password==""){
       return notifyError("please provide all the details")
   }
   notifySuccess("wait login Account")

   try {
      const response=await axios({
         method: "POST",
         url: `/api/v1/user/login`,
         withCredentials: true,
         data:{
            email: user.email,
            password: user.password
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
      else if(response.data.status=="fail"){
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
                <div className='form__title'>Sign In</div>
                {/* <div className='form__username'>
                   <label htmlFor='user_login'>Name</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("name", e)}/>
                </div> */}
                <div className='form__username'>
                   <label htmlFor='user_login'>Email</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("Email", e)}/>
                </div>
                <div className='form__username'>
                   <label htmlFor='user_login'>Password</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("Password", e)}/>
                </div>
                {/* <div className='form__username'>
                   <label htmlFor='user_login'>Password Confirm</label>
                   <input type='text' className='input' onChange={(e)=> handleFormFieldChange("PasswordConfirm", e)}/>
                </div> */}

                <div className='form__alternative'>
                  <a onClick={(e)=> apiLogin(e)} className='techwave_fn_button'>
                    <span>Log in</span>
                  </a>
                </div>
             </div>

        </form>
        <div className='sign__desc'>
          <p>Not a member? 
            <a onClick={()=>setActiveComponent("Signup")}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login