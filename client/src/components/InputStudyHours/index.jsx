
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";

const InputStudyHours = ({setData,defaultAcademic,defaultNormal}) => {
    const [normalHours, setNormalHours] = useState(defaultNormal?defaultNormal:'');
    const [customHours, setCustomHours] = useState(defaultAcademic?defaultAcademic:'');
    const hendleNormal =()=>{
        const result = (normalHours * 60/45).toFixed(2)
        normalHours&&setCustomHours(result) ;
    }
    const hendleCastum =()=>{
        const result =(customHours *45/60).toFixed(2)
        customHours&&setNormalHours(result);
    }
    useEffect(()=>{
        setData(prev=>{return {...prev,studyNormalHours:normalHours }})
    },[normalHours])
    useEffect(()=>{
        setData(prev=>{return {...prev,studyAcademicHours:customHours }})
    },[customHours])
    return (
        <div className={`center ${styles.hiro}`}>
            <div className={`center ${styles.displayDiv}`}>
                <div className='center'>
                    <label htmlFor="normalHours">רגילות</label>
                    <input onChange={(e)=>setNormalHours(e.target.value)} value={normalHours} type="number" name='normalHours' />
                </div>
                {normalHours!=0&&<button onClick={hendleNormal}>המר</button>}
            </div>
            <div className={`center ${styles.displayDiv}`}>
                <div className='center'>
                    <label htmlFor="castumHours">אקדמאיות</label>
                    <input onChange={(e)=>setCustomHours(e.target.value)} value={customHours} type="number" name='castumHours' />
                </div>
                {customHours!=0&&<button onClick={hendleCastum}>המר</button>}
            </div>
        </div>
    );
}

export default InputStudyHours;

