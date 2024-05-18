import styles from './style.module.css'
import { DataContext } from '../../context'
import { useContext } from 'react'
import data from '../../data/dataArrays'

function PageHeader({ pageName, actionType, style = {}, ...props }) {
    const {currentAction} = useContext(DataContext)
    const action = data.actionTypes.find(v => v.actionType == actionType);

    return (
        <>
            <div className={`center ${styles.header}`} style={style} {...props}>
                <h2 > {pageName}</h2>
                <h3 className={styles.actionType} style={{color: action?.color }}> {action?.nameHebrew}</h3>
                <div className='center' >
                    <h4 >שם פעילות : {currentAction.name}</h4>
                        <h4>מרכז אחראי : {currentAction.orderSource}</h4>
                    </div>
                </div>

        </>
    )
}

export default PageHeader