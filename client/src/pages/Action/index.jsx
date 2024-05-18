import React,{ useContext, useEffect, useState } from "react";
import { DataContext } from "../../context";
import { Link, useParams } from "react-router-dom";
import styles from "./style.module.css";
import CurrentAction from "../../components/CurrentAction";
import InputText from "../../components/InputText";
import SelectButtons from "../../components/selectButtons";
import Search from "../../components/Search";
import InputHours from "../../components/InputHours";
import InputDate from "../../components/InputDate";
import TextArea from "../../components/TextArea";
import arrays from "../../data/dataArrays"
import apiCalls from "../../functions/apiCalls";
import dates from "../../functions/dates";
import InputStudyHours from "../../components/inputStudyHours";
const Action = () =>{

    const {typeArr,locationArr,daysArr,statusArr,formatArr,genderArr} = arrays
    const {currentAction,setPopUp,allData} = useContext(DataContext);
    const [data, setData] = useState();
    const paramsId = useParams().actionId  
    
    useEffect(()=>{
        apiCalls.get("/data/title/emptyaction").then(res=>{
            const data ={...res.data[0],startDate:new Date (),endDate:new Date ()}
            setData(paramsId?currentAction:data)
        })
        
        .catch(err =>{
            setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          )})
    },[currentAction])

    const handleChange = (e)=>{
        e.preventDefault();
       paramsId?apiCalls.put(`actions/${currentAction._id}`,data)
       .then(res=>{
           // update fundingSource
           setPopUp("השינויים נשמרו בהצלחה 😀")  
           allData.fundingSource.includes(data.fundingSource)||data.fundingSource.length<1?null:
            apiCalls.put(`/data/title/fundingSource`,{data:[...allData.fundingSource,data.fundingSource]})
            .then(res=>allData.fundingSource.push(data.fundingSource))
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
            // update orderSource
            allData.orderSource.includes(data.orderSource)||data.orderSource.length<1?null:
            apiCalls.put(`/data/title/orderSource`,{data:[...allData.orderSource,data.orderSource]})
            .then(res=>allData.orderSource.push(data.orderSource))
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))      
        
    })
    .catch(err =>setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
    :
    apiCalls.post(`actions/`,data)
    .then(res=>{
        const element = document.createElement("a")
        element.setAttribute("href", `https://target-pedagogy.com/#/action/${res._id}`)
        element.click()
        setPopUp("הפעולה נשמרה בהצלחה 😀")        
        // update fundingSource
        allData.fundingSource.includes(data.fundingSource)||data.fundingSource.length<1?null:
        apiCalls.put(`/data/title/fundingSource`,{data:[...allData.fundingSource,data.fundingSource]})
        .then(res=>{
            allData.fundingSource.push(data.fundingSource)
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
        
        // update orderSource
        allData.orderSource.includes(data.orderSource)||data.orderSource.length<1?null:
        apiCalls.put(`/data/title/orderSource`,{data:[...allData.orderSource,data.orderSource]})
        .then(res=>{
            allData.orderSource.push(data.orderSource)
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
    };
     return (
    <>
        {paramsId&&<CurrentAction/>}
        {data?<div className={`center scroller ${styles.hiro}`} >
            <div className={`center ${styles.header}`}>
                <div className={`center`}>
                    <h3>{"שם פעילות"}</h3>
                    <InputText defaultValue={`${data.name}`} type={"name"} setData={setData}/>
                </div>
                    {paramsId&&
                <div className={`center`}>
                    <h3>{"מספר תלמידים"}</h3>
                    <h4>{data?.students?.length}</h4>
                </div>}
            </div>
            
            <div className={`${styles.main}`} >
                <div className={`${styles.mainRight}`}>
                <div className={`center ${styles.serchInputs}`}>
                        <div>
                            <h4>גוף מממן</h4>
                            <Search setData={setData} defaultVal={data.fundingSource} placeholder={"גוף מממן..."} searchIn={"fundingSource"} />
                        </div>
                        <div>
                            <h4>גוף מזמין</h4>
                            <Search setData={setData} defaultVal={data.orderSource} placeholder={"גוף מזמין..."} searchIn={"orderSource"} />
                        </div>
                    </div>
                    <div className={`${styles.selectButtons}`}>
                        <h4>סוג הפעילות</h4>
                        <div>
                        <SelectButtons keyss={"actionType"} setData={setData}  current={[data.actionType]}
                        isSingleChoice={true} classN={"center w110"} options={typeArr}/> 
                        </div>
                    </div>
                    <div className={`${styles.selectButtons}`}>
                        <h4>מגדר</h4>
                        <div>
                        <SelectButtons keyss={"gender"} setData={setData}  current={[data.gender]}
                        isSingleChoice={true} classN={"w110 center"} options={genderArr}/> 
                        </div>
                    </div>
                    <div className={`${styles.days}`}>
                        <h4>ימי לימוד</h4>
                        <div>
                            <SelectButtons keyss={"days"} setData={setData} current={data.days} isSingleChoice={false} classN={"center w55"} options={daysArr}/>
                        </div>

                    </div>
                    <div className={`${styles.selectButtons}`}>
                        <h4>סטטוס הזמנת עבודה</h4>
                        <div>
                            <SelectButtons keyss={"status"} setData={setData} current={[data.status.status]} isSingleChoice={true} classN={"center w110"} options={statusArr}/>
                            {data.status.status ==="4" || data.status.status ==="5"?
                            <TextArea placeholder={"סיבה..."} defaultValue={`${data.status.note}`} type={"status"} setData={setData}/>
                            :data.status.note=""}
                        </div>
                    </div>
                    <div className={`${styles.selectButtons}`}>
                        <h4>מתכונת לימודים</h4>
                        <div>
                            <SelectButtons setData={setData} keyss={"studyFormat"} current={[data.studyFormat.format]} isSingleChoice={true} classN={"center w110"} options={formatArr}/>
                            {data.studyFormat.format ==="2" || data.studyFormat.format ==="3"?
                            <TextArea placeholder={"קישור לזום ,שם משתמש , סיסמה"} defaultValue={`${data.studyFormat.note}`} type={"studyFormat"} setData={setData}/>
                            :data.studyFormat.note=""}
                        </div>
                    </div>
                    {data.studyFormat.format!=="2"&&
                        <div className={`${styles.selectButtons}`}>
                            <h4>מיקום הפעילות</h4>
                            <div>
                                <SelectButtons setData={setData} keyss={"locationType"} current={[data.locationType.type]} isSingleChoice={true} classN={"center w166"} options={locationArr}/>
                                {data.locationType.type ==="2"?
                                <TextArea placeholder={"כתובת..."} defaultValue={`${data.locationType.note}`} type={"locationType"} setData={setData}/>
                                :data.locationType.note=""}
                            </div>
                        </div>}
                    
                </div>
                {/* ------------------------------------------------------------------------ */}
                <div className={`${styles.mainLeft}`}>
                    
                    <div className={`${styles.inputsDates}`}>
                        <h4>שעות</h4>
                        <InputHours setData={setData} defaultValueStart={
                            data.startTime
                        }
                         defaultValueEnd={
                            data.endTime
                            }/>
                    </div>
                    <div className={`${styles.inputsDates}`}>
                        <h4>תאריכים</h4>
                        <InputDate 
                        setData={setData} 
                        startDate={dates.getDate(data.startDate).split("-").reverse().join("-")} 
                        endDate={dates.getDate(data.endDate).split("-").reverse().join("-")} />
                    </div>
                    
                    <div className={`${styles.inputsTecherAndMeetings}`}>
                        <div>
                            <h4>{"מספר מפגשים"}</h4>
                            <InputText placeholder={"מספר מפגשים..."} inputType={"number"} type={"numSessions"} setData={setData} defaultValue={`${data.numSessions}`}/>
                        </div>
                        <div className={`center ${styles.inputs}`}>
                            <h4>{"שם מורה"}</h4>
                            <Search setData={setData} defaultVal={data.lecturer?.name} placeholder={"שם מורה.."} searchIn={"lecturer"} />
                        </div>
                    </div>
                    <div className={`center ${styles.inputNumHours}`}>
                        <h4>{"מספר שעות לימוד"}</h4>
                        <InputStudyHours setData={setData} defaultAcademic={data.studyAcademicHours} defaultNormal={data.studyNormalHours}/>
                    </div>
                    <div className={`center ${styles.contactInfo}`}>
                        <h4>איש קשר</h4>
                        <div>
                            <InputText type2={"name"} placeholder={"שם"} type={"contactInfo"} setData={setData} defaultValue={`${data.contactInfo?.name}`}/>
                            <InputText inputType={"email"} type2={"email"} placeholder={"מייל"} type={"contactInfo"} setData={setData} defaultValue={`${data.contactInfo?.email}`}/>
                            <InputText type2={"phone"} placeholder={"נייד"} type={"contactInfo"} setData={setData} defaultValue={`${data.contactInfo?.phone}`}/>
                        </div>
                    </div>
                    <div className={`center ${styles.inputs}`}>
                        <h4>{"הערות"}</h4>
                        <TextArea type={"notes"} setData={setData} defaultValue={`${data.notes}`}/>
                    </div>
                    <div className={`center ${styles.inputs}`}>
                        <h4>{"הערות פדגוגיות"}</h4>
                        <TextArea type={"notesP"} setData={setData} defaultValue={`${data.notesP}`}/>
                    </div>
                    <div className={`center ${styles.sendBtu}`}>
                        <button onClick={handleChange} className='w154'>שמור</button>
                    </div>
                </div>
            </div>
        </div>:""}
    </>
  );
};

export default Action;
