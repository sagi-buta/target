import { useContext, useEffect, useState} from "react";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import { DataContext } from "../context";
import apiCalls from "../functions/apiCalls";

export default function MainRouter() {
   const {activUser,setActivUser,setAllData} = useContext(DataContext)
   useEffect(()=>{
      const token =localStorage.getItem("token")
      const adminId =localStorage.getItem("id")
      const role =localStorage.getItem("role")
      token&&setActivUser(prev=>{return {...prev,login:true,token,adminId,role}})
    },[])

    
   return (
      <>
      {activUser?.login?<MainLayout/>:<Login/>}
      </>
   )
}
