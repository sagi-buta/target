const express = require('express')
const router = express.Router()
const {deleteStusentFromAction,createNestedFun,readFun,updateFun} = require('../BL/services/students.services')
const {checkToken,checkIsTargetTeam } = require("../BL/middlewares/auth.checkToken")


router.get("/", checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await readFun()
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            error
        )
    }
})

router.post('/nested', checkToken,checkIsTargetTeam, async (req, res) => {
    const {studentData,actionId,arrName} = req.body
    try {
        let data = await createNestedFun(studentData,arrName,actionId)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            error
        )
    }
})

router.put("/:id", checkToken,checkIsTargetTeam, async(req, res) => {
    try {
        let data = await updateFun(req.params.id, req.body)
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            error
        )
    }
})

router.delete("/action/:action/:student", checkToken,checkIsTargetTeam, async(req, res) => {
    const {action,student} = req.params
    try {
        let data = await deleteStusentFromAction(action,student)
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            error
        )
    }
})



module.exports = router

// ************** not in use **********************
// router.get("/:id", checkToken,checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await readFun({_id:req.params.id})
//         res.send(data)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

// router.post('/', checkToken,checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await createFun(req.body)
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error)
//     }
// })

// router.delete("/:id", checkToken,checkIsTargetTeam, async(req, res) => {
//     try {
//         let data = await deleteFun(req.params.id)
//         res.send(data)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })






