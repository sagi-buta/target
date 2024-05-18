
// function : get dey name prom date
//props : Date based only / end - . For example: 19/07/2023 . 19-07-2023
// creator: elad mizrchi

function GetDayName(dateStr) {
    const dateParts = dateStr.split(/[\/-]/);
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based (January is 0)
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
}


// function : הופכת תאריך מ 2023-07-16  ל  16-07-2023
//props : מקבלת תאריך שמחולק ב / או ב - והופכת לו את הסדר  
// creator: elad mizrchi

function convertDateFormat(dateStr) {
    const dateParts = dateStr.split(/[/-]/); // פיצוץ התאריך למערך של חלקי התאריך
    const ccyy = dateParts[0];
    const mm = dateParts[1];
    const dd = dateParts[2];
    return `${dd}/${mm}/${ccyy}`;
}

export default { GetDayName, convertDateFormat }


