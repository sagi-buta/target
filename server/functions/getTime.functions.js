// יצירת אובייקט המייצג את התאריך והשעה הנוכחיים
const now = new Date();
const {toJewishDate,toHebrewJewishDate} = require('jewish-date');

// קבלת היום, החודש והשנה
function getDate (date=now) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const fullDate = `${day}-${month}-${year}`;
    return fullDate
}
// קבלת השעה, הדקה והשנייה
function getOuerMS (date=now) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const millisecond = date.getMilliseconds().toString().padStart(2, '0');
    
    const fullOuer = `${hour}-${minute}-${second}.${millisecond}`
    return fullOuer
}
function getOuer (date =now){
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    const fullOuer = `${hour}:${minute}`
    return fullOuer
}
function getDayOfWeek(date=now) {
    const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const dayName = daysOfWeek[date.getDay()];
    return dayName;
}
function getHebewDate(date=now) {
    const hebrewDate = toHebrewJewishDate(toJewishDate(date))
    const hebrewDateInStr = `${hebrewDate.day} ${hebrewDate.monthName} ${hebrewDate.year} `
    return hebrewDateInStr
}
const modifyDates = (date,method,num)=>{
    const oldDate = new Date(date);
    const newDate =
    method==="+"? new Date(oldDate.getTime() + Number(num) * 24 * 60 * 60 * 1000):
    method==="-"?new Date(oldDate.getTime() - Number(num) * 24 * 60 * 60 * 1000):
    new Date()
    return newDate
}

// יצירת פורמט התאריך והשעה הרצוי
const fuulDateOver = `${getDate()}__${getOuerMS()}`


module.exports = {modifyDates,getHebewDate,getOuerMS,getDate,getOuer,fuulDateOver,getDayOfWeek}