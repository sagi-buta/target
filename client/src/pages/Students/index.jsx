import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import TableAvi from '../../components/TableAvi';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context';
import CurrentAction from '../../components/CurrentAction';
import apiCalls from '../../functions/apiCalls';
import ExselImport from '../../components/ExselImport';
import ExporetExsel from '../../components/ExporetExsel';
import PageHeader from '../../components/PageHeader';
import PageButtons from '../../components/PageButtons';



const Students = () => {
    const {setIdToEdit ,setTableData, idToEdit, setPopUp, currentAction } = useContext(DataContext);
    const paramsId = useParams().actionId;
    const [display, setDisplay] = useState(false);
    const [editStudent, setEditStudent] = useState(true);
    const [studentsNums, setStudentsNums] = useState([]);
    const [numOfStudents, setnumOfStudents] = useState(0);
    
    // useEffect(() => {}, []);

    useEffect(() => {
        apiCalls.get(`/actions/${paramsId}/students`)
            .then((response) => {
                setTableData(prev => { return { ...prev, students: response.map(v=>v.studentId) }})
                setStudentsNums(response.map(v=>v.num))
            })
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response?.status}</h4>
                  <p>הודעה: {err.response?.data.msg}</p>
              </div>
              ))
    }, [display]);

    useEffect(() => {
        setEditStudent(idToEdit.email?true:false)
        idToEdit.email && setPopUp(formToPopUp)
    }, [idToEdit,editStudent])


    const addStusent = ()=>{
        setPopUp(formToPopUp)
    }
    const handleDelete = () => {
        apiCalls.Delete(`students/action/${paramsId}/${idToEdit._id}`)
            .then(res => {
                setDisplay(!display)
            })
            .catch(err =>{
                setPopUp(
                <div>
                  <h4>שגיאה: {err.response?.status}</h4>
                  <p>הודעה: {err.response?.data.msg}</p>
              </div>
              )
            })
        setPopUp(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name: e.target.elements.name.value,
            phone: e.target.elements.phone.value,
            email: e.target.elements.email.value,
            personalId: e.target.elements.personalId.value,
            city: e.target.elements.city.value,
            notes: e.target.elements.notes.value,
            actions :[paramsId]
        };
        const num =e.target.elements.num.value
        if(editStudent){
            apiCalls.put(`/students/${idToEdit._id}`,{student:updatedData,num:num})
            .then(res => {
                setDisplay(!display)
            })
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
        }
        else{
            apiCalls.post(`/students/nested`,{studentData:{student:updatedData,num:num},actionId:paramsId,arrName:"actions"})
            .then(res=>{
                setDisplay(!display)
            })
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
            setEditStudent(true)
        }
        setPopUp(null)
        setIdToEdit({})
    };
    
    const formToPopUp =
        <form onSubmit={handleSubmit} className={`center formToPopUp`}>
            <label>שם</label>
            <input name="name" defaultValue={idToEdit.name} type="text" />
            <label>מספר תלמיד</label>
            <input name="num" defaultValue={idToEdit.num} type="text" />
            <label>פלאפון</label>
            <input name="phone" defaultValue={idToEdit.phone} type="text" />
            <label>מייל</label>
            <input name="email" defaultValue={idToEdit.email} type="email" />
            <label>ת.ז</label>
            <input name="personalId" defaultValue={idToEdit.personalId} type="text" />
            <label>עיר</label>
            <input name="city" defaultValue={idToEdit.city} type="text" />
            <label>הערות</label>
            <input name="notes" defaultValue={idToEdit.notes} type="text" />
            <div className='center'>
                {editStudent&&<button type='button' onClick={handleDelete} id={"deleteBtu"}>מחק תלמיד</button>}
                <button id={"submitBtu"} type='submit'>שלח</button>
            </div>
        </form>


    return (
        <div className={`center ${styles.hiro}`}>
            {paramsId && <CurrentAction />}
            <PageHeader pageName={"תלמידים"} actionType={currentAction.actionType} />
            <PageButtons buttons={[
                <button onClick={addStusent}>הוסף תלמיד</button>,
                <ExporetExsel 
                    studentsNums={studentsNums}
                    arrName={"students"} 
                    headers={["שם","מספר תלמיד", "פלאפון", "מייל", "ת.ז","עיר", "הערות"]}
                    orderBy={["name","num","phone","email","personalId","city","notes"]}
                />,
                <ExselImport
                    objectKeys={["name","num", "phone", "email", "personalId","city", "notes"]}
                    setDisplay={setDisplay}
                    actinId={paramsId}
                />
            ]}/>
            <TableAvi
                studentsNums={studentsNums}
                arrName={"students"}
                valToGet={["name","num", "phone", "email", "personalId","city", "notes"]}
                displayColumnsArray={["מס'", "שם","מספר תלמיד", "פלאפון", "מייל", "ת.ז","עיר", "הערות", "ערוך תלמיד"]}
            />

        </div>
    )

}


export default Students;



