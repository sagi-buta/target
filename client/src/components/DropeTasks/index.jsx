import styles from './style.module.css';
import { useState, useContext, useEffect } from 'react';
import RadioCheckbox from '../RadioCheckbox';
import { DataContext } from '../../context';
// import apiCalls from '../../functions/apiCalls';
// import sortFun from '../../functions/sort';
import dates from '../../functions/dates';
import { Link } from 'react-router-dom';

const DropeTasks = ({ setFiltersA, actions, style = {}, ...props }) => {
    const dataContext = useContext(DataContext);

    const [toggleIndex, setToggleIndex] = useState(null);

    const handleToggle = (i, e) => {
        //e.preventDefault()
        e.stopPropagation()
        setToggleIndex((prevToggleIndex) => (prevToggleIndex === i ? null : i));
    };

    return (
        <div className={styles.hiro}>
            {actions.map((actionV, i) => (

                <div key={i} className={styles.card}>

                    <div className={styles.headCard}>

                        <div className={styles.headCardRight}>
                            <div>{actionV.name}</div>
                            <div className={styles.firstDate}>משימה ראשונה:{dates.getDate(actionV.sortedBy)}</div>
                            <div>{actionV.actionType}</div>
                            {/* to do add icon orderSource */}
                        </div>


                        <div className={styles.headCardLeftnav} >

                            <div>{actionV.tasks.filter(obj => obj.isDone === true).length}/{actionV.tasks.length}</div>
                            <div className={styles.headCardLeft} onClick={(e) => handleToggle(i, e)} >
                                {toggleIndex === i ? (
                                    <div className={styles.addTaskBtnIcon}  >↻</div>
                                ) : (
                                    <div className={styles.addTaskBtnIcon}  >⇣</div>
                                )}
                            </div>
                        </div>


                    </div>


                    {toggleIndex === i && (
                        <div className={styles.bodyCard}>
                            {actionV.tasks.map((task, i) => (
                                <div key={i}>
                                    <RadioCheckbox task_id={task._id} task={task} action={actionV} setFiltersA={setFiltersA} />
                                </div>
                            ))}

                            <div className={styles.addTaskBtnArea}>

                                <Link className={styles.addTaskBtn} to={`/action/${actionV._id}/tasks`}>
                                    {/* <Link className={styles.addTaskBtn} onClick={()=>{DataContext.setActionId}} to={`/action/${actionV._id}/tasks`}> */}

                                    {/* <div className={styles.addTaskBtnIcon}>&#43;</div> */}
                                    <div className={styles.addTaskBtnIcon}>+</div>
                                    הצג עוד...
                                </Link>



                                <div className={styles.addTaskBtn} onClick={() => dataContext.setPopUp(<div>hello</div>)}>
                                    {/* <div className={styles.addTaskBtnIcon}>&#43;</div> */}
                                    <div className={styles.addTaskBtnIcon}>+</div>
                                    אופציונאלי...
                                </div>

                            </div>

                        </div>
                    )}

                </div>

            ))
            }


        </div >

    );

};

export default DropeTasks;
