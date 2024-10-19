import React, {useState} from 'react'


const SideBarComponent=({array, title, setActive, active, setActiveComponent})=>(
     <div className='nav_group'>
     <h2 className='group__title'>{title}</h2>
     </div>
);

function SideBar({setActiveComponent}) {
const [active, setActive]= useState("Home")

const array1=[
    {
      menu: "Home",
      icon: "img/lighticon/light-14.png"
    },
    {
      menu: "Trade Tokens",
      icon: "img/lighticon/light-17.png"
    },
    {
      menu: "Top Exchange Tokens",
      icon: "img/lighticon/light-7.png"
    },
    {
      menu: "Networks",
      icon: "img/lighticon/light-15.png"
    }
]


const array2=[
  {
    menu: "Add Networks",
    icon: "img/lighticon/light-10.png"
  },
  {
    menu: "Trading",
    icon: "img/lighticon/light-6.png"
  },
  {
    menu: "Pricing",
    icon: "img/lighticon/light-16.png"
  },
  {
    menu: "Profile",
    icon: "img/lighticon/light-4.png"
  },
  {
    menu: "Add Token Pair",
    icon: "img/lighticon/light-19.png"
  }
]

const logout=()=>{
    localStorage.removeItem("cryptoAUT_TOKEN");

    window.location.reload()
}
  return (
    <div className='techwave-fn_leftpanel'>
      <div className='mobile_extra_closer'></div>
      <div className='leftpanel_logo'>

        <a className='fn_logo'>
          <span className='full_logo'>
            <img src="img/light-logo.png" className='desktop_logo' alt=''></img>
            <img src="img/light-logo.png" className='retina_logo' alt=''></img>
          </span>
          <span className='short_logo'>
            <img src="img/logo-desktop-mini.png" className='desktop_logo' alt=''></img>
            <img src="img/crypto.png" className='retina_logo' alt=''></img>
          </span>
        </a>
        <a href="#" className='fn_closer fn_icon_button desktop_closer'>
            <img src="img/lighticon/light-22.png"  alt=''  className='fn__svg'></img>
        </a>
         <a href="#" className='fn_closer fn_icon_button mobile_closer'>
            <img src="img/lighticon/light-22.png"  alt=''  className='fn__svg'></img>
        </a>
      </div>

      <div className='leftpanel_content'>
        <SideBarComponent setActiveComponent={setActiveComponent} setActive={setActive} active={active} 
        array={array1} title={"start here"} />
      </div>
    </div>
  )
}

export default SideBar