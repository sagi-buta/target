import React, { useContext, useEffect, useState } from 'react';
import styles from "./style.module.css";
import apiCalls from '../../functions/apiCalls';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context';
import dates from '../../functions/dates';
import Search from '../../components/Search';

const AllAcctions = () => {
    const {setCurrentAction,allData,setPopUp} = useContext(DataContext);
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [searchData, setSearchData] = useState({lecturer:null,actionsNames:null});
    const [sortBool, setSortBool] = useState(true);
    const [filterDisplay, setFilterDisplay] = useState("");
    const [searchDisplay, setSearchDisplay] = useState("");

    useEffect(()=>{
        setCurrentAction(false);
        apiCalls.get("/actions")
        .then(res=>{
            setData(res)
            setFilterData(res)
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
    },[])
    useEffect(()=>{
        hendlesearch()
    },[searchData])


    const hendleFilter =(e)=>{
        const value = e.target.value
        const name = e.target.name
        switch (name) {
            case "type" :
                setFilterData(value==="all"?data:data.filter(v=>v.actionType===value));
                break
            case "status" :
                setFilterData(value==="all"?data:data.filter(v=>v[name][name]===value));
                break
            default :
                setFilterData(value==="all"?data:data.filter(v=>v[name]===value));
                break
        }
    }
    const hendlesearch =()=>{
        switch (true) {
            case Boolean(searchData?.lecturer):
              setFilterData(data.filter(v => v.lecturer._id === searchData.lecturer));
              break;
            
            case Boolean(searchData?.actionsNames):
              setFilterData(data.filter(v => v.name === searchData.actionsNames));
              break;
          
            default:
              setFilterData(data);
              break;
          }
    }
    const hendleSort =(e)=>{
        setSortBool(!sortBool)
        const value =e.target.getAttribute("name")
            setFilterData(prev=>{
                return (
                value==="lecturer"? 
                [...prev].sort((a, b) =>
                sortBool? a[value]["name"].localeCompare(b[value]["name"]):
                b[value]["name"].localeCompare(a[value]["name"]))
                :
                value!=="status"? 
                [...prev].sort((a, b) =>
                sortBool? a[value].localeCompare(b[value]):
                b[value].localeCompare(a[value]))
                :
                
                [...prev].sort((a, b) => 
                sortBool? a[value][value].localeCompare(b[value][value]):
                b[value][value].localeCompare(a[value][value])))
            })
    }
    return (

        <div className={`center ${styles.hiro}`}>
            <div className={`center ${styles.haeder}`}>
                <div className={`center ${styles.filtersContainer}`}>
                    <h2>סינון</h2>
                    <div className='center'>
                        <h4>סינון לפי</h4>
                        <select onChange={(e)=>{
                            setFilterDisplay(e.target.value)
                            setFilterData(data)
                            }}>
                            <option value=""></option>
                            <option value="type">סוג פעילות</option>
                            <option value="status">סטטוס</option>
                            <option value="orderSource">גווף מזמין</option>
                            <option value="fundingSource">גוף מממן</option>
                        </select>
                    </div>
                    {filterDisplay==="type" &&
                        <select className={styles.filter} name='type' onChange={hendleFilter}>
                            <option value="all">כל הפעילויות</option>
                            <option value="workshop">סדנה</option>
                            <option value="course">קורס</option>
                            <option value="preparing">מכינה</option>
                        </select>
                    }
                    {filterDisplay==="status" &&
                        <select className={styles.filter} name='status' onChange={hendleFilter}>
                            <option value="all">כל הפעילויות</option>
                            <option value="1">טרם התחיל</option>
                            <option value="2">פעיל</option>
                            <option value="3">סוים</option>
                            <option value="4">בוטל טרם פתיחה</option>
                            <option value="5">בוטל לאחר פתיחה</option>
                        </select>
                    }
                    {filterDisplay==="orderSource" && 
                        <select className={styles.filter} name='orderSource' onChange={hendleFilter}>
                        <option value="all">כל הפעילויות</option>
                        {allData.orderSource?.map((v,i)=>{
                            return <option key={i+1} value={v}>{v}</option>
                        })}
                        </select>
                    }
                    {filterDisplay==="fundingSource" &&
                        <select className={styles.filter} name='fundingSource' onChange={hendleFilter}>
                        <option value="all">כל הפעילויות</option>
                        {allData.fundingSource?.map((v,i)=>{
                            return <option key={i+1} value={v}>{v}</option>
                        })}
                        </select>
                    }
                </div>
                <div className={`center ${styles.filtersContainer}`}>
                    <h2>חיפוש</h2>
                    <div className='center'>
                        <h4>חיפוש לפי</h4>
                        <select onChange={(e)=>{
                            setSearchDisplay(e.target.value)
                            setFilterData(data)
                            }}>
                            <option value=""></option>
                            <option value="lecturer">שם מורה</option>
                            <option value="actionsNames">שם פעילות</option>
                        </select>
                    </div>
                        {searchDisplay==="lecturer" && <Search setData={setSearchData} placeholder={"שם מורה.."} searchIn={"lecturer"}/>}
                        {searchDisplay==="actionsNames" && <Search setData={setSearchData} placeholder={"שם פעילות.."} searchIn={"actionsNames"}/>}
                </div>
            </div>
            
            <table className={`center ${styles.tableSelf}`}>
                <tbody>
                    <tr>
                        <td onClick={hendleSort} name="name">שם פעילות</td>
                        <td onClick={hendleSort} name="lecturer">שם מורה</td>
                        <td onClick={hendleSort} name="fundingSource" >גוף מממן</td>
                        <td onClick={hendleSort} name="orderSource">גוף מזמין</td>
                        <td onClick={hendleSort} name="startDate">תאריך התחלה</td>
                        <td onClick={hendleSort} name="actionType">סוג פעילות</td>
                        <td onClick={hendleSort} name="status">סטטוס</td>
                    </tr>
                    {filterData&&filterData.map((v, i) => {
                        const displayStatus =
                        v.status.status ==="1"?"טרם התחיל":
                        v.status.status ==="2"?"פעיל":
                        v.status.status ==="3"?"סוים":
                        v.status.status ==="4"?"בוטל טרם פתיחה":
                        "בוטל לאחר פתיחה"
                        const displayActionType = 
                        v.actionType ==="workshop"?"סדנה":
                        v.actionType ==="course"?"קורס":
                        v.actionType ==="preparing"?"מכינה":"לא נמצא"
                        const startDate =new Date(v.startDate) 
                        return <tr key={i}>
                            <td><Link to={`/action/${v._id}`}>{v.name}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{v.lecturer?.name}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{v.fundingSource}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{v.orderSource}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{dates.getDate(startDate)}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{displayActionType}</Link></td>
                            <td><Link to={`/action/${v._id}`}>{displayStatus}</Link></td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default AllAcctions;
