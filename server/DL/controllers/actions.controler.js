const actionsModel = require('../models/actions.model');

//   ***base crud***
const readAction = async (filterBy) => {
    let data = await actionsModel.find(filterBy).populate("students.studentId").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
    return data
}
const readNotPopulate = async (filterBy) => {
    let data = await actionsModel.find(filterBy).lean().exec()
    return data
}
const readOne = async (filterBy) => {
    let data = await actionsModel.findOne(filterBy).populate("students.studentId").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
    return data
}
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const update = async (id, newData) => {
    return await actionsModel.findByIdAndUpdate(id, newData, { new: true })
}
const deleteOne = async (id) => {
    let data = await actionsModel.findByIdAndRemove(id)
    return data
}


//   ***Nested function***
const getNested = async (actionId, arrKey, kId) => {
    let data = await actionsModel.findOne({ _id: actionId }).populate("students.studentId").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
    return (!kId ? data[arrKey] : data[arrKey].find(val => val._id == kId))//return 2 options all nested arr or current value
}

const createNested = async (actionId, arrKey, newData) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $push: { [arrKey]: newData } },
        { new: true }
    ).select(`${arrKey} name`).populate("students").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()// work "get" & "update"-fun only
    return { array: data[arrKey], data }
}




async function updateNestedAll(actionId, arrName, objectId, updatedObject) {
    let updateQuery = {};
    Object.keys(updatedObject).forEach(key => {
        updateQuery[`${arrName}.$.${key}`] = updatedObject[key];
    });
    let data = await actionsModel.findOneAndUpdate(
        { "_id": actionId, [`${arrName}._id`]: objectId },
        { $set: updateQuery },
        { new: true }
    ).populate("students").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
    return ({ updateObj: await getNested(actionId, arrName, objectId), array: data[arrName] })
}

const deleteNested = async (actionId, arrKey, keyId) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $pull: { [arrKey]: { _id: keyId } } },//remove the chosen obj
        { new: true }
    ).populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").select(`${arrKey} name`)
    // .lean().exec()
    return ({array:data[arrKey] ,_id:data._id,name:data.name})
}



const readNestedBetwinDates = async (date1, date2, arrKey, keyDate, toDay) => {
    let data = await actionsModel.find(
        {
            [`${arrKey}.${keyDate}`]: {//***get all full-action that stand by "dates" conditions
                "$gte": date1,
                "$lt": date2
            }
        }, `_id  name ${arrKey}`//***selct chosen keys from action obj's
    ).lean().exec()
    let newdata = data.map((val, i) => {//*** filter the only nested obj needed
        return {
            ...val, [arrKey]: val[arrKey]
                .filter(item => item[keyDate] < date2 && item[keyDate] > date1)//***filter nested by "conditions req"
        }
        // val[arrKey].map((val) => {//*** option b
        //     val[key] < date2 && val[key] > date1 ? newdata = [...newdata, val] : null
        // })
    })
    if (toDay) {//***check if need "today" and filter by day
        const objects = []
        newdata.map((obj, i) => {
            objects.push({
                ...obj, [arrKey]: obj[arrKey].filter(inobj => inobj[keyDate].getDate() == toDay)//filter "day condtion"
            })
        })
        newdata = objects.filter(val => val[arrKey].length ? val : null)//***clear obj whit empty arrays(get only current obj )
        return newdata
    }
    else {
       let actions= newdata.filter(val => val[arrKey].length ? val : null)
       let tasks=[]
       actions.map(val=>{tasks.push(...val[arrKey])})
        return {array:tasks,actions:actions}
     }
}
const updateNestedAvi = async (actionId, arrKey, newData) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $set: { [arrKey]: newData } },
        { new: true }
    ).select(`${arrKey} name`)// work "get" & "update"-fun only
    return { array: data[arrKey], data }
}

//     ***checks***

// readNestedBetwinDates(
//     dates.startMonth,
//     dates.endMonth,
//     "files",
//     "createdDate",
//     toDay = dates.Day
//     //toDay = new Date().getDate()
// ).then(console.log)

// readNestedBetwinDates(
//     dates.startMonth,
//     dates.endMonth,
//     "schedules",
//     "date",
//     // toDay = dates.Day
//     // toDay = new Date().getDate()
// ).then(console.log)

//updateNested("64b7a5230366c31bd049cbf0", "schedules", "64b6bd3491215e213dfe2bb3", "comments", "acol letova10").then(console.log)

// updateNestedAll("64e52ea9c7bcb47ca3f0aa0f", "files",
//     {
//         fileName: "1693145985643cv s222agi 01.pdf",
//         fileType: "application",
//         size: "66918",
//         createdDate: "27-08-23_17:19",
//         filePath: "64e52ea9c7bcb47ca3f0aa0f/files/1693145985643cv sagi 01.pdf",
//     }
//     , "64eb5b816fcb5ebc32db8966"
//     )
//     .then(console.log)

//readActionsActive("2023-07-23T11:09:09.803Z").then(console.log)

// createNested("64b7c81cab163bcddfc1860d", "files", {
//     "fileType": "image",
//     "size": 139403,
//     "createdDate": "gdchgdf",
//     "fileName": "gggDDDDDf55555888999hff55gg.PNG",
//     "filePath": "./public/root/64b85dca1e5b771f92fcf237/20-07-23__23-06-55.574__gggg.PNG"
// }).then(console.log)

//deleteNested("64b85dca1e5b771f92fcf237","tasks","64b85dca1e5b771f92fcf23a").then(console.log)

// createNested("64e4a638c4af0c4bcb31b38e","files", 
// {
//     filePath: "./root/files/64e47b527665aa13f2b36f8b/files/1692713965892479497.jpg"
// }).then(console.log)
// console.log("ok");

// readNestedBetwinDates().then(console.log)

// getNested("64b7c81cab163bcddfc1860d", "schedules", "64b6bd3491215e213dfe2bb4").then(r => console.log(r))

// getNested("64b7c81cab163bcddfc1860d", "files",).then(r => console.log(r))

module.exports = {readNotPopulate, 
    updateNestedAll, 
    readAction, 
    readOne, 
    create, 
    update, 
    deleteOne, 
    readNestedBetwinDates, 
    getNested, 
    createNested, 
    deleteNested ,
    updateNestedAvi
}


// const updateNestedAvi = async (actionId, arrKey, newData) => {
//     let data = await actionsModel.findOneAndUpdate(
//         { _id: actionId },
//         { $set: { [arrKey]: newData } },
//         { new: true }
//     ).select(`${arrKey} name`)// work "get" & "update"-fun only
//     return { array: data[arrKey], data }
// }

// async function updateNested(actionId, arrName, objectId, dataToUpdateKey, dataToUpdateVal) {//update & set not active
//     let data = await actionsModel.findOneAndUpdate(
//         { _id: actionId, [`${arrName}._id`]: objectId },//get the current loc
//         { $set: { [`${arrName}.$.${dataToUpdateKey}`]: dataToUpdateVal } },//update keys -or- set not active(delete)
//         { new: true }
//     ).populate("students").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
//     return ({ arrName, array: await getNested(actionId, arrName) })
// }



//   ***dates functions***
// const readActionsActive = async (filterBy) => {//get activete actions
//     let data = await actionsModel.find({ status: { "$gte": filterBy } }).populate("students").populate("lecturer").populate("tasks.responsibility").populate("schedules.lecturer").lean().exec()
//     return data
// }
// module.exports = {readNotPopulate,updateNestedAvi,updateNestedAll, readAction, readOne, create, update, deleteOne, updateNested, readNestedBetwinDates, getNested, createNested, deleteNested, readActionsActive }
