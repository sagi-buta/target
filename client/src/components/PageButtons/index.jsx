import React from 'react';
import styles from './style.module.css'

const PageButtons = ({buttons=[]}) => {
    return (
        <div className={`center ${styles.pageButtons}`}>
            {buttons.map((b,i)=>{
                return <div className={`center ${styles.content}`} key={i}>{b}</div>
            })}
        </div>
    );
}

export default PageButtons;
