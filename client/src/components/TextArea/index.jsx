import React from 'react';
import styles from './style.module.css'

const TextArea = ({ style = {}, type , placeholder,defaultValue,setData }) => {
    const TextAreaChance = (e)=>{
        setData(prev=>{
            return (
                type==="lecturer"?
                {...prev,[type]:{name:e.target.value}}:
                type==="status"||type==="studyFormat"||type==="locationType"?
                {...prev,[type]:{...prev[type],note:e.target.value}}:
                {...prev,[type]:e.target.value}
            )
        })
    }
    return (
        <textarea className={styles.textarea} style={style}
            defaultValue={defaultValue} placeholder={placeholder}
            onChange={TextAreaChance} />
    );
}

export default TextArea;
