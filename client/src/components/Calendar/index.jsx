
import React, { useContext, useEffect, useState } from 'react';
import CalendarComp from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import style from './style.module.css';
import axios from 'axios';
import dates from '../../functions/dates';
import { DataContext } from '../../context';


export default function Calendar({setHoliday, setCurentCalendarDate }) {
  const {setPopUp} = useContext(DataContext);
  const [dateOfDay, setDateOfDay] = useState(new Date());
  const [holidays, setholidays] = useState([]);
// get all relevnt holidays
  useEffect(()=>{
    getAllHolidays()
  },[])
  const getAllHolidays = async() => {
    const url ="https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on&i=on"
    const url2 =`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=${new Date().getFullYear()+1}&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on&i=on`
    let currentYear =await axios.get(url)
    let nextYear =await axios.get(url2)
    let allDataOfHolidays = [...currentYear.data.items,...nextYear.data.items].filter(v=>
      v.category=="holiday"&&
      v.subcat!=="shabbat"&&
      v.subcat=="fast"||
      v.subcat=="major"||
      v.subcat==="minor"||
      v.subcat=="modern"&&
      v.title=='Yom HaShoah'||
      v.title=='Yom HaZikaron'||
      v.title=="Yom HaAtzma'ut"||
      v.title=='Yom Yerushalayim'||
      v.title=='Yitzhak Rabin Memorial Day'
    ).map(val=>{
      const newdate = dates.modifyDate(val.date,1,"-")
      return {title:val.title,newdate:newdate,date:val.date,name:val.hebrew,type:val.subcat}
    })
      setholidays(allDataOfHolidays);
  }
  
  const getJewishHolidayName = (value) => {
    const formattedDate = value.toISOString().split('T')[0];
    const holiday = holidays.find((holiday) => holiday.newdate === formattedDate);
    return holiday ? holiday.name.replace(/\d+/g, '') : '';
  };

  const onDayClick = (value) => {
    setDateOfDay(value);
    setCurentCalendarDate(value);
    const formattedDate = value.toISOString().split('T')[0];
    const holiday = holidays.find((holiday) => holiday.newdate === formattedDate);
    setHoliday(holiday?.name ? holiday.name.replace(/\d+/g, '') : '')
  };
  const tileContentText = ({date})=>{
   return<div className={style.holiday}>{getJewishHolidayName(date)}</div>

  }

  return (
    <div className={style.hiro}>
      <CalendarComp
        value={dateOfDay}
        locale="he"
        calendarType='hebrew'
        onClickDay={onDayClick}
        tileContent={tileContentText}
        
      />
    </div>
  );
}



