import React, { useContext, useEffect, useState} from "react";
import styles from "./style.module.css";
import EditComp from "../EditComp";
import { DataContext } from "../../context";
import { Link, useParams } from "react-router-dom";
import apiCalls from "../../functions/apiCalls";

const TableAvi = ({filterData,setDisplay,arrName, valToGet=[], displayColumnsArray=[],clasN,studentsNums}) => {
  const {tableData,activUser, setActivUser,setPopUp} = useContext(DataContext);
  const [currentAdmin, setcurrentAdmin] = useState(false);
  const hendleActionPopUp =(e,v)=>{
    const data = v.map((val,i)=>{
      return <Link 
        key={i+1}
        className={styles.actionLink}
        onClick={()=>setPopUp(null)} 
        to={`/action/${val}`}
      >פעילות מספר {i+1}</Link>
    })
    setPopUp(data)
  }
  const hendleAdminPassword = (v)=>{
    setActivUser(prev=>{return {...prev,email: v.email}})
    setcurrentAdmin(true)
  }
  const hendleAdminStatus = (v)=>{
    const updatedData = v.adminStatus !=="פעיל"?true:false;
    apiCalls.put(`/admins/update/${v.email}`,{adminStatus:updatedData})
    .then(res=>{
      setDisplay(prev=>!prev)
    })
    .catch(err =>setPopUp(
      <div>
        <h4>שגיאה: {err.response.status}</h4>
        <p>הודעה: {err.response.data.msg}</p>
    </div>
    ))
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    const newPass = e.target.elements.password.value
    apiCalls.put(`/admins/resetpassword/${activUser.email}`, {password:newPass})
    .then(res=>{
      setDisplay(prev=>!prev)
      setPopUp("הסיסמה שונתה בהצלחה 😀")
    })
    .catch(err =>setPopUp(
      <div>
        <h4>שגיאה: {err.response.status}</h4>
        <p>הודעה: {err.response.data.msg}</p>
    </div>
    ))
  }
  const formToPopUp = <form onSubmit={handleSubmit} className={`center formToPopUp`}>
            <label>סיסמה</label>
            <input required={true} name="password" type="text" />
            <button id={"submitBtu"} type='submit'>שלח</button>
  </form>
  
  useEffect(()=>{
    currentAdmin&&setPopUp(formToPopUp)
  },[activUser])

  return (
    <div className={`center ${styles.tableContainer}`}> 
      <table className={`${styles.tableSelf} ${clasN}`}>
        <thead>
          <tr>
            {displayColumnsArray.map(val=>{
              return <td key={val}>{val}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {!filterData&&tableData[arrName].map((v,i) => {
            return <tr key={i}>
              <td>{i+1}</td>
              {valToGet.map((val,index) =>{
                return <td key={index}>{
                  val=="lecturer"?v[val]?.name :
                  val=="actions"? <spam className={styles.actionPopUpBTU} onClick={(e)=>hendleActionPopUp(e,v.actions)}>לפעילויות</spam> :
                  val=="num"?studentsNums[i]:v[val]?v[val]:
                  ""
                  }</td>
              })}
              {arrName!=="allStudents"&&<td  >{<EditComp val={{...v, num:arrName==="students"?studentsNums[i]:""}}/>}</td>}
              {arrName==="admins"&&<td>{<button id={v.adminStatus=="פעיל"?styles.statusActive:styles.statusNotActive} onClick={()=>hendleAdminStatus(v)}>{v.adminStatus}</button> }</td>}
              {arrName==="admins"&&<td>{<button id={styles.changePassBtu} onClick={()=>hendleAdminPassword(v)}>שנה סיסמה</button> }</td>}
            </tr>
          })}
          {filterData&&filterData.map((v,i) => {
            return <tr key={i}>
              <td>{i+1}</td>
              {valToGet.map((val,index) =>{
                return <td key={index}>{
                  val=="actions"? <spam className={styles.actionPopUpBTU} onClick={(e)=>hendleActionPopUp(e,v.actions)}>לפעילויות</spam> :
                  v[val]?v[val]:
                  ""
                  }</td>
              })}
              {arrName!=="allStudents"&&<td  >{<EditComp val={{...v, num:arrName==="students"?studentsNums[i]:""}}/>}</td>}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableAvi;
