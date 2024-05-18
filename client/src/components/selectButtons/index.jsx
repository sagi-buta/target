import { useEffect, useState } from "react";
import styles from './style.module.css'


export default function SelectButtons({keyss,setData, current,options, isSingleChoice, classN }) {
    useEffect(()=>{
        setSelected( current? current:[])
    },[])
    const [type, setType] = useState(keyss);
    const [selected, setSelected] = useState([]);
    const handleClick = (v) => {
        setSelected(
            selected.includes(v) ?
                selected.filter(s => s != v):(isSingleChoice ? [v] : [...selected, v]))
    }
    useEffect(()=>{
        type==="status"? setData( prev=>{return {...prev,[type]:{...prev[type],[type]:selected.join()}}}):
        type==="studyFormat"? setData( prev=>{return {...prev,[type]:{...prev[type],format:selected.join()}}}):
        type==="locationType"? setData( prev=>{return {...prev,[type]:{...prev[type],type:selected.join()}}}):
        setData( prev=>{return !isSingleChoice?{...prev,[type]:selected}:{...prev,[type]:selected.join()}})
    },[selected])

    return (
        <>
            {options.map(v => {
                return <button className={`${selected.includes(v.value) ? styles.activee : "" } ${styles.select} ${classN}`} key={v.value}
                    onClick={() => handleClick(v.value)} > {v.text} </button>
            })
            }
        </>
    )
}