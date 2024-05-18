const express = require('express')
const router = express.Router()
const {readAllTeacher,deleteFunAvi, createFun,readAll, readOne, deleteFun,loginS ,getPasswordS,updateFun,unDeleteFun} =require('../BL/services/admin.services')
const {checkToken,checkIsAdmin,checkIsTargetTeam} = require('../BL/middlewares/auth.checkToken')


// GET all
router.get("/",checkToken,checkIsTargetTeam,readAll)
router.get("/teacher/all",checkToken,checkIsTargetTeam,readAllTeacher)
// // GET one
router.get("/:id",checkToken,checkIsAdmin,readOne)
// DELETE
router.delete("/avi/:id",deleteFunAvi)
router.delete("/:id",checkToken,checkIsAdmin,deleteFun)
// POST
router.post("/",checkToken,checkIsAdmin, createFun );
// PUT
router.put("/resetpassword/:email", getPasswordS)
router.put("/update/:email",checkToken,checkIsAdmin,updateFun)
// LOGIN
router.post("/login", loginS);


module.exports = router