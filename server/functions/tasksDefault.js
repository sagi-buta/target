
function tasksDefaultFun(start, end) {

    let startTenDays = new Date(start).getTime() - 10 * 24 * 60 * 60 * 1000
    let startSevenDays = new Date(start).getTime() - 7 * 24 * 60 * 60 * 1000
    let endSevenDays = new Date(end).getTime() - 7 * 24 * 60 * 60 * 1000
    let endFourteenDays = new Date(end).getTime() - 14 * 24 * 60 * 60 * 1000
    let endOneDayAfter = new Date(end).getTime() + 1 * 24 * 60 * 60 * 1000

    defaultTasksArr =
        [
            {
                name: "שליחת אימייל למורה",
                responsibility: null,
                department: "מחלקת אדמיניסטרציה",
                deadline: startTenDays,
                details: "עידכון המרצה לפני תחילת פעילות",
                isDone: false,
            },
            {
                name: "חומרי לימוד",
                responsibility: null,
                department: "מחלקת אדמיניסטרציה",
                deadline: startSevenDays,
                details: "טיפול ואספקת חוברות",
                isDone: false,
            },
            {
                name: "חומרי לימוד",
                responsibility: null,
                department: "מחלקת פדגוגיה",
                deadline: startTenDays,
                details: "טיפול ואספקת חוברות",
                isDone: false,
            },
            {
                name: "תעודות סיום",
                responsibility: null,
                department:"מחלקת אדמיניסטרציה",
                deadline: endFourteenDays,
                details: "הכנת תעודות סיום",
                isDone: false,
            },
            {
                name: "משובי סיום",
                responsibility: null,
                department: "מחלקת אדמיניסטרציה",
                deadline: endSevenDays,
                details: "טיפול והגשת משובי סיום",
                isDone: false,
            },
            {
                name: "סיכום משובי סיום",
                responsibility: null,
                department: "מחלקת אדמיניסטרציה",
                deadline: endOneDayAfter,
                details: "סיכום משובי סיום ושליחה",
                isDone: false,
            }
        ]


    // return ({ defaultTasksArr, startTenDays, endFourteenDays, endSevenDays, endOneDayAfter })
    return defaultTasksArr
}

module.exports = { tasksDefaultFun }