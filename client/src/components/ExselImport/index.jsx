import React, {useContext, useEffect, useState } from 'react';
import apiCalls from '../../functions/apiCalls';
import styles from './style.module.css'
import { DataContext } from '../../context';

const ExselImport = ({objectKeys,actinId,setDisplay}) => {
  const [file, setFile] = useState();
  const [displayBtu, setDisplayBtu] = useState(false);
  const {setPopUp} = useContext(DataContext);


  const getDataFromFile = (e)=>{
      e.preventDefault();
      const validFile =file.name.split(".")[1] ==="xlsx" ||file.name.split(".")[1] ==="XSLX"
      if (validFile){
          let fileData = new FormData()
          fileData.append("file",file)
          fileData.append("objectKeys",JSON.stringify(objectKeys))
          apiCalls.post(`/files/importexsle/${actinId}`,fileData)
          .then(response => {
            setDisplay(prev=>!prev)
            setDisplayBtu(false)
          })
          .catch(err =>setPopUp(
            <div>
              <h4>שגיאה: {err.response.status}</h4>
              <p>הודעה: {err.response.data.msg}</p>
          </div>
          ))
        }
        else{setPopUp("ניתן ליבא מקובץ אקסל בלבד אנא החלף קובץ ונסה שנית")}
      }


    return (
        <>
  <button key={3} className={styles.displayBtu} onClick={() => setDisplayBtu(!displayBtu)}>
    יבא מאקסל
  </button>
  {displayBtu && (
    <form className={styles.form} onSubmit={getDataFromFile}>
      <label htmlFor="fileInput" className={styles.customFileUpload}>
        בחר קובץ
      </label>
      <input
        type="file"
        id="fileInput"
        required={true}
        onChange={e => setFile(e.target.files[0])}
        className={styles.hiddenInput}
      />
      <button className={styles.importBtu} type="submit">
        יבא
      </button>
    </form>
  )}
</>
    );
}

export default ExselImport;
