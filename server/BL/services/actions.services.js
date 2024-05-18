const { updateNestedAvi, updateNestedAll, readAction, readOne, create, update, deleteOne, updateNested, readNestedBetwinDates, getNested, createNested, deleteNested, readActionsActive } = require("../../DL/controllers/actions.controler")
const getDates = require('../../functions/dates')
const dates = getDates.getAllDates()//=={ startMonth, endMonth, endWeek, iLZoneDate, Year, Month, Day}
const sortFun = require('../../functions/sort')
const { modifyDates } = require('../../functions/getTime.functions')
const getTasksDefault = require('../../functions/tasksDefault.js')
const { getDate, getDayOfWeek, getHebewDate } = require('../../functions/getTime.functions')

const updateNestedAllFun = async (actionId, arrName, objectId, updatedObject) => {
    const data = await updateNestedAll(actionId, arrName, objectId, updatedObject)
    if (typeof data === "string" || !data) throw { msg: `קרתה בעיה בעדכון הפעילות`, data: { actionId, arrName, objectId, updatedObject }, dataFromMongoose: data }
    return data
}


const getNestedFun = async (actionId, arrKey, kId) => {//get a array or current keyObj
    let action = await getNested(actionId, arrKey, kId)

    if (arrKey == "schedules") {
        action = action.map(v => {
            const statusDisplay = v.status == "1" ? "מתקיים" : v.status == "2" ? "לא מתקיים" : v.status == "3" ? "נדחה" : "בוטל";
            const hebrewDate = getHebewDate(v.date)
            const dateInStr = getDate(v.date)
            const dayName = getDayOfWeek(v.date)

            return { ...v, dateInStr, hebrewDate, dayName, statusDisplay }

        })
    }
    if (typeof action === "string" || !action) throw { msg: `קרתה בעיה בקבלת הנתונים`, data: { arrKey, kId, actionId }, dataFromMongoose: action }
    return action
}


const readNestedBetwinDatesFun = async (filterBy, arrName, keyDate, day) => {//get nested by dates
    let data
    let date1
    let date2
    let toDay = day == "day" ? dates.Day : false
    switch (filterBy) {
        case "week":
            date1 = dates.iLZoneDate
            date2 = dates.endWeek
            data = await readNestedBetwinDates(date1, date2, arrName, keyDate, toDay)
            break;
        case "month":
            date1 = dates.startMonth
            date2 = dates.endMonth
            console.log("mon 2", date1, date2, arrName, keyDate, toDay)
            data = await readNestedBetwinDates(date1, date2, arrName, keyDate, toDay)
            break;
        default:
            break;
    }
    if (typeof data === "string" || !data) throw { msg: `קרתה בעיה בקבלת הנתונים`, data: { filterBy, arrName, keyDate, day }, dataFromMongoose: data }
    return data
}



