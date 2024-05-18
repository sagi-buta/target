import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { DataContext } from "../../context";
import apiCalls from "../../functions/apiCalls";
const Login = () => {
  const {setActivUser ,setPopUp} = useContext(DataContext)
  const email = useRef()
  const password = useRef()
  const submitFun=(e)=>{
      e.preventDefault();
      apiCalls.post("/admins/login",{
        email:email.current.value,
        password:password.current.value
      })
      .then(res=>{
        setActivUser({login:true,data:res.data,token:res.token,role:res.data.role})
        localStorage.setItem("token",res.token)
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("role",res.data.role)
      })
      .catch(err =>setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
    }

    return (
      <div className={`center ${styles.login}`}>
        <div className={`center ${styles.loginForm}`}>
          <form className="center"  onSubmit={submitFun}>
            <h3><span className={styles.targetSpan}>TARGT</span> ברוך הבא <span className={styles.targetSpan}>ל</span></h3>
            <label htmlFor="email"> :שם משתמש או אימייל</label>
            <input ref={email} type="email" name="email" placeholder="הכנס אימייל" />
            <label htmlFor="passworde">: סיסמה</label>
            <input ref={password} type="password" placeholder="enter your password" />
            <button className="center" type="submit">כניסה</button>
          </form>
        </div>
        <div  className={`center ${styles.logo}`}>
            <h2>Welcome to TARGET</h2>
        </div>
    </div>
  );
};

export default Login;
