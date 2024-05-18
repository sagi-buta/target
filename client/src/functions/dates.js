const now = new Date();

function getDatesBetween(startDateString, endDateString, daysToSearch) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const datesBetween = [];

    while (startDate <= endDate) {
        const dayOfWeek = startDate.getDay();

        if (daysToSearch.includes(dayOfWeek)) {
            datesBetween.push(new Date(startDate));
        }

        startDate.setDate(startDate.getDate() + 1);
    }

    return datesBetween;
}

function parseStringToDate(dateString) {
    const [day, month, year] = dateString.split('-');
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toISOString();
}

function getDate (dateString) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const fullDate = `${day}-${month}-${year}`;
    return fullDate
}

function normalDate(string) {
    const date = new Date(string);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Format clean date string
    const cleanDate = `${year}-${month}-${day}`;
    return cleanDate

}

const modifyDate =(date, daysToAdd,op) =>{
    var newDate = new Date(date);
    op==="+"?newDate.setDate(newDate.getDate() + daysToAdd):
    op==="-"?newDate.setDate(newDate.getDate() - daysToAdd):false
    return newDate.toISOString().split('T')[0];
}
export default {modifyDate, normalDate, getDate, parseStringToDate, getDatesBetween }







