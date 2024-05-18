import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css'
import TableAvi from '../../components/TableAvi';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context';
import CurrentAction from '../../components/CurrentAction';
import apiCalls from '../../functions/apiCalls';
import dates from '../../functions/dates';
import ExporetExsel from '../../components/ExporetExsel';
import PageHeader from '../../components/PageHeader';
import PageButtons from '../../components/PageButtons';

const Schedule = () => {
    const {allData,setIdToEdit ,setTableData, idToEdit, setPopUp, currentAction } = useContext(DataContext);
    const paramsId = useParams().actionId
    const [display, setDisplay] = useState(false);
    const [editSchedule, setEditSchedule] = useState(true);

    // useEffect(()=>{},[])

    useEffect(() => {
        apiCalls.get(`actions/${paramsId}/schedules`)
        .then(res=>{
            setTableData(prev=>{
                return {...prev,schedules:res}
            })
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
    }, [display]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedData = {
            date:dates.parseStringToDate(String(e.target.elements.dateInStr.value).split("-").reverse().join("-")),
            classNum: e.target.elements.classNum.value,
            numOFOuers: e.target.elements.numOFOuers.value,
            lecturer: e.target.elements.lecturer.value,
            status: e.target.elements.status.value,
            comments: e.target.elements.comments.value,
        };
        if(editSchedule){
            apiCalls.put(`/actions/updateall/${paramsId}/${"schedules"}/${idToEdit._id}`, updatedData)
                .then(response => setDisplay(!display))
                .catch(err =>setPopUp(
                    <div>
                      <h4>שגיאה: {err.response.status}</h4>
                      <p>הודעה: {err.response.data.msg}</p>
                  </div>
                  ))
        }
        else{
            apiCalls.post(`/actions/${paramsId}/${"schedules"}`, updatedData)
            .then(response => setDisplay(!display))
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
            setEditSchedule(true)
        }
        setIdToEdit({})
        setPopUp(null)
    };
    const handleDelete = () => {
        apiCalls.Delete(`/actions/remove/${paramsId}/${"schedules"}/${idToEdit._id}`)
            .then(res => setDisplay(!display))
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
        setPopUp(null)
        
    }


    const formToPopUp =
        <form onSubmit={handleSubmit} className={`center formToPopUp`}>
            <label>תאריך</label>
            <input name="dateInStr" defaultValue={new Date().toISOString().split("T")[0]} type="date" />
            <label>מס' שיעור</label>
            <input name="classNum" defaultValue={idToEdit.classNum} type="number" />
            <label>שעות לימוד</label>
            <input name="numOFOuers" defaultValue={idToEdit.numOFOuers} type="text" />
            <label>מורה</label>
            <select name="lecturer">
                {allData.admins.map((v,i)=>{
                    return <option key={i} value={v._id}>{v.name}</option>
                })}
            </select>
            <label>סטטוס</label>
            <select name="status" defaultValue={idToEdit.status} type="text" >
                <option value="1">מתקיים</option>
                <option value="2">לא מתקיים</option>
                <option value="3">נדחה</option>
                <option value="4">בוטל</option>
            </select>
            <label>הערות</label>
            <textarea name="comments" defaultValue={idToEdit.comments} type="text" />
            <div className='center'>
            {editSchedule&&<button type='button' onClick={handleDelete} id={"deleteBtu"}>מחק לו"ז</button>}
                <button id={"submitBtu"} type='submit'>שלח</button>
            </div>
        </form>

    useEffect(() => {
        setEditSchedule(idToEdit.lecturer?true:false)
        idToEdit.lecturer && setPopUp(formToPopUp)
    }, [idToEdit,editSchedule])

    const addSchedule = ()=>{
        setPopUp(formToPopUp)
    }


    return (
        <div className={`center ${styles.hiro}`}>
            {paramsId && <CurrentAction />}
            <PageHeader pageName={"לוח זמנים"} actionType={currentAction.actionType} />
            <PageButtons buttons={[
                <button key={"1"} onClick={addSchedule}>הוסף לו"ז</button>,
                <ExporetExsel 
                    arrName={"schedules"} 
                    headers={["תאריך","תאריך עברי","מס' שיעור","שעות לימוד","יום","מורה","סטטוס","הערות"]}
                    orderBy={["dateInStr","hebrewDate","classNum","numOFOuers","dayName","lecturer","statusDisplay","comments"]}
                />
            ]}/>
            <TableAvi
                arrName={"schedules"}
                displayColumnsArray={["מס'","תאריך","תאריך עברי","מס' שיעור","שעות לימוד","יום","מורה","סטטוס","הערות","ערוך"]}
                valToGet={["dateInStr","hebrewDate","classNum","numOFOuers","dayName","lecturer","statusDisplay","comments"]} 
            />

        </div>
    );
}

export default Schedule;
