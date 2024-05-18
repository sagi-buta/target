import React, { useState } from "react";
import generateHours from "../../functions/generateHours";
import styles from "./style.module.css";

export default function InputHours({setData, defaultValueStart, defaultValueEnd}) {
  const [start, setstart] = useState();
  const [finish, setfinish] = useState();
  let hours = generateHours();

  const filteredTimes = hours.filter((time) => {
    if (!start) return true;
    const hour = +time.split(":")[0];
    const minute = +time.split(":")[1];
    return (
      hour > +start.split(":")[0] ||
      (hour === +start.split(":")[0] && minute > +start.split(":")[1])
    );
  });


  function ChangeNumber(e) {
    setstart(e.target.value);
    setData(prev=>{
      return {...prev,startTime:e.target.value}
    })
  }
  
  function HoursLimit(e) {
    setfinish(e.target.value);
    setData(prev=>{
      return {...prev,endTime:e.target.value}
    })
  }

  return (
    <div className={styles.fader}>
      <div className={` center ${styles.container}`}>
        <label> שעת התחלה</label>
        <select
          className={`center`}
          defaultValue={defaultValueStart}
          onChange={(e) => ChangeNumber(e)}
          name="start"
        >
          {hours.map((item, i) => {
            return <option key={i} className={styles.item}>{item}</option>;
          })}
        </select>
      </div>
      <div className={` center ${styles.container}`}>
        <label>שעת סיום</label>
        <select 
          className={`center`}
          defaultValue={defaultValueEnd}
          onChange={(e) => HoursLimit(e)}
          name="end"
        >
          {filteredTimes.map((item, i) => {
            return <option  key={i} className={styles.item}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

{
  /* <div className={styles.container}>
        <div className={styles.study}>שעות לימוד</div>
        <div className="w210">
          <label> שעת התחלה</label>
          <select
            onChange={(e) => ChangeNumber(e)}
            name="hours1"
            className={styles.abc}
          >
            {hours.map((item, i) => {
              return <option className={styles.item}>{item}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="w210">
        <label>שעת סיום</label>
        <select
          onChange={(e) => HoursLimit(e)}
          name="hours1"
          className={styles.abc}
        >
          {filteredTimes.map((item, i) => {
            return <option className={styles.item}>{item}</option>;
          })}
        </select>
      </div> */
}
