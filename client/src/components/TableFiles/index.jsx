import React, { useContext } from "react";
import styles from "./style.module.css";
import EditComp from "../EditComp";
import { DataContext } from "../../context";
import getFile from "../../functions/getFile";
import apiCalls from "../../functions/apiCalls";
import dates from "../../functions/dates";


const TableFiles = ({ setArrFiles, displayColumnsArray = [], clasN }) => {
  const context = useContext(DataContext);
  //download file function
  //----------------------------------------------------------------
  const downFile = async (e, val) => {
    e.stopPropagation()
    let url = val.filePath
    await getFile.getFile(`https://target-pedagogy.com/#/files/one/?id=${context.currentAction._id}&dir=${url}`,context.setPopUp)
      .then(res => {
        e.target.href = res.fileUrl
        return e.target.download = val.fileName
      })
      .catch(err =>context.setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
  }

  //delete file
  //----------------------------------------------------------------
  const deleteFile = async (val, e) => {
    e.stopPropagation()
    //http://localhost:7777/files/?id=action._id&fileid=file._id&dir=action._id/ "files" || "finFiles" /file name
    await apiCalls.Delete(`/files/?id=${context.currentAction._id}&fileid=${val._id}&dir=${val.filePath}`)
      .then((res) => {return setArrFiles(res.array?res.array:[]);})
      // .then(res => context.setTableData(res.array))//לא מרנדר
      .catch(err =>context.setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
 }



  return (
    <div className={`center ${styles.tableContainer}`}>
      <table className={`${styles.tableSelf} ${clasN}`}>
        <thead>
          <tr>
            {displayColumnsArray.map(val => {
              return <td key={val}>{val}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {context.tableData?.files?.map((val, i) => {
            return <tr key={i}>
              <td>{i + 1}</td>
            <td><a onClick={(e) => downFile(e, val)}>{val.fileName}</a></td> 
              <td>{val.fileType}</td>
              <td>{val.createdDate}</td>
              <td  >{<EditComp val={val} />}</td>
              <td onClick={(e) => deleteFile(val, e)} >🗑️</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableFiles;
