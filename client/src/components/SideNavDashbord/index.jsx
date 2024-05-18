import React, { useContext, useEffect } from 'react';
import styles from './style.module.css' 
import Accordion from '../Accordion';
import { GoHomeFill } from "react-icons/go";
import { DataContext } from '../../context';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const SideNavDashbord = () => {
    const context = useContext(DataContext)
    return (
        <div className={`center ${styles.hiro}`}>
        <Routes>
            <Route path='/' element={<Link to={"/action"} className={`center ${styles.newActivetyButton}`}><span>+</span>פעילות חדשה</Link>} />
            <Route path='/action' element={<Link id={styles.homeBtu} to={"/"}><GoHomeFill /></Link>}/>
            <Route path='/actions' element={<Link id={styles.homeBtu} to={"/"}><GoHomeFill /></Link>}/>
            <Route path='/admins' element={<Link id={styles.homeBtu} to={"/"}><GoHomeFill /></Link>}/>
            <Route path='/students' element={<Link id={styles.homeBtu} to={"/"}><GoHomeFill /></Link>}/>
        </Routes>
        <Routes>
            <Route path='/' element={
            <div className={`${styles.taskToDo}`}>
                <h4>משימות לביצוע</h4>
                <div>
                    <Accordion/>
                </div>
            </div>} />
            <Route path='/actions' element={<Link to={"/action"} style={{width:"250px",height:"50px",margin:"-10px 0 0 0 "}} className={`center ${styles.newActivetyButton}`}> הוסף פעילות <span>+</span></Link>}/>
        </Routes>

        
        </div>
    );
}

export default SideNavDashbord;