const readActionsByEndDateFun = async (select) => {//get all active action
    let actions = await readFun()
    let actionsActives = actions.filter(val => val.status.status || val.status.status > 0 && val.status.status < 3)

    if (typeof actions === "string" || !actions) throw { msg: `לא ניתן לקבל את הנתונים `, dataFromMongoose: actions }

    const actionsConverts = (res) => {

        let myActions = res.map((action, i) => {

            let doneTasks = action.tasks.filter((task) => !task.isDone)
            doneTasks.length > 0 ? doneTasks.sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) }) : null

            // if (doneTasks.length > 0 && doneTasks[0]?.deadline) {
            if (doneTasks.length > 0 && doneTasks[0]?.deadline) {

                let newAction = { ...action, sortedBy: doneTasks[0].deadline }

                return newAction;
            }
            else {
                return action
            }

        }).filter((action => action?.sortedBy))
        myActions.sort((a, b) => { return new Date(a.sortedBy) - new Date(b.sortedBy) })
        let renderActions = [...myActions]


        let adminActions = renderActions.map(action => {
            let newtasks = action.tasks.filter(task => !task.isDone && task.department === "מחלקת אדמיניסטרציה")
            if (newtasks.length > 0) {
                newtasks.sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) })
                action.sortedBy = newtasks[0].deadline
                return {
                    ...action, tasks:
                        sortFun.isDoneSort(action.tasks.filter(task => task.department === "מחלקת אדמיניסטרציה").sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) }))
                        // action.tasks.filter(task => task.department === "מחלקת אדמיניסטרציה").sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) })
                }
            }
            else { return { ...action, sortedBy: false } }
        }).filter((action => action.sortedBy))
        adminActions.sort((a, b) => { return new Date(a.sortedBy) - new Date(b.sortedBy) })

        let pedagogActions = renderActions.map(action => {
            let newtasks = action.tasks.filter(task => !task.isDone && task.department === 'מחלקת פדגוגיה')
            if (newtasks.length > 0) {
                newtasks.sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) })
                action.sortedBy = newtasks[0].deadline
                return {
                    ...action, tasks:
                        action.tasks.filter(task => task.department === 'מחלקת פדגוגיה').sort((a, b) => { return new Date(a.deadline) - new Date(b.deadline) })
                }
            }
            else { return { ...action, sortedBy: false } }
        }).filter((action => action.sortedBy))
        pedagogActions.sort((a, b) => { return new Date(a.sortedBy) - new Date(b.sortedBy) })

        let resolt = {
            adminActions,
            pedagogActions
        }
        return resolt
    }
    if (select === 'tasksNoConvert') {

        let allTasks = []
        actionsActives.forEach(actVal => allTasks = [...allTasks, ...actVal.tasks])
        return allTasks
    }
    else if (select === 'convert') {
        let converted = actionsConverts(actionsActives)
        return converted
    }
    else {

        return actionsActives
    }

    // if (!actions) throw "no found"

}


const creatrNestedFun = async (actionId, arrName, newData) => {
    let action = await createNested(actionId, arrName, newData)
    if (typeof action === "string") throw { msg: `לא ניתן ליצור מערך בפעילות המבוקשת`, data: { actionId, arrName, newData }, dataFromMongoose: action }
    return action
}


const deleteNestedFun = async (actionId, arrName, objectId) => {//absulte remove
    const action = await deleteNested(actionId, arrName, objectId)
    if (typeof action === "string" || !action) throw { msg: `לא ניתן למחוק`, data: { actionId, arrName, objectId }, dataFromMongoose: action }
    return action
}


const readFun = async (filterBy) => {//get all actions --OR-- one by id
    const today = new Date();
    let action
    let data
    let start
    let end
    let statusResult
    let NewSchedules
    if (filterBy) {
        data = await readOne({ _id: filterBy })
        if (typeof data === "string" || !data) throw { msg: "אין פעילות עם הפרטים האלה", data: filterBy }
        start = new Date(data.startDate)
        end = new Date(data.endDate)
        NewSchedules =
            data.schedules.map(val => {
                const statusDisplay = val.status == "1" ? "מתקיים" : val.status == "2" ? "לא מתקיים" : val.status == "3" ? "נדחה" : "בוטל";
                const hebrewDate = getHebewDate(val.date)
                const dateInStr = getDate(val.date)
                const dayName = getDayOfWeek(val.date)
                return { ...val, dateInStr, hebrewDate, dayName, statusDisplay }
            })
        const condition = data.status.status != "4" && data.status.status != "5"
        statusResult =
            condition && modifyDates(start, "-", 7) <= today && modifyDates(end, "+", 7) >= today ? "2" :
                condition && modifyDates(start, "-", 7) > today ? "1" :
                    condition && modifyDates(end, "+", 7) < today ? "3" :

                        data.status.status == "4" ? "4" : "5"

        action = { ...data, schedules: NewSchedules, status: { ...data.status, status: statusResult } }
    }
    else {
        data = await readAction({})
        action = data.map(v => {
            start = new Date(v.startDate)
            end = new Date(v.endDate)
            NewSchedules =
                v.schedules.map(val => {
                    const statusDisplay = val.status == "1" ? "מתקיים" : val.status == "2" ? "לא מתקיים" : val.status == "3" ? "נדחה" : "בוטל";
                    const hebrewDate = getHebewDate(val.date)
                    const dateInStr = getDate(val.date)
                    const dayName = getDayOfWeek(val.date)
                    return { ...val, dateInStr, hebrewDate, dayName, statusDisplay }
                })
            const condition = v.status.status != "4" && v.status.status != "5"
            statusResult =
                condition && modifyDates(start, "-", 7) <= today && modifyDates(end, "+", 7) >= today ? "2" :
                    condition && modifyDates(end, "+", 7) < today ? "3" :
                        condition && modifyDates(start, "-", 7) > today ? "1" :
                            v.status.status == "4" ? "4" : "5"
            return { ...v, schedules: NewSchedules, status: { ...v.status, status: statusResult } }
        })
    }
    if (typeof action === "string" || !action) throw { msg: "קרתה תקלה בקבלת המידע מהשרת", data: filterBy, dataFromMongoose: action }
    return action
}


