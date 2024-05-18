const action = {
    "students": [
        {
            "num": 1,
            "personalId": "123456789",
            "name": "סטודנט אחד",
            "phone": "050-1234567",
            "email": "studenee vnbhte@example.com",
            "notes": "הערות על הסטודנט הראשון"
        }
    ],
    "orderSource": "אורגןDEDE newtest22 X",
    "fundingSource": "גוף מממן  newtestEDDY",
    "ContactInfo": {
        "name": "איש  sagiקשר",
        "email": "contact@example.com",
        "phone": "054-1234567"
    },
    "name": "פרויקט לימודים סדנה הכוון",
    "location": "חדר 101 בני ברק מרכז הכוון",
    "locationType": "1",
    "days": ["1", "2", "4"],
    "startTime": "10:00",
    "endTime": "14:00",
    "startDate": new Date(),
    "endDate": new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
    "numSessions": "15",
    "numStudyHours": "45",
    "studyFormat": {
        "format": "מפגשים פיזיים",
        "link": "",
        "note": "הסבר נוסף על פורמט הלימודים"
    },
    "status": {
        "status": "פעיל",
        "cancellationNote": ""
    },
    "actionType": "סדנה",
    "lecturer": {
        "id": "123456",
        "name": "מר/גברת המרצה"
    },
    "notes": "הערות כלליות",
    "notesP": "הערות פרטיות",
    "files": [
        {
            "fileName": "קובץ1.pdf",
            "fileType": "PDF",
            "size": "2MB",
            "createdDate": "2023-08-22T12:00:00Z",
            "filePath": "/path/to/file1.pdf"
        },
        {
            "fileName": "קובץ2.docx",
            "fileType": "DOCX",
            "size": "1MB",
            "createdDate": "2023-08-22T13:00:00Z",
            "filePath": "/path/to/file2.docx"
        }
    ],
    "finFiles": [
        {
            "fileName": "תקציר כספי.pdf",
            "fileType": "PDF",
            "size": "500KB",
            "createdDate": "2023-08-22T14:00:00Z",
            "filePath": "/path/to/financial_summary.pdf"
        }
    ],
    "tasks": [

    ],
    "users": ["123456789012345678901234", "987654321098765432109876"],
    "schedules": [
        {
            "date": "2023-09-05T10:00:00Z",
            "lecturer": "123456789012345678901234",
            "comments": "פגישה עם המרצה",
            "status": "נקבע"
        },
        {
            "date": "2023-09-12T11:30:00Z",
            "lecturer": "987654321098765432109876",
            "comments": "פגישה נוספת עם מרצה",
            "status": "נדחה"
        }
    ]
}
const action2 ={

}
module.exports = { action,action2 }