import React from 'react'
import { useState, useEffect, useContext } from 'react'
import apiCalls from '../../functions/apiCalls'
import styles from './style.module.css'
import { DataContext } from '../../context';



export default function Uploud({ typeFiles, setArrFiles, style }) {

    const context = useContext(DataContext)
    const [file, setFile] = useState()
    let dir = context.currentAction._id + '/' + typeFiles

    async function onsubmit(e) {
        const upfile = e.target.files[0];
        e.preventDefault()
        e.stopPropagation()
        await handleFile(upfile)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation()
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        const upfile = e.dataTransfer.files[0];
        await handleFile(upfile)
    }

    const handleFile = async (upfile) => {

        const fileData = new FormData()
        fileData.append('upfile', upfile)
        try {
            const result = await apiCalls.post(`files/upload/?id=${context.currentAction._id}&dir=${dir}`, fileData)
            console.log('up', result);
            setArrFiles(result.filesInfo)

        } catch (error) {
            context.setPopUp("Uploud שגיאה")
        }
        context.setPopUp(null)
    }

    return (
        <>
            <div className={`center ${styles.name}`} style={style} onDrop={handleDrop} onDragOver={handleDragOver}>

                <div  >
                    <h3>גרור קבצים לכאן</h3>
                    <p>או</p>
                </div>

                <label className={styles.file}>בחר/י קובץ
                    <input type='file' name='myfile' onChange={(e) => onsubmit(e)} style={{ display: "none" }}></input>
                </label>

            </div>
            {/* <form className={`${styles.form}`} onSubmit={onsubmit}>
                <input type='file' required={true} onChange={e => setFile(e.target.files[0])} />
                <button className={`haedBtu`} type='submit'>⏫</button>
            </form> */}
        </>
    )
}
