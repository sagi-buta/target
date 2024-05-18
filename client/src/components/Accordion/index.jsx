import styles from './style.module.css';
import { useState, useContext, useEffect } from 'react';
import RadioCheckbox from '../RadioCheckbox';
import { DataContext } from '../../context';
import apiCalls from '../../functions/apiCalls';
import sortFun from '../../functions/sort';
import dates from '../../functions/dates';
import DropeTasks from '../DropeTasks';

const Accordion = ({ style = {}, ...props }) => {
    const context = useContext(DataContext);

    const [filtersA, setFiltersA] = useState([])// <=1
    //  run getAction fun and go to actionsConverts fun <=2
    const [adminsActions, setAdminsActions] = useState([])//<=3
    const [pedagogActions, setPedagogActions] = useState([])//<=3

    const getActions = () => {
        apiCalls.get('/actions/all/actions/convert')//get all actions activated
            // .then(res => actionsConverts(res))
            .then(res => {
                console.log( "admins",res.adminActions,"pedagog",res.pedagogActions);
                setAdminsActions(res.adminActions)//admin's class
                setPedagogActions(res.pedagogActions)//pedagogue class
            })
            .catch(err =>context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response?.status}</h4>
                    <p>{err.response?.data.msg}</p>
                </div>
                ))
    }
    useEffect(getActions, [context.tasks])


    const actionsConverts = (res) => {
        
        let myActions = res.map((action, i) => {

            let doneTasks = action.tasks.filter((task) => !task.isDone)
            doneTasks.length > 0 ? doneTasks.sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) }) : null

            if (doneTasks.length > 0 && doneTasks[0]?.deadline) {

                let newAction = { ...action, sortedBy: doneTasks[0].deadline }

                return newAction;
            }
            else {
                return action
            }

        }).filter((action => action?.sortedBy))
        myActions.sort((a, b) => { return new Date(a.sortedBy) - new Date(b.sortedBy) })
        let renderActions = [...myActions]


        let adminActions = renderActions.map(action => {
            let newtasks = action.tasks.filter(task => !task.isDone && task.department === "מחלקת אדמיניסטרציה")
            if (newtasks.length > 0) {
                return {
                    ...action, tasks:
                        sortFun.isDoneSort(action.tasks.filter(task => task.department === "מחלקת אדמיניסטרציה").sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) }))
                }
            }
            else { return { ...action, sortedBy: false } }
        }).filter((action => action.sortedBy))

        let pedagogActions = renderActions.map(action => {
            let newtasks = action.tasks.filter(task => !task.isDone && task.department === 'מחלקת פדגוגיה')
            if (newtasks.length > 0) {
                return {
                    ...action, tasks:
                        sortFun.isDoneSort(action.tasks.filter(task => task.department === 'מחלקת פדגוגיה').sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) }))
                }
            }
            else { return { ...action, sortedBy: false } }
        }).filter((action => action.sortedBy))
        setAdminsActions(adminActions)//admin's class
        setPedagogActions(pedagogActions)//pedagogue class
    }

    return (
        <>
            <div className={styles.title}>
                <h5>מחלקת אדמיניסטרציה</h5>
                <DropeTasks actions={adminsActions} setFiltersA={setFiltersA} />
            </div>
            <div className={styles.title}>
                <h5>מחלקת פדגוגיה</h5>
                <DropeTasks actions={pedagogActions} setFiltersA={setFiltersA} />
            </div>
        </>
    );

};

export default Accordion;
