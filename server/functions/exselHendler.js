const fs = require('fs');
const XLSX = require('xlsx');


const readFileXlsx = (path)=>{
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];   
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return data;
}

const WriteBuferFromJson = (data, headers,ordreBy) =>{
  const newData = data.map(obj => {
    return ordreBy.map(key => obj[key]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet([
    headers, 
    ...newData
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  const excelData = XLSX.write(workbook, {
    bookType: 'xlsx', 
    bookSST: false, 
    type: 'binary',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  return Buffer.from(excelData, 'binary');
  }



module.exports = {WriteBuferFromJson,readFileXlsx}

