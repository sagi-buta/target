function getAllDates() {
    const nowDate = new Date()
    const zone = { timeZone: 'Asia/Jerusalem' }
    const iLZoneDate = new Date(nowDate.toLocaleString('en-US', zone))//set date to iLzone
    const Year = iLZoneDate.getFullYear();
    const Month = iLZoneDate.getMonth() + 1
    const Day = iLZoneDate.getDate()
    // תאריך ראשון של החודש
    const startMonth = new Date(Year, Month - 1, 1); // month מתחיל ב-0 (ינואר) עד 11 (דצמבר)
    // תאריך אחרון של החודש
    const endMonth = new Date(Year, Month, 1); // התאריך 0 של חודש מתייחס ליום האחרון של החודש הקודם
    // תאריך סוף 7 ימים מהיום
    const endWeek = new Date(iLZoneDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    const startWeek = new Date(iLZoneDate.getTime() - 7 * 24 * 60 * 60 * 1000)

    return { startMonth, endMonth, endWeek,startWeek, iLZoneDate, Year, Month, Day };
}
// דוגמה לשימוש בפונקציה
// const year = new Date().getFullYear();
// const month = new Date().getMonth() + 1 // יולי (month מתחיל ב-1 עד 12)

// const { start, end } = getMonthRange(year, month)

// console.log(start, end)
// console.log(year, month)

// let iLZoneDate=getAllDates()
// let today = new Date() 

// let sevendays=new Date(iLZoneDate.iLZoneDate.getTime() - 7 * 24 * 60 * 60 * 1000)

// console.log(1,iLZoneDate.iLZoneDate,2,today,3,sevendays);




module.exports = { getAllDates }
