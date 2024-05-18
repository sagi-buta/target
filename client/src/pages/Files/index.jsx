import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './style.module.css'
import { DataContext } from '../../context';
import TableFiles from '../../components/TableFiles';
import PageHeader from '../../components/PageHeader';
import apiCalls from '../../functions/apiCalls'
import CurrentAction from "../../components/CurrentAction";
import Uploud from '../../components/Uploud';
import PageButtons from '../../components/PageButtons';
import { Log } from 'victory';

const Files = () => {
    const params = useParams()
    const context = useContext(DataContext)
    const [typeFiles, setTypeFiles] = useState("files")
    const [arrFiles, setArrFiles] = useState([])

    //----------------------------------------------------------------   
    const getfiles = () => {
        apiCalls.get(`/files/?id=${params.actionId}&dir=${params.actionId}/${typeFiles}`)
            .then((res) => context.setTableData((prev) => { return { ...prev, files: res.filesInfo } }))
            .catch(err =>context.setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
    }
    useEffect(getfiles, [typeFiles])

    //----------------------------------------------------------------
    useEffect(() =>
        context.setTableData((prev) => { return { ...prev, files: arrFiles } })
        , [arrFiles])

    //----------------------------------------------------------------
    const submit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const newName = { fileName: String(e.target.rename.value) }
        apiCalls.put
            (`/files/rename/?id=${params.actionId}&fileid=${context.idToEdit._id}&dir=${context.idToEdit.filePath}`, newName)
            .then((res) =>{
                setArrFiles(res.filesInfo.array)
            })
            .catch(err =>context.setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
        context.setPopUp(null)
    }

    let formForpopUp =
        <form className={`center formToPopUp`} onSubmit={submit}>
            <p>שנה שם</p>
            <input type="text" name='rename' defaultValue={context.idToEdit?.fileName} />
            <br />
            <button id={"submitBtu"} type='submit'>שמור</button>
        </form>

    useEffect(() => { context.idToEdit?.fileName && context.setPopUp(formForpopUp) }, [context.idToEdit])

    //----------------------------------------------------------------   
    //  drop files to browser
    const handleAddition = () => context.setPopUp(<Uploud typeFiles={typeFiles} setArrFiles={setArrFiles} />)

    return (
        <div className={`center ${styles.hiro}`}>
            <CurrentAction />
            <PageHeader pageName={"קבצים"} actionType={context.currentAction.actionType} />

            {typeFiles == "finFiles" ?<h3>קבצים פיננסים</h3>:""}

            <PageButtons buttons={[
                <button key={1} onClick={handleAddition} >🗃️</button>,
                context.activUser.role == 'admin' &&  <button key={2} onClick={() => setTypeFiles(prev=>prev=="files"?"finFiles":"files")} >📋</button>

            ]}/>
            <TableFiles
                setArrFiles={setArrFiles}
                displayColumnsArray={["מס'", "שם", "סוג", "תאריך יצירה", "שינוי שם", "מחק קובץ"]}
            />
        </div>
    );
}

export default Files;
