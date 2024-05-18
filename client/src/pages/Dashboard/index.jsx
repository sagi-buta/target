import React, { useContext, useEffect ,useState} from 'react';
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { DataContext } from '../../context';
import Calendar from '../../components/Calendar';
import DashboardNav from '../../components/DashbordNav';
import dates from '../../functions/dates';
import apiCalls from '../../functions/apiCalls';
import Accordion from '../../components/Accordion';
import MessageBoard from '../../components/MessageBoard';
import GraphAp from '../../components/GraphAp';

const Dashboard = () => {
    const {setCurrentAction,setPopUp} = useContext(DataContext);
    const [curentCalendarDate, setCurentCalendarDate] = useState(new Date ());
    const [data, setData] = useState([]);    
    const [holiday, setHoliday] = useState("");    
    const [filterData, setFilterData] = useState([]);  

    // useEffect(()=>{},[])
    
    useEffect(()=>{
        setCurrentAction(false); 
        apiCalls.get("/actions")
        .then(res=>{
            const actionsData = res.map(v=>{
                return {name:v.name,id: v._id,schedules:v.schedules,type:v.actionType}
            })
            setData(actionsData)
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))     
    },[])

    useEffect(() => {
        const allMatchedData = data.map(action => {
            const matchedSchedules = action.schedules.filter(schedule => {
                const scheduleDate = new Date(schedule.date);
                return dates.getDate(scheduleDate) === dates.getDate(curentCalendarDate) 
            });
            const hebrewType = action.type=="workshop"?"סדנה":action.type=="preparing"?"מכינה":"קורס"
            return {
                name: action.name,
                id: action.id,
                type: hebrewType,
                data: matchedSchedules
            };
        });
        const finelFilter = allMatchedData.filter(v=>v.data.length > 0);
        setFilterData(finelFilter);
    }, [curentCalendarDate, data]);

    


    return (
        <div className={`center ${styles.hiro}`}>
            <div className={`center ${styles.navBar}`}>
                <DashboardNav/>
            </div>
            <div className={`center ${styles.main}`}>
                <div className={`center ${styles.rightDiv}`}>
                    <div className={`center ${styles.top}`}>
                        <MessageBoard />
                    </div>
                    <div className={`center ${styles.bottom}`}>
                        <GraphAp/>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------- */}
                <div className={styles.leftDiv}>
                    <div className={`${styles.top}`}>
                        <Calendar setHoliday={setHoliday} setCurentCalendarDate={setCurentCalendarDate}/>
                    </div>
                    <div className={`center ${styles.bottom}`}>
                        {
                            filterData.length?filterData.map((v,i)=>{
                                
                                return (
                                    <div key={i} className={`center ${styles.actionCard}`}>
                                    <Link to={`/action/${v.id}/schedule`}> שם פעילות: {v.name}</Link>
                                    <h3> סוג פעילות: {v.type}</h3>
                                    <div className={`center`}>
                                            {v.data.map((val,index)=>{
                                                return( 
                                                    <div className={`center`} key={index}>
                                                        <h4> פעילות: {index+1}</h4>
                                                        <h4> שיעור מס': {val.classNum}</h4>
                                                        <h4>שעות לימוד: {val.numOFOuers}</h4>
                                                        <h4> מורה: {val.lecturer.name}</h4>
                                                        <h4> סטטוס: {val.statusDisplay}</h4>
                                                        <h4> הערות: {val.comments}</h4>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                )
                            })
                        :holiday?<h2 className={styles.msg}>היום {holiday} אין כלום בלו"ז ואם יש אז חמור מאוד</h2>:<h2 className={styles.msg}>אין פעילויות היום 😀</h2>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

