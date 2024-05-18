const dataModel = require('../models/data.model');

const read = async (filterBy) => {//מביא הכל לפי טייטל 
    let data = await dataModel.find(filterBy).lean().exec();
    return data
}

const readOne = async (filterBy) => {
    let data = await dataModel.findOne(filterBy).lean().exec();
    return data
}

const create = async (newData) => {//לא בשימוש סדיר
    let data = await dataModel.create(newData)
    return data
}

const deleteOne = async (id) => {//לא בשימוש
    let data = await dataModel.findByIdAndRemove(id)
    return data
}
const update = async (filterBy, newData) => {
    await dataModel.findOneAndUpdate(filterBy, newData, { new: true }).lean().exec();
    let data = await readOne(filterBy)
    return data
}

module.exports = { read, readOne, create, deleteOne, update }