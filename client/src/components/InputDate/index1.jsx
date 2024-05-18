import React, { useState } from "react";
import styles from "./style.module.css";

function InputDate({ startDate, endDate, style = {}, ...props }) {
  const today = new Date();
  const todayFormatted = today.toISOString().substr(0, 10);
  const [inputStartDate, setInputStartDate] = useState(todayFormatted);
  const [inputEndDate, setInputEndDate] = useState(startDate);

  const handleStart =(e)=>{
    const value =e.target.value
    setInputStartDate(value);
  }
  const handleEnd =(e)=>{
    const value =e.target.value
    setInputEndDate(value)
  }

  return (
    <div className={styles.wrapper} style={style} {...props}>
      <div className={`date ${styles.dateBox}`}>
        <label className={styles.text}>תאריך התחלה</label>
        <input
          type="date"
          name="start-date"
          value={inputStartDate}
          onChange={handleStart}
        />
      </div>
      <div className={`date ${styles.dateBox}`}>
        <label className={styles.text}>תאריך סיום</label>
        <input
          type="date"
          name="end-date"
          min={inputEndDate}
          value={inputEndDate}
          onChange={handleEnd}
        />
      </div>
    </div>
  );
  }
export default InputDate;

