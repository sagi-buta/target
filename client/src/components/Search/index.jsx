import  { useState, useEffect, useContext } from "react"
import styles from './style.module.css'
import { DataContext } from "../../context"
const Search = ({filterBy,searchIn,placeholder,defaultVal,setData}) => {
    const {allData,tableData} = useContext(DataContext);
    const [inputValue, setInputValue] = useState("");
    const [filterData, setFilterData] = useState([])
    const dataToDisplay =searchIn!=="lecturer"? allData[searchIn]: allData.admins?.map(v=>v.name)
    useEffect(()=>{
        setInputValue(defaultVal)
    },[])
    const setFun = (v)=>{
        const curentLecturer = allData.admins.find(val=>val.name==v)
        const curentActionName = allData.actionsNames.find(val=>val==v)
        const curentStudent = tableData.allStudents.filter(val=>
            filterBy=="city"?val.city.includes(v):
            filterBy=="name"?val.name.includes(v):
            filterBy=="personalId"?val.personalId.includes(v):
            val
        )
        searchIn=="lecturer"?
        setData( prev=>{return {...prev,[searchIn]:curentLecturer?curentLecturer._id:null}})
        :
        searchIn=="actionsNames"?
        setData( prev=>{return {...prev,[searchIn]:curentActionName?curentActionName:null}})
        :
        searchIn=="allStudents"?
        setData(curentStudent.length?curentStudent:tableData[searchIn])
        :
        setData( prev=>{return {...prev,[searchIn]:v}})
    }
    const inputChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        setFun(value)
        searchIn!== "allStudents"&& setFilterData(value.length > 1 ? dataToDisplay.filter(v => v.includes(value)):[])
    }
    const handleClick = (e,v) => {
        setFilterData([])
        setInputValue(v)
        setFun(v)
    }
    return (
        <div className={styles.searchDiv}>
            <input placeholder={placeholder} value={inputValue} className={styles.input} onChange={inputChange} type="text" />
            {filterData.length > 0 &&
            <div className={`center ${styles.optionsList}`}>
                {filterData.map((v,i)=>{
                    return <button key={i} onClick={(e)=>handleClick(e,v)}>{v}</button>
                })}
            </div>}
        </div>
    );
}

export default Search;
