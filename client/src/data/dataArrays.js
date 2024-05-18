const typeArr = [{ value: "workshop", text: "סדנא" }, { value: "course", text: "קורס" }, { value: "preparing", text: "מכינה" }]
const locationArr = [{ value: "1", text: "בגוף המזמין" }, { value: "2", text: "כיתה חיצונית" }]
const daysArr = [{ text: 'יום א', value: "1" }, { text: 'יום ב', value: "2" }, { text: 'יום ג', value: "3" }, { text: 'יום ד', value: "4" }, { text: 'יום ה', value: "5" }, { text: 'יום ו', value: "6" }]
const statusArr = [{ value: "1", text: "טרם התחיל " }, { value: "2", text: "פעיל" }, { value: "3", text: "סיום" },{ value: "4", text: " בוטל טרם פתיחה" },{ value: "5", text: "בוטל לאחר פתיחה" }]
const formatArr = [{ value: "1", text: "פרונטלי" }, { value: "2", text: "מקוון" }, { value: "3", text: "היברידי" }]
const genderArr = [{ value: "1", text: "גברים" }, { value: "2", text: "נשים" }, { value: "3", text: "מעורב" }]
const actionTypes = [
    {actionType:"workshop",color:"#76C6D1",nameHebrew:"סדנה"},
    {actionType:"course",color:"#FEC130",nameHebrew:"קורס"},
    {actionType:"preparing",color:"#BEBEBE",nameHebrew:"מכינה"}
]

// test avi

let action = {
    "gender" : "",
    "orderSource":"",
    "fundingSource": "",
    "contactInfo": {
        "name": "",
        "email": "",
        "phone": ""
    },
    "name": "",
    "location": "",
    "locationType": {
        "type": "",
        "note":""

    },
    "days": [],
    "startTime": "",
    "endTime": "",
    "startDate": {},
    "endDate": {},
    "numSessions": "",
    "studyAcademicHours": "",
    "studyNormalHours": "",
    "studyFormat": {
        "format": "",
        "link":"",
        "note":""
    },
    "status": {
        "status": "",
        "note":""
    },
    "actionType": "",
    "lecturer":{"name":""},
    "notes":"",
    "notesP": "",
    "files": [],
    "finFiles": [],
    "tasks": [],
    "students": [],
    "schedules": []
}
let orderSource =
{
    "title":"orderSource",
    "info":"orderSource array",
    "data": [
        "ידידים","דודו בלנגה"
    ]
}
let fundingSource = 
{
    "title": "fundingSource",
    "info": "fundingSource array",
    "data": [
        "עלם",
        "סבתא רחל",
        "קורחל",
        "דוד סאם",
        "נחום איש גמזו",
        "סטטוס"
    ]
}


export default {actionTypes,typeArr,locationArr,daysArr,statusArr,formatArr,genderArr}  