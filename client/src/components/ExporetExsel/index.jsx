import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../context';
import styles from './style.module.css'

const ExporetExsel = ({ studentsNums,arrName ,headers,orderBy}) => {
    const { tableData } = useContext(DataContext);
    const [fileName, setFileName] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
   
    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/files/exportexsle', {
                data:tableData[arrName].map((v,i)=>{return arrName==="students"?{...v,num:studentsNums[i]}:{...v}}),
                headers:headers,
                orderBy:orderBy
            }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            setDisplayForm(false)
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
            <button className={styles.displayBtu} onClick={() => setDisplayForm(!displayForm)}>
                יצא לאקסל
            </button>
            {displayForm && (
                <form onSubmit={handleDownload} className={`center ${styles.form}`}>
                    <input type="text" placeholder="שם קובץ" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                    <button type='submit'>הורדה</button>
                </form>
            )}
        </>
    );
};

export default ExporetExsel;
