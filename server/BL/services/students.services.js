const {create, readStudent, update, } = require("../../DL/controllers/students.controler")
const {createNested,readNotPopulate,updateNestedAvi}  = require('../../DL/controllers/actions.controler')

// 
const createNestedFun = async (data,arrName,actionId) => {
    let action
    const currentStudent = await readStudent({email: data.student.email})
    const currentAction = await readNotPopulate({_id:actionId})
    if (currentStudent[0]?.email) {
        if(arrName=="actions"){
            const newStudentData ={
                ...currentStudent[0],
                actions:
                [
                    ...currentStudent[0].actions,
                    actionId
                ]
            }
            // valedate the current student 
            const allActions = currentStudent[0].actions.map(v=> JSON.stringify(v).slice(1,-1))
            const validateStudent =allActions.filter(v=>v===actionId)
            
            // valedate the current action 
            const allStudents =currentAction[0].students.map(v=> JSON.stringify(v.studentId).slice(1,-1))
            const validateAction = allStudents.filter(v=>JSON.stringify(currentStudent[0]._id).slice(1,-1)==v)

            // update all students
            const updatedStudent = validateStudent.length>0? "update faild action allrdy exsist":
            await update(currentStudent[0]._id,newStudentData)
            
            // update all actions
            const updatedAction =validateAction.length>0?"update faild student allrdy exsist":
            await createNested(actionId,"students",{studentId:currentStudent[0]._id,num:data.num})
            action ={student:updatedStudent,action:updatedAction}
        }
        else{
            action = {success:false, msg:"student allredy exsist",_id:currentStudent[0]._id}
        }
    }
    else{
        const crateStudent = await create({...data.student,actions:actionId})
        const updateAction = await createNested(actionId,"students",{studentId:crateStudent._id,num:data.num})
        action =  {success:true,msg:"studen added to DB",newStudent:{student:crateStudent,num:data.num},action:updateAction}
    }
    if (!action)  throw {msg:"לא ניתן היה לקבל את הנתונים ",data:{...action}}
    return action
    // return arrName
}
const readFun = async (filterBy) => {
    let action = await filterBy ? readStudent(filterBy) : readStudent({})
    if (!action)  throw {msg:"לא ניתן היה לקבל את הנתונים ",data:filterBy?{filterBy,action}:{...action}}
    return (action)
}

const updateFun = async (id, data) => {
    let dataAction = data.student.actions[0]
    let currentAction = await readNotPopulate({_id:dataAction })
    let action
    const newData = [...currentAction[0].students].map(v=>JSON.stringify(v.studentId).slice(1,-1)===id?{...v,num:data.num}:v)
    action = await updateNestedAvi(dataAction,"students",newData)
    action = await update(id,data.student)
    if (!action)  throw {msg:"בעיה בעדכון התלמיד",data:{action,data}}
    return action
}
const deleteStusentFromAction = async (actionId, studentId) => {
    let action 
    let currentAction = await readNotPopulate({_id:actionId })
    const currentStudent = await readStudent({_id:studentId})
    
    const filterStudents = currentAction[0].students.filter(v=>JSON.stringify(v.studentId).slice(1,-1)!==studentId)
    const filterActions = currentStudent[0].actions.filter(v=>JSON.stringify(v).slice(1,-1)!==actionId)
    
    const updateAction = await updateNestedAvi(actionId,"students",filterStudents)   
    const updateStudent = await update(studentId,{...currentStudent[0],actions:filterActions}) 
    action = {action:updateAction,student:updateStudent}
    if (!action)  throw {msg:"לא ניתן היה למחוק את התלמיד 😥 ",data:{...action}}
    return action
}




module.exports = {
    deleteStusentFromAction, 
    createNestedFun, 
    readFun, 
    updateFun 
}

// **************************************** not in use ***********************************
// const createFun = async (data) => {
    //     let action = await create(data)
    //     if (!action)  throw {msg:"לא ניתן ליצור תלמיד עם הנתונים האלה  ",data}
    //     return action
    // }

// const deleteFun = async (id) => {
//     let action = await deleteOne(id)
//     if (!action)  throw {msg:"בעיה במחיקת התלמיד",data:{...action}}
//     return action
// }
// module.exports = {deleteStusentFromAction,createNestedFun, createFun, readFun, deleteFun, updateFun }




