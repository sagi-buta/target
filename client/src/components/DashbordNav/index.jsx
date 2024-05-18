import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { DataContext } from '../../context';

const DashboardNav = () => {
    const {activUser} = useContext(DataContext);
    const logout = ()=>{
        localStorage.clear()
        location.reload()
    }
    return (
        <div className={`center ${styles.navBar}`}>
            <button onClick={logout} >התנתק</button>
            <Link to="/actions">כל הפעילויות</Link>
            <Link to="/students">כל התלמידים</Link>
            {activUser.role=="admin"&&<Link to="/admins">ניהול משתמשים</Link>}
        </div>
    );
}

export default DashboardNav;
