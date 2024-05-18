const studentsModel = require('../models/students.model');
const readStudent = async (filterBy) => {
    // let data = await studentsModel.find(filterBy).populate("actions.actionId").lean().exec();   
    let data = await studentsModel.find(filterBy).lean().exec();   
    return data
}
const create = async (newData) => {
   let data = await studentsModel.create(newData)
   return data
}

const deleteOne = async (id) => {
    let data = await studentsModel.findByIdAndRemove(id)
    return data
}
const update = async (id,newData) => {
    let data =await studentsModel.findByIdAndUpdate(id,newData, {new: true})
    return data
}

const updateByEmail = async (email,newData) => {
    let data =await studentsModel.findOneAndUpdate({email:email},newData, {new: true})
    return data
}


module.exports = {updateByEmail,readStudent, create, deleteOne, update }
