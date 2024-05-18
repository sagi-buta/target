import React from 'react'
import styles from './style.module.css'

// props : name , placeholder , defaultValue , onchange , type
// creator: elad mizrchi

export default function InputText({  style = {}, type, type2 , inputType, placeholder,defaultValue,setData }) {
        
        const inputChance = (e)=>{

            type==="lecturer"?"":
            setData(prev=>{
                return (
                    type==="contactInfo"?
                    {...prev,[type]:{...prev[type],[type2]:e.target.value}}:
                    type==="status"||type==="studyFormat"||type==="locationType"?
                    {...prev,[type]:{...prev[type],note:e.target.value}}:
                    {...prev,[type]:e.target.value}
                )
            })
        }
    return (
        <input className={styles.name} style={style} type={inputType}
            defaultValue={defaultValue} placeholder={placeholder}
            onChange={inputChance} />
    )
}
