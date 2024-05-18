import { useContext, useEffect, useState } from 'react';
import styles from './style.module.css' 
import SideNavButtons from '../../components/SideNavButtons';
import {DataContext} from '../../context/index'
import SideNavDashbord from '../../components/SideNavDashbord';

const SideNav = ({style={}}) => {
    const context = useContext(DataContext);
    const activety = context.currentAction;
    return (
        <div className={`center ${styles.sideNav} ${activety!==false?styles.sideNavActive:styles.sideNavNoActive}`} style={style}>
           {activety ?<SideNavButtons/>:<SideNavDashbord/>}
        </div>
    );
}

export default SideNav;
