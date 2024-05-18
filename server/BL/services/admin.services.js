const {getAllTeacher,deleteAdminAvi,deleteAdmin,getOne, getAll,createAdmin ,getPassword , login,updateAdmin,unDeleteAdmin} = require('../../DL/controllers/admins.controler')


const createFun = async (req,res) => {
    return await createAdmin(req,res)
}
const readAll = async (req,res) => {
    return await getAll(req,res)
}
const readAllTeacher = async (req,res) => {
    return await getAllTeacher(req,res)
}
const readOne = async (req,res) => {
    return await getOne(req,res)
}
const deleteFun = async (req,res) => {
    return await deleteAdmin(req,res)
}
const deleteFunAvi = async (req,res) => {
    return await deleteAdminAvi(req,res)
}
const unDeleteFun = async (req,res) => {
    return await unDeleteAdmin(req,res)
}
const updateFun = async (req,res) => {
    return await updateAdmin(req,res)
}

const getPasswordS = (req,res) => {
    return getPassword(req,res)
}
const loginS = async (req,res) => {
    return await login(req,res)
}

module.exports = {
    readAllTeacher,
    deleteFunAvi,
    createFun,readAll, 
    readOne, 
    deleteFun,
    loginS ,
    getPasswordS,
    updateFun,
    unDeleteFun
}