const updateFun = async (id, data) => {
    let action = await update(id, data)
    if (typeof action === "string" || !action) throw { msg: `לא ניתן לעדכן את פעילות ${id}`, data: data, dataFromMongoose: action }
    return action
}
const createFun = async (data) => {
    if (data.status.status < 3 || data.status.status === '') {
        const start = data.startDate
        const end = data.endDate
        const defaultTasks = getTasksDefault.tasksDefaultFun(start, end)
        data.tasks = defaultTasks
    }
    let action = await create(data)
    if (typeof action === "string" || !action) throw { msg: `לא ניתן ליצור פעילות עם הנתונים האלה`, data: data, dataFromMongoose: action }
    return action
}
// createFun(emptyAction.action)

const deleteFun = async (id) => {
    let action = await deleteOne(id)
    if (typeof action === "string" || !action) throw { msg: "משהו השתבש במחיקת הפעילות: " + id, dataFromMongoose: action }
    return action
}

module.exports = {
    updateNestedAllFun,
    createFun, readFun,
    deleteFun,
    updateFun,
    readNestedBetwinDatesFun,
    getNestedFun,
    creatrNestedFun,
    deleteNestedFun,
    readActionsByEndDateFun
}


// async function handleUpdate(actionId, arrName, objectId, newData) {
//     switch (arrName) {
//         case "tasks":
//         case "schedules":
//             // conditions
//             getNestedFun(actionId, arrName, kId)
//             break;
//         case "users":
//             // conditions
//             getNestedFun(actionId, arrName, kId)
//             break;
//         case "files":
//             // conditions
//             getNestedFun(actionId, arrName, kId)
//             break;

//         default:
//             return {}
//     }
// }

// async function handleCreate(actionId, arrName, objectId, newData) {
//     switch (arrName) {
//         case "tasks":
//         case "schedules":
//             getNestedFun(actionId, arrName, kId)
//             break;
//         case "users":
//             // let newUser=create new user (await, service user)
//             // update to action>>users>>push[newUser._id]
//             getNestedFun(actionId, arrName, kId)
//             break;
//         case "files":
//             getNestedFun(actionId, arrName, kId)
//             break;

//         default:
//             return {}
//     }
// }

// const updateNestedFun = async (actionId, arrName, objectId, newData) => {//update a current key||off-activeition
//     const dataToUpdateArrys = Object.entries(newData)
//     const dataToUpdateArrysKey = dataToUpdateArrys[0][0]
//     const dataToUpdateArrysVal = dataToUpdateArrys[0][1]

//     let action = await updateNested(actionId, arrName, objectId, dataToUpdateArrysKey, dataToUpdateArrysVal)
//     if (!action) throw "no data"
//     return action
// }

// const updateNestedAviFun = async (actionId, arrKey, newData) => {
//     let oldData = await getNested(actionId, arrKey)
//     let data = await updateNestedAvi(actionId, arrKey, [...oldData, newData])
//     if (!data) throw "no data"
//     return data
// }

// module.exports = { updateNestedAviFun, updateNestedAllFun, createFun, readFun, deleteFun, updateNestedFun, updateFun, readNestedBetwinDatesFun, getNestedFun, creatrNestedFun, deleteNestedFun, readActionsByEndDateFun, handleUpdate, handleCreate }