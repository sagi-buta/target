const encoding = require('encoding');
const express = require('express');
const router = express.Router();
const upload = require('../functions/upload.functions');
const actionsServices = require('../BL/services/actions.services')
const { getDate, getOuer } = require('../functions/getTime.functions')
const { readfile, readfolderfils, deletes, rename, cut, setRoot } = require('../BL/services/files.services');
const { WriteBuferFromJson, readFileXlsx } = require('../functions/exselHendler')
const mime = require('mime-types');
const { checkToken, checkIsTargetTeam } = require('../BL/middlewares/auth.checkToken')
const { createNestedFun } = require('../BL/services/students.services');
const iconv = require('iconv-lite')


//   --- read all files in folder  return 2 array ---          
router.get("/", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        let id = req.query.id
        let dir = req.query.dir
        let arrKey = dir.split("/").pop()
        setRoot(id, dir)

        const filesInfo = await actionsServices.getNestedFun(id, arrKey)
        const filesName = readfolderfils(dir)//nesessary full path with id in dir
        const resoult =
        {
            filesInfo,
            filesName
        }
        // console.log(resoult);
        res.send(resoult)
    } catch (error) {
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})

//   --- to show file -or- download. ---
router.get("/one", checkToken, checkIsTargetTeam, async (req, res) => {
    let id = req.query.id
    let dir = req.query.dir
    let fileType = mime.lookup(`./root/${dir}`);
    try {
        setRoot(id, dir)
        let File = readfile(dir)
        res.writeHead(200, { "Content-Type": `${fileType}` });
        res.end(File);
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value? {msg:error.message,status:"500"}:
            error

        )
    }
})

//   --- update file and save info at db. ---
router.post('/upload', checkToken, checkIsTargetTeam, upload.single("upfile"), async (req, res) => {//upload a file.

    try {
        if (!(req.file)) throw "file not found"
        let formDataFile = req.file;//new file
        let newFileName = iconv.decode(formDataFile.originalname, 'UTF-8')
        let fileNameFoDir = Date.now() + newFileName
        let fileType = formDataFile.mimetype.split("/")[0]
        let size = formDataFile.size
        let createdDate = `${getDate()}_${getOuer()}`
        let id = `${req.query.id}`//folder drive user = the correct _id of usernow
        let dir = `${req.query.dir}`//the correct folder to add
        let folder = dir.split("/").pop()
        if (folder != "files" && folder != "finFiles") throw "folder not chosen"
        setRoot(id, dir)
        let newDir = dir + "/" + fileNameFoDir
        cut(formDataFile.path, newDir);

        const data =
        {
            fileName: newFileName,
            fileType,
            size,
            createdDate,
            filePath: newDir
        }
        const filesInfo = await actionsServices.creatrNestedFun(id, folder, data)
        const filesName = readfolderfils(dir)
        const resoult =
        {
            filesInfo: filesInfo.array,
            filesName
        }
        console.log(22, resoult, 33, newFileName);
        res.send(resoult);
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})

//   --- exelfiles handeling ---
router.post('/exportexsle', async (req, res) => {
    const { data, headers, orderBy } = req.body
    try {
        console.log(data);
        const bufferFromData = WriteBuferFromJson(data, headers, orderBy)
        res.writeHead(200, { "Content-Type": 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        res.status(200).end(bufferFromData);
    } catch (error) {
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})

router.post('/importexsle/:id', upload.single("file"), async (req, res) => {
    const { id } = req.params
    try {
        let fileData = readFileXlsx(req.file.path)
        const obgectKeys = JSON.parse(req.body.objectKeys)
        let objectArray = []
        fileData.forEach((v, i) => {
            let obg = {}
            obgectKeys.forEach((val, index) => {
                obg[val] = v[index]
            })
            i !== 0 && objectArray.push(obg)
        })
        let data = objectArray.filter(v => v.email).map(v => {
            const object = { ...v }
            delete object.num
            return { student: object, num: v.num }
        })
        const updateData = await Promise.all(data.map((v) => {
            return createNestedFun(v, "actions", id).then(res => res);
        }));
        res.status(200).send(updateData);

    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})


//   --- change filename and update pathfile&name in db --- 
router.put("/rename", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        const { id, dir, fileid } = req.query
        const newFileName = encoding.convert(req.body.fileName, 'UTF-8');
        setRoot(id, dir)
        let arrDir = dir.split("/")
        let filesKey = arrDir[1]
        let name = arrDir.pop()
        let fileType = name.split(".").pop()
        let newNameDir = arrDir.join("/") + "/" + Date.now() + newFileName + "." + fileType//new filename path

        let filesName = rename(dir, newNameDir)
        let dbNameAndDirObj = {
            fileName: newFileName + "." + fileType, // = {fileName:"new name.fileType"}
            filePath: newNameDir
        }
        const filesInfo = await actionsServices.updateNestedAllFun(id, filesKey, fileid, dbNameAndDirObj)

        const resoult =
        {
            filesInfo,
            filesName
        }
        res.send(resoult);
    } catch (error) {
        console.log(error);
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})


//   --- delete file/folder and update db ---
router.delete("/", checkToken, checkIsTargetTeam, async (req, res) => {
    try {
        let id = req.query.id
        let fileid = req.query.fileid
        let dir = req.query.dir
        setRoot(id, dir)

        let arrDir = dir.split("/")
        arrDir.pop()
        let newdir = arrDir.join("/")
        let arrKey = arrDir[arrDir.length - 1]

        const check = deletes(dir) //delete file( nesessary full path with id in dir)
        if (check !== true) throw "deletesError"

        let filesInfo = await actionsServices.deleteNestedFun(id, arrKey, fileid)
        if (!(filesInfo?.array)) throw "error deleting from db"

        res.send(filesInfo);
    } catch (error) {
        res.status(500).send(
            error.value ? { msg: error.message, status: "500" } :
                error
        )
    }
})






// router.delete("/", checkToken, checkIsTargetTeam, async (req, res) => {
//     try {
//         let id = req.query.id
//         let fileid = req.query.fileid
//         let dir = req.query.dir
//         setRoot(id, dir)

//         let arrDir = dir.split("/")
//         arrDir.pop()
//         let newdir = arrDir.join("/")
//         let arrKey = arrDir[arrDir.length - 1]

//         const check = deletes(dir) //delete file( nesessary full path with id in dir)
//         if (check !== true) throw "deletesError"

//         let filesInfo = await actionsServices.deleteNestedFun(id, arrKey, fileid)
//         if (!(filesInfo?.array)) throw "error deleting from db"

//         res.send(filesInfo);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error)
//     }
// })










module.exports = router;
