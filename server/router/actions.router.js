const express = require('express')
const router = express.Router()
const {updateNestedAllFun, 
    createFun, 
    readFun, 
    deleteFun, 
    updateFun, 
    readNestedBetwinDatesFun, 
    getNestedFun, 
    creatrNestedFun, 
    deleteNestedFun, 
    readActionsByEndDateFun
} = require('../BL/services/actions.services')
const filesServices = require('../BL/services/files.services')
const {checkToken,checkIsTargetTeam } = require("../BL/middlewares/auth.checkToken")

// *********************************** GET ************************************************

//  **** all Actions
router.get("/",checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await readFun()
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

//  **** Key/Array of Action
router.get('/:actionId/:arrName',checkToken,checkIsTargetTeam, async (req, res) => {
    const { actionId, arrName } = req.params
    try {
        const result = await getNestedFun(actionId, arrName)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

router.get("/:id",checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await readFun({ _id: req.params.id })
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

//  **** get nested items by dates
router.get('/:filterBy/:arrName/:nameDateObjKey/:day/w/w/w',checkToken,checkIsTargetTeam, async (req, res) => {
    const { arrName, nameDateObjKey, filterBy, day } = req.params
    try {
        let data = await readNestedBetwinDatesFun(filterBy, arrName, nameDateObjKey, day)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

// router.get('/all/actions/:activate/a/a', async (req, res) => {
 router.get('/all/actions/:activate',checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        const activate=req.params.activate
        let data = await readActionsByEndDateFun(activate)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

// ********************************* POST **************************************************

router.post('/:actionId/:arrName',checkToken,checkIsTargetTeam, async (req, res) => {
    const { actionId, arrName, } = req.params
    const newData = req.body
    try {
        const result = await creatrNestedFun(actionId, arrName, newData)
        res.send(result)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

//  **** single Action
router.post('/',checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await createFun(req.body)
        filesServices.creatfolder("", data._id)
        filesServices.creatfolder(data._id, "files")
        filesServices.creatfolder(data._id, "finFiles")
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

// *********************************** PUT **************************************************

router.put("/:id",checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await updateFun(req.params.id, req.body)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

// **** update obj keys all values 
router.put(`/updateall/:actionId/:arrName/:objectId`,checkToken,checkIsTargetTeam,async(req, res)=>{
    const {actionId,arrName, objectId} = req.params
    try {
        const data = await updateNestedAllFun(actionId,arrName, objectId,req.body)
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

// *********************************** DELETE ************************************************

router.delete('/remove/:actionId/:arrKey/:kId',checkToken,checkIsTargetTeam, async (req, res) => {// delete from data
    const { actionId, arrKey, kId } = req.params
    try {
        const result = await deleteNestedFun(actionId, arrKey, kId,)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})

router.delete("/:id",checkToken,checkIsTargetTeam, async (req, res) => {
    try {
        let data = await deleteFun(req.params.id)
        res.send(data)
    } catch (error) {
        res.status(500).send(
            error.value? {msg:error.message,status:"500",data:error}:
            {...error,status:"500"}
        )
    }
})



module.exports = router

//********************* */ all routes ar not in use ********************
// ----------------------------------------------------------------------------------------------------------------
//  **** Single value in array of Action
// router.get('/:actionId/:arrKey/:kId',checkToken,checkIsTargetTeam, async (req, res) => {
//     const { actionId, arrKey, kId } = req.params
//     try {
//         const result = await getNestedFun(actionId, arrKey, kId)
//         console.log(result);
//         res.send(result)
//     } catch (error) {
    //         console.log(error);
//         res.status(400).send(error)
//     }
// })

// avi put 
// router.put('/uppp/:actionId/:arrKey',checkToken,checkIsTargetTeam, async (req, res) => {
//     const { actionId, arrKey } = req.params
//     try {
//         const result = await updateNestedAviFun(actionId, arrKey, req.body)
//         res.send(result)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message || error)
//     }
// })

// **** Single key in obj
// router.put('/:actionId/:arrKey/:kId',checkToken,checkIsTargetTeam, async (req, res) => {
//     const { actionId, arrKey, kId } = req.params
//     try {
//         const result = await updateNestedFun(actionId, arrKey, kId, req.body)
//         res.send(result)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message || error)
//     }
// })

// router.delete('/:actionId/:arrKey/:key',checkToken,checkIsTargetTeam, async (req, res) => {// chaingh activiti
//     const { actionId, arrKey, key } = req.params
//     try {
//         const result = await updateNestedFun(actionId, arrKey, key, req.body)
//         res.send(result)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message || error)
//     }
// })
