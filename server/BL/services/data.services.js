const { read, readOne, create, deleteOne, update } = require('../../DL/controllers/data.controler')

const readFun = async (filterBy) => {
    let data
    if (filterBy) {
        data= await readOne(filterBy)
    }
    else {
        data = read({})
    }
    if (typeof data === "string"||!data)  throw {msg:"לא ניתן היה לקבל את הנתונים ",data:{filterBy:filterBy?filterBy:"",data:data}}
    return data
}

const updateByTitleFun = async (title, newdata) => {
    let data = await update({title:title}, newdata)
    if (typeof data === "string"||!data)  throw {msg:"לא ניתן היה לקבל את הנתונים ",data:{title,obg:data,data:newdata}}
    return data
}


module.exports = {updateByTitleFun, readFun }

// const deleteFun = async (id) => {
//     let data = await deleteOne(id)
//     if (!data) throw "no data "
//     return data
// }

// const updateFun = async (id, newdata) => {
    //     let data = await update({_id:id}, newdata)
    //     if (!data) throw "no data found "
    //     return data
    // }
    
// const createFun = async (newdata) => {
//     let data = await create(newdata)
//     if (!data) throw "no data found "
//     return data
// }


// module.exports = {updateByTitleFun, deleteFun, readFun, updateFun, createFun }