import React, { useContext, useState } from "react";
import  axios from "axios"
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {Header, Footer, Search, MovingSubmenu, Preloader, SideBar, Home, TradeTokens, TopExchangeTokens,
  Networks, AddNetwork, Price, Login, Signup, Profile, Setting, AddTokenPair, 
  Trading, Loader} from "../components/index"

  import {CONTEXT} from "../context/context"
const index = () => {
  const {TRADING_BOT}= useContext(CONTEXT)
  const [activeComponent, setActiveComponent]= useState("Home")

  const [membershipType, setMembershipType]=useState("Premium")
  const [authBackendID, setAuthBackendID]=useState("")
  const [Networks, setNetworks]= useState({})
  const [networkName, setNetworkName]=useState()

  const notifyError=(msg)=> toast.error(msg, {duration: 2000})          
  const notifySuccess=(msg)=> toast.success(msg, {duration: 2000})
  return <div>
      <MovingSubmenu />
      <Preloader />
      {
        activeComponent=="Signup" ? (
            <Signup axios={axios}  setActiveComponent={setActiveComponent} notifyError={notifyError} notifySuccess={notifySuccess} />
        ): (
          <div className="techwave_fn_wrapper">
          <div className="techwave_fn_wrap">
              <Search />
              <Header networkName={networkName}
                 setActiveComponent={setActiveComponent}
               />
               <SideBar setActiveComponent={setActiveComponent}/>
               {
                activeComponent == "Home"? (
                    <Home />
                ): activeComponent == "Trade Tokens"? (
                   <TradeTokens />
                ): activeComponent == "Top Exchange Tokens" ? (
                   <TopExchangeTokens />
                ): activeComponent == "Networks"? (
                   <Networks networkName={networkName} setNetworkName={setNetworkName} />
                ): activeComponent=="Trading"? (
                    <Trading axios={axios}   />
                ): activeComponent== "Pricing"?(
                    <Price />
                ): activeComponent== "Profile"?(
                    <Profile  setActiveComponent={setActiveComponent} />
                ): activeComponent == "Setting"?(
                    <Setting />
                ): activeComponent==" Add Token Pair"?(
                    <AddTokenPair />
                ):(
                  ""
                )
               }
          </div>
       </div>
        )
      }
      {
        activeComponent=="Login"?(
          <Login  setActiveComponent={setActiveComponent} axios={axios} notifyError={notifyError} notifySuccess={notifySuccess} />
        ):(
          <div className="techwave_fn_wrapper">
             <div className="techwave_fn_wrap">
                 <Search />
             </div>
          </div>
        )
      }
  </div>;
};

export default index;