const express = require('express')
const router = express.Router()
const{updateByTitleFun, readFun}=require('../BL/services/data.services')
const { checkToken, checkIsTargetTeam } = require("../BL/middlewares/auth.checkToken")


// router.get("/", async (req, res) => {
router.get("/", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        let data = await readFun()
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500"}:
            {...error,status:"500"}
        )
    }
})


router.get("/title/:title", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        let data = await readFun({ title: req.params.title })
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500"}:
            {...error,status:"500"}
        )
    }
})

router.put("/title/:title", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        let data = await updateByTitleFun(req.params.title, req.body)
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500"}:
            {...error,status:"500"}
        )
    }
})


module.exports = router

// ************** not in use *************************

// router.delete("/:id", checkToken, checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await deleteFun(req.params.id)
//         res.send(data)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

// router.post('/', async (req, res) => {
// router.post('/', checkToken, checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await createFun(req.body)
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error)
//     }
// })

// router.put("/:id", async (req, res) => {
// router.put("/:id", checkToken, checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await updateFun(req.params.id, req.body)
//         res.send(data)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

// router.get("/:id", checkToken, checkIsTargetTeam, async (req, res) => {
//     try {
//         let data = await readFun({ _id: req.params.id })
//         res.send(data)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })