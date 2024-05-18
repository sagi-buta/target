import React, { useContext, useEffect, useState } from 'react';
import styles from "./style.module.css";
import PageButtons from '../../components/PageButtons';
import TableAvi from '../../components/TableAvi';
import { DataContext } from '../../context';
import apiCalls from '../../functions/apiCalls';
import ExporetExsel from '../../components/ExporetExsel';
import Search from '../../components/Search';

const AllStudents = () => {
    const {setTableData,setPopUp} = useContext(DataContext);
    const [filterData, setFilterData] = useState([]);
    const [filterBy, setFilterBy] = useState("all");
    const hendleFilterBy =(e)=>{
        setFilterBy(e.target.value)
    }
    useEffect(() => {
        apiCalls.get(`/students`)
        .then(res=>{
            setTableData(prev=>{return {...prev,allStudents:res}})
            setFilterData(res)
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
    }, []);
    return (
        <div className={`${styles.hiro}`}>
            <div className={`center ${styles.header}`}>
                <h2>דף סטודנטים</h2>
            </div>
            <PageButtons buttons={[
                <ExporetExsel 
                arrName={"allStudents"} 
                headers={["שם", "פלאפון", "מייל", "ת.ז","עיר", "הערות"]}
                orderBy={["name","phone","email","personalId","city","notes"]}
            />,
            <div className={`center ${styles.search}`}>
                <div>
                    <h4>חיפוש לפי</h4>
                    <select onChange={hendleFilterBy}>
                        <option value="all"></option>
                        <option value="personalId">ת.ז</option>
                        <option value="name">שם</option>
                        <option value="city">עיר</option>
                    </select>
                 </div>
                {filterBy!=="all"&&<Search filterBy={filterBy} setData={setFilterData} placeholder={"הזן תוכן לחיפוש"} searchIn={"allStudents"}/>}
            </div>
            
            ]}/>
            <TableAvi
                arrName={"allStudents"}
                filterData={filterData}
                valToGet={["name", "email","phone","personalId","city","actions","notes"]}
                displayColumnsArray={["מס'", "שם", "מייל","נייד","ת.ז","עיר","פעילויות","הערות"]}
            />
        </div>
    );
}

export default AllStudents;
