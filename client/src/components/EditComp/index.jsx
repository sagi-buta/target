import React, { useContext, useEffect } from 'react';
import styles from './style.module.css'
import { AiFillEdit } from 'react-icons/ai'
import { DataContext } from '../../context';
const EditComp = ({ val }) => {
    const { setIdToEdit } = useContext(DataContext);
    return (
        <button className={styles.editBtu} onClick={() => { setIdToEdit({...val}) }}><AiFillEdit /></button>
    );
}

export default EditComp;
