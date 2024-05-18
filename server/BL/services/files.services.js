const { log } = require('console');
const fs = require('fs');
const {updateNested,getNested,createNested} = require("../../DL/controllers/actions.controler")

let root = `./DL/root/`

const getNestedFun = async(actionId, arrKey, kId)=>{
    const action = await getNested(actionId, arrKey, kId)
    if(!action) throw "action faild"
    return action
}
const updatKey = async(actionId, arrName, objectId, newData)=>{
    const dataToUpdateArrys = Object.entries(newData)
    const dataToUpdateArrysKey = dataToUpdateArrys[0][0]
    const dataToUpdateArrysVal = dataToUpdateArrys[0][1]

    let action = await updateNested(actionId, arrName, objectId, dataToUpdateArrysKey, dataToUpdateArrysVal)
    if (!action) throw "action faild"
    return action
}
const updateArr = async (actionId, arrName, newData) => {
    const curentStudents = await getNested(actionId,arrName)
    let filterData = []
    newData.forEach((obg,i)=>{
     let exsist = curentStudents.some(v=>v.email === obg.email)
        if(!exsist){
            filterData.push(obg)
        }  
    }) 
    let action = await createNested(actionId, arrName, filterData)
    return action
}


const setRoot = (id, dir) => {
    if (!(dir && id)) throw "No permission to access"
}

function readfile(paht) {
    paht = root + paht
    console.log(paht);
    if (fs.existsSync(paht)) {
        // let file = fs.readFileSync(paht, { encoding: 'utf8' });
        let file = fs.readFileSync(paht);
        console.log("ok", file);
        return file// returns the info inside of the file
    }
    else {
        console.log(paht);
        console.log("file not exsist")
        throw "File not found"
    }
}
//readfile("64c912408b5a1420b61a7a0f/notes/1691032364332479497.jpg")

function readfolderfils(folder) {
    const paht = root + folder
    if (fs.existsSync(paht) && fs.statSync(paht).isDirectory()) {
        let folderArrOrFile = fs.readdirSync(paht)
        // console.log(folderArrOrFile);
        return folderArrOrFile
    }
    // else if (fs.existsSync) {/// optional -??- for show files
    //     folderArrOrFile= readfile(paht)
    //     console.log(folderArrOrFile);
    //     return folderArrOrFile
    // }
    else {
        console.log('folder/file not exist');
        throw "folder/file not exist"
    }
}
//readfolderfils('/a2')




//<={creatfile or folder by location & name
function creatfile(loc, filenNme, content) {
    const paht = root + loc + "/" + filenNme;
    fs.writeFileSync(paht, content)//for now only text
}

function creatfolder(loc, folderName) {
    const dir = loc ? loc + "/" + folderName : folderName;
    const paht = root + dir
    if (fs.existsSync(root + loc)) {
        if (!fs.existsSync(paht)) {
            fs.mkdirSync(paht)
            let stat = fs.statSync(paht)
            let folderDir = readfolderfils(loc)
            return ({ stat, folderDir })
        }
        else {
            console.log("folder already exist")
            throw 'folder already exist'
        }
    }
    else {
        console.log('folder not exist');
        throw "folder not exist"
    }
}
//creatfolder("64c912408b5a1420b61a7a0f/images", "newsagifolder")




function runInFoldersDelete(folder) {
    let arrInFolder = fs.readdirSync(folder)

    if (arrInFolder.length < 1) {//check if folder empty 
        return fs.rmdirSync(folder)// delete the folder & stop the fun:
    }
    else {
        arrInFolder.forEach(val => {
            if (!fs.statSync(`${folder}/${val}`).isDirectory()) {

                fs.unlinkSync(`${folder}/${val}`)//delete files
                return true
            }
            else { runInFoldersDelete(`${folder}/${val}`) } //call fun again to get in folder
        })
    }
    runInFoldersDelete(folder)//call fun again for deleted outside emptyed folders
}
//runInFoldersDelete(root + "oooo")

function deletes(paht) {
    paht = root + paht
    if (fs.existsSync(paht)) { //if file exists

        if (fs.statSync(paht).isDirectory()) {//if folder
            runInFoldersDelete(paht)// start delete fun
            console.log("folder deleted");
        }
        else {
            fs.unlinkSync(paht)//delete files
            console.log("file deleted");
            return true
        }
    }
    else {
        console.log("not exsist")
        throw "file not exsist"
    }
}
//deletes("64c912408b5a1420b61a7a0f/pdf_20230725_135033_0000.pdf")

function rename(file, to) {// file rename   (?transfer file to new loc?)  
    let dir = to.split("/")
    dir.pop();
    dir = dir.join("/")
    
    file = root + file
    to = root + to
    let myFile = file.split("/")
    let myTo = to.split("/")
    myFile.pop()
    myTo.pop()
    myFile = myFile.join("")
    myTo = myTo.join("")

    if (myFile != myTo) {
        console.log("location not same");
        throw "location  is not same"
    }// until here chack if the  all route loc is the same
    else {
        if (fs.existsSync(file)) {// check if file exsist

            if (!fs.existsSync(to)) {//check if found file wite the same newname in folder

                fs.renameSync(file, to)// fun work
                return readfolderfils(dir)
            }

            else {
                console.log("the newname is exsisit, choise a difrent newname");
                throw "the newname is exsisit, choise a difrent newname"
            }
        }
        else {
            console.log("file not exsist");
            throw "file not exsist"
        }
    }
}
//rename('64c912408b5a1420b61a7a0f/1691376573743kkk.docx', '64c912408b5a1420b61a7a0f/1691376573743hhhh.docx')

function cut(file, loc) {
    loc = root + loc
    if (fs.existsSync(file)) {
        if (!fs.existsSync(loc)) {
            fs.renameSync(file, loc);
        }
        else {
            console.log("the newname is exsisit, choise a difrent newname")
            throw "the newname is exsisit, choise a difrent newname"
        }
    }
    else {
        console.log("file not exsist");
        throw "file not exsist"
    }
}

const downloadFile = (dir, fileName) => {
    return `${dir}/${fileName}`
}
const readOne = (paht)=>{
    if (fs.existsSync(paht)) {
        return fs.readFileSync(paht)
    }
    else{return "not fund file"}
}


module.exports = {readOne,updatKey,getNestedFun ,updateArr, downloadFile, readfile, readfolderfils, creatfile, creatfolder, deletes, rename, cut, setRoot }