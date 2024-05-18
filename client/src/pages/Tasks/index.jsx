import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css'
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/index'
import CurrentAction from '../../components/CurrentAction';
import PageHeader from '../../components/PageHeader';
import TableTasks from '../../components/TableTasks/index';
import apiCalls from '../../functions/apiCalls';
import sort from '../../functions/sort';
import PageButtons from '../../components/PageButtons';
import dates from '../../functions/dates';

const Tasks = () => {

    let context = useContext(DataContext);
    const params = useParams()
    const [arrTasks, setArrTasks] = useState([])


    //----------------------------------------------------------------   
    const gettasks = () => {
        apiCalls.get(`/actions/${params.actionId}/tasks`)
            .then((res) => context.setTableData((prev) => {
                res.sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) })
                 return { ...prev, tasks: sort.isDoneSort(res) }
                 }))
            .catch(err => context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response.status}</h4>
                    <p>הודעה: {err.response.data.msg}</p>
                </div>
            ))
    }
    useEffect(gettasks, [])

    useEffect(() => context.setTableData((prev) => { return { ...prev, tasks: arrTasks } })
        , [arrTasks])

    //----------------------------------------------------------------


    //----------------------------------------------------------------
    const submit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const updateTask = {
            name: e.target.name.value,
            responsibility: e.target.responsibility.value,//toString(e.target.responsibility.value),
            department: e.target.department.value,
            deadline: e.target.deadline.value,
            details: e.target.details.value,
        }
        apiCalls.put
            (`/actions/updateall/${params.actionId}/tasks/${context.idToEdit._id}`, updateTask)
            .then((res) => { return setArrTasks(sort.isDoneSort(res.array)) })
            .catch(err => context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response.status}</h4>
                    <p>הודעה: {err.response.data.msg}</p>
                </div>
            ))

        context.setPopUp(null)
        context.setIdToEdit({})
    }

    useEffect(() => { context.idToEdit?._id && context.setPopUp(formForpopUp) }, [context.idToEdit])

    //----------------------------------------------------------------
    const handleclickadd = () => {
        context.setPopUp(formForpopUp)
    }

    const addtask = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const updateTask = {
            isDone: false,
            name: e.target.name.value,
            responsibility: e.target.responsibility.value,
            department: e.target.department.value,
            // deadline: !e.target.deadline.value?context.idToEdit.deadline:e.target.deadline.value,
            deadline: e.target.deadline.value,
            details: e.target.details.value,
        }
        apiCalls.post
            (`/actions/${params.actionId}/tasks`, updateTask)
            .then((res) => setArrTasks(sort.isDoneSort(res.array)))
            .catch(err => context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response.status}</h4>
                    <p>הודעה: {err.response.data.msg}</p>
                </div>
            ))

        context.setPopUp(null)

    }
    //----------------------------------------------------------------
    let formForpopUp =
        <form className={`center formToPopUp`} onSubmit={context.idToEdit?._id ? submit : addtask}>
            <label>שם</label>
            <input name="name" defaultValue={context.idToEdit.name} type="text" />
            <label>מחלקה אחראית</label>
            {/* <input name="department" defaultValue={context.idToEdit.department} type="text" /> */}

            <select defaultValue={context.idToEdit?.department} name="department">
                {/* {!context.idToEdit?._id ? <option value="">--בחירת מחלקה אחראית--</option> : context.idToEdit.department.name} */}
                <option value="מחלקת פדגוגיה">מחלקת פדגוגיה</option>
                <option value="מחלקת אדמיניסטרציה">מחלקת אדמיניסטרציה</option>
            </select>

            <label>גורם אחראי</label>
            <select name="responsibility"   >
                {/* {!context.idToEdit?._id ? <option value="">בחירת גורם אחראי</option> : context.idToEdit.department.name} */}
                {context.idToEdit.responsibility?.name && <option value={context.idToEdit.responsibility._id} defaultValue={context.idToEdit.responsibility._id}>{context.idToEdit.responsibility.name}</option>}
                {
                    context?.allData.targetTeam && context.allData.targetTeam.map((admin) => admin.role != "teacher" && admin.adminStatus && <option value={admin._id}>{admin.name}</option>)
                }
            </select>
            <label>תאריך לביצוע</label>
            <input name="deadline" defaultValue={context.idToEdit?._id ? dates.normalDate(context.idToEdit.deadline) : dates.normalDate(new Date)} type="date" />
            <label>פרטים</label>
            <textarea name="details" defaultValue={context.idToEdit.details} />
            <div className='center'>
                <button id={"submitBtu"} type='submit'>{context.idToEdit?._id ? "שמור שינוים" : "שמור"}</button>
            </div>
        </form>

    //----------------------------------------------------------------

    //================================================================
    //כפתורי יכולות בדף

    // סימון בוצע והורדה למטה עם מילוי הצאקבוקס
    // עריכת משימה
    // מחיקת משימה
    // הוספת משימה חדשה
    //    בוצע
    //================================================================
    // משימות שצריך לדחוף

    //  1. שליחת מייל למורה (יציג את המשימה 10 ימים לפני פתיחת הקורס) 
    // 2. חומרי לימוד ( גם שהמשימה תתוארך 10 ימים לפני תחילת הקורס) 
    // 3. הכנת תעודות סיום (תתוארך 14 ימים לפני סיום הקורס שמופיע בפעילות)
    // 4. משובי סיום (תתאוריך 7 ימים לסיום הקורס )
    // 5. סיכום משובי סיום (יתוארך יום אחרי סיום הקורס
    return (
        <div className={`center ${styles.hiro}`}>
            <CurrentAction />
            <PageHeader pageName={"משימות"} actionType={context.currentAction.actionType} />
            <PageButtons buttons={[
                <button key={"1"} onClick={() => handleclickadd()}>הוסף משימה</button>
            ]} />
            <TableTasks
                setArrTasks={setArrTasks}
                displayColumnsArray={["מס'", "✌️סמן כבוצע", "תיאור", "פרטים", "מחלקה אחראית", "גורם אחראי", "תאריך לביצוע", "עריכה", "מחיקה"]}
            />
        </div>
    );
}

export default Tasks;
