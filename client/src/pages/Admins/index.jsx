import React, { useContext, useEffect, useState } from 'react';
import styles from "./style.module.css";
import apicalls from '../../functions/apiCalls'
import TableAvi from '../../components/TableAvi';
import { DataContext } from '../../context';
import apiCalls from '../../functions/apiCalls';
import PageButtons from '../../components/PageButtons';

const Admins = () => {
    const {idToEdit,setIdToEdit ,setTableData, setPopUp, currentAction } = useContext(DataContext);
    const [display, setDisplay] = useState(false);
    const [editAdmin, setEditAdmin] = useState(true);
    useEffect(() => {
        apiCalls.get(`/admins`)
        .then(res=>{
            const data = res.data.map(v=>{
                const newAdminStatus = v.adminStatus===true?"פעיל":"לא פעיל"
                return {...v,adminStatus:newAdminStatus}
            })
            const sortData =data.sort((a,b)=>b.adminStatus.localeCompare(a.adminStatus))
            setTableData(prev=>{
                return {...prev,admins:sortData}
            })
        })
        .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
    }, [display]);

    useEffect(() => {
        setEditAdmin(idToEdit.role?true:false)
        idToEdit.role && setPopUp(formToPopUp)
    }, [idToEdit._id,editAdmin])

    const addAdmin = ()=>{
        setPopUp(formToPopUp)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const updatedData = {
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
            phone: e.target.elements.phone.value,
            role: e.target.elements.role.value,
        };
        if(editAdmin){
            apiCalls.put(`/admins/update/${idToEdit.email}`, updatedData)
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
            apiCalls.post(`/admins`,{...updatedData,password: e.target.elements.password.value})
            .then(response =>{
                setDisplay(!display)
            })
            .catch(err =>setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
            setEditAdmin(true)
        }
        setPopUp(null)
        setIdToEdit({})
    };

    

    const formToPopUp =
        <form onSubmit={handleSubmit} className={`center formToPopUp`}>
            <label>שם</label>
            <input required={true} name="name" defaultValue={idToEdit.name} type="text" />
            <label>מייל</label>
            <input required={true} name="email" defaultValue={idToEdit.email} type="email" />
            <label>נייד</label>
            <input required={true} name="phone" defaultValue={idToEdit.phone} type="text" />
            <label>תפקיד</label>
            <select required={true} name="role" defaultValue={idToEdit.role} >
                <option value="administration">אדמניסטרציה</option>
                <option value="adviser">פדגוגיה</option>
                <option value="admin">אדמין</option>
                <option value="teacher">מורה</option>
            </select>
            {!editAdmin&&<div className={styles.password}>
                <label htmlFor='password' >סיסמה</label>
                <input required={true} name="password" type="text" />
            </div>}
            <div className='center'>
                <button id={"submitBtu"} type='submit'>שלח</button>
            </div>
        </form>

    return (
        <div className={`${styles.hiro}`}>
            <div className={`center ${styles.header}`}>
                <h2>דף ניהול משתמשים</h2>
            </div>
            <PageButtons buttons={[
                <button onClick={addAdmin}>הוסף משתמש</button>,
            ]}/>
            <TableAvi
                setDisplay={setDisplay}
                arrName={"admins"}
                valToGet={["name", "email","phone","role"]}
                displayColumnsArray={["מס'", "שם", "מייל","נייד","תפקיד", "ערוך אדמין", "סטטוס","שינוי סיסמה"]}
            />
        </div>
    );
}

export default Admins;
