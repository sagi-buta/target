import React, { useContext } from "react";
import styles from "./style.module.css";
import EditComp from "../EditComp";
import { DataContext } from "../../context";
import getFile from "../../functions/getFile";
import apiCalls from "../../functions/apiCalls";
import sort from "../../functions/sort";
import dates from "../../functions/dates";

const TableTasks = ({ setArrTasks, displayColumnsArray = [], clasN }) => {
  const context = useContext(DataContext);



  //? done task function
  //----------------------------------------------------------------
  const donefun = (e, val) => {
    let isDoneUpdate = { isDone: val.isDone == true ? false : true };
    apiCalls.put
      (`/actions/updateall/${context.currentAction._id}/tasks/${val._id}`, isDoneUpdate)
      .then((res) => { return setArrTasks(sort.isDoneSort(res.array)) })
      .catch(err =>context.setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
  }

  //delete 
  //----------------------------------------------------------------
  const deleteV = async (val, e) => {
    e.stopPropagation()

    const resoult = await apiCalls.Delete(`/actions/remove/${context.currentAction._id}/tasks/${val._id}`)
      .then((res) => { return setArrTasks(sort.isDoneSort(res.array)) })
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
          {context.tableData.tasks && context.tableData.tasks.map((val, i) => {
            return <tr key={i}>
              <td>{i + 1}</td>
              <td> <input onChange={(e) => donefun(e, val)} checked={val.isDone ? true : false} type='checkbox' ></input></td>
              <td>{val.name}</td>
              <td>{val.details}</td>
              <td>{val.department}</td>
              <td>{val.responsibility?.name?val.responsibility?.name:"(עריכה)הוסף גורם אחראי"}</td>
              <td>{dates.getDate(val.deadline)}</td>
              <td  >{<EditComp val={val} />}</td>
              <td onClick={(e) => deleteV (val, e)} >🗑️</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTasks;
