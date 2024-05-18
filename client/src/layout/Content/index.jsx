import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css'
import { Route, Routes, useParams } from 'react-router-dom';
// 
import Action from '../../pages/Action';
import Files from '../../pages/Files';
import Schedule from '../../pages/Schedule';
import Tasks from '../../pages/Tasks';
import Students from '../../pages/Students';
import Dashboard from '../../pages/Dashboard'
import { DataContext } from '../../context/index'
import Admins from '../../pages/Admins';
import AllAcctions from '../../pages/AllAcctions';
import AllStudents from '../../pages/AllStudents';
const Content = ({ style = {} }) => {
  const param = useParams()
  const context = useContext(DataContext);
  const activety = context.currentAction;
  const setActivety = context.setCurrentAction;

  return (

    <div className={`${styles.content}  ${activety!==false ? styles.contentActive : styles.contentNoActive}`} style={style}>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/action' element={<Action />}/>
        <Route path='/action/:actionId' element={<Action />} />
        <Route path='/action/:actionId/files' element={<Files />} />
        <Route path='/action/:actionId/students' element={<Students />} />
        <Route path='/action/:actionId/schedule' element={<Schedule />} />
        <Route path='/action/:actionId/tasks' element={<Tasks/>} />
        <Route path='/admins' element={<Admins/>}/>
        <Route path='/actions' element={<AllAcctions/>}/>
        <Route path='/students' element={<AllStudents/>}/>
      </Routes>
    </div>
  );
}

export default Content;
