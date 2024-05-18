const fs = require("fs");

// יצירת תיקיה
const crateFolder = (folderPath)=>{
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log("folder seccsusfully created")
    }
}


// יצירה של קובץ חדש ובמידה והוא קיים הוא ימחק אותו ויצור אחד חדש
const crateFile =(path,inner)=>{
    if (!fs.existsSync(path)) {
        return fs.writeFileSync(path, inner, (err) => {
            return err ? console.log(err) : console.log("file created successfully ");
        });
    }
    
}

// עריכה של קובץ קיים ויצירה שלו במידה והוא לא קיים
const editFile = (filePath,innerValue)=>{
    fs.appendFile(filePath,innerValue,(err)=>{
        return err?console.log(err):console.log("file created successfully ");
    })
}

const readFile = (filePath)=>{
    fs.readFile(filePath,(error, data) => {
            return error?console.log(error):console.log(data.toString());
        })
}

const readFolder = (folder)=>{
    if(fs.existsSync(folder)){
        if(fs.statSync(folder).isDirectory()){
            return fs.readdirSync(folder)
        } else {
            throw " error: it is not a directory"
        }
    } else {throw "error :folder not fund"}
}
// console.log(readFolder("./root/a"));

const deleteFF = (ff,bool)=>{
    if(fs.existsSync(ff)){
        if(fs.statSync(ff).isDirectory()){
            fs.rmdirSync(ff)
            return `Directory seccsusfully deleted`
        }
        else{
            fs.unlinkSync(ff)
            throw `file seccsusfully deleted`

        }
    }

    else {throw "error :file/folder not fund"}
}
// crateFile ("../root/a/test.txt3","bla bla")
// console.log(deleteFF("./root/b"));

const claerFolder = (folder)=>{
    fs.readdirSync(folder).forEach(v=>fs.unlinkSync(folder+"/"+v))  
}
const renameFile = (from,to)=>{
    fs.renameSync(from,to)
}
const checkIfEmpty = (folder)=>{
    const a =readFolder(folder)
    return a.length?true:false
}



// console.log(claerFolder("./root/a"));
module.exports = {checkIfEmpty,renameFile,crateFolder,crateFile,editFile,readFile,readFolder,deleteFF,claerFolder}