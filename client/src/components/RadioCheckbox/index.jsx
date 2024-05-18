import React, { useContext, useState } from 'react';
import styles from './style.module.css';
import axios from 'axios';
import apiCalls from '../../functions/apiCalls';
import dates from '../../functions/dates';
import { DataContext } from '../../context';


const RadioCheckbox = ({ task, task_id, action, setFiltersA}) => {
const context =useContext(DataContext)

  const [isChecked, setIsChecked] = useState(task.isDone);


  {/* to do add function that updates the server with the new task status */ }
  // Function to update the server with the new task status

  const updateTaskStatus = async (task_id, status) => {

    const url = `/actions/updateall/${action._id}/tasks/${task._id}`;
    const headers = {
      Authorization: 'Bearer yourAuthToken',
    };

    // Send the PUT request to update the task status on the server
    await apiCalls
      .put(url, { isDone: status })
      // .put(url, { isDone: status }, { headers })
      .then((response) => {
        return context.setTasks(response.array)
      })
      .catch(err =>context.setPopUp(
        <div>
          <h4>שגיאה: {err.response.status}</h4>
          <p>הודעה: {err.response.data.msg}</p>
      </div>
      ))
  };


  const handleChange = () => {
    // Toggle the checkbox state
    setIsChecked((prevChecked) => !prevChecked);

    // Call the updateTaskStatus function to update the server with the new task status
    updateTaskStatus(task_id, !isChecked);

  };


  return (
    <>

      {<label>
        {/* <input type="checkbox" className={styles.circularCheckbox} checked={isChecked} onChange={handleChange} /> */}
        <div className={task.isDone ? styles.checked : styles.notChecked}>
          <div className={styles.showDate}>
            <input type="checkbox" className={styles.circularCheckbox} checked={task.isDone} onChange={handleChange} />
            <div className={styles.showDate}>
              {task.name}
              <div > {dates.getDate(task.deadline)}</div>
            </div>
            <div className={styles.hideDate}>{task.responsibility?.name?task.responsibility?.name:" גורם לא צוין"}</div> 
          </div>

          <div className={styles.hideDate}>
            ◂{task.details}
          </div>


        </div>



      </label>}
    </>
  );
};

export default RadioCheckbox;
