import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { Trading } from '@/components'

export const CONTEXT=React.createContext()
export const PROVIDER=({children})=>{
     const TRADING_BOT="Trading Bot";

     const LOAD_INITIAL_DATA= async()=>{
           try {
              
           } catch (error) {
               console.log(error)
           }
     }

     const buyToken=async()=>{
          try {
            
          } catch (error) {
            console.log(error)
          }
     }

     const sellToken=async()=>{
        try {
          
        } catch (error) {
          console.log(error)
        }
   }

   const Trading=async()=>{
    try {
      
    } catch (error) {
      console.log(error)
    }
}



return ( <CONTEXT.Provider value={{
     TRADING_BOT,
     Trading
}}>
  {children}

</CONTEXT.Provider>
);

}