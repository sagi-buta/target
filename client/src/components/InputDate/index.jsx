import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import dates from '../../functions/dates'
function InputDate({setData, startDate, endDate, style = {}, ...props }) {
  const [inputStartDate, setInputStartDate] = useState(startDate);
  const [inputEndDate, setInputEndDate] = useState(endDate);

  const handleStart =(e)=>{
    const value =e.target.value
    setInputStartDate(value);
    setInputEndDate(value)
    setData(prev=>{
        return {...prev,startDate:dates.parseStringToDate(value.split("-").reverse().join("-"))}
    })
}
const handleEnd =(e)=>{
    const value =e.target.value
    setInputEndDate(value)
    setData(prev=>{
        return {...prev,endDate:dates.parseStringToDate(value.split("-").reverse().join("-"))}
    })
  }

  return (
    <div className={styles.inputDates} style={style} {...props}>
      <div className={`center ${styles.dateBox}`}>
        <label className={styles.text}>תאריך התחלה</label>
        <input
          type="date"
          name="start"
          value={inputStartDate}
          onChange={handleStart}
        />
      </div>
      <div className={`center ${styles.dateBox}`}>
        <label className={styles.text}>תאריך סיום</label>
        <input
          type="date"
          name="end"
          min={inputStartDate}
          value={inputEndDate}   
          onChange={handleEnd}
        />
      </div>
    </div>
  );
  }
export default InputDate;

