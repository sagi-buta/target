import React, { useContext, useEffect, useState } from 'react'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryPie } from 'victory';
import styles from './style.module.css'
import { DataContext } from '../../context';
import apiCalls from '../../functions/apiCalls';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import styles from './style.module.css'; // הכנס את השמות הכלליים של הקלאסים שיצרת

export default function GraphAp() {

    const context = useContext(DataContext)//👌

    const nowDate = new Date()
    const zone = { timeZone: 'Asia/Jerusalem' }
    const iLZoneDate = new Date(nowDate.toLocaleString('en-US', zone))//set date to iLzone
    const Day = iLZoneDate.getDate()

    const settings = {
        initialSlide: 0,
        speed: 1200,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
    };

    const [pieData, setPieData] = useState([])
    const [pieClass, setPieClass] = useState([])
    const [GpieClass, setGPieClass] = useState([])
    const [today, setToday] = useState([])
    const [week, setWeek] = useState([])

    useEffect(() => {
        apiCalls.get('/actions/week/tasks/deadline/false/w/w/w')
            .then(res => weekFun(res.array))
            .catch(err => context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response.status}</h4>
                    <p>הודעה: {err.response.data.msg}</p>
                </div>
            ))
    }, [context.tasks])

    const getActions = () => {
        apiCalls.get(`/actions/all/actions/tasksNoConvert`)//get all actions activated
            .then(res => selectedTasks(res))
            .catch(err => context.setPopUp(
                <div>
                    <h4>שגיאה: {err.response.status}</h4>
                    <p>הודעה: {err.response.data.msg}</p>
                </div>
            ))

    }
    useEffect(getActions, [context.tasks])


    const weekFun = (tasks) => {
        let weekNum = tasks.length
        let weekDone = []
        let weekNotDone = []
        tasks.forEach(task => task.isDone ? weekDone.push(task) : weekNotDone.push(task))
        let weekPedagogue = []
        let weekAdmini = []
        weekDone.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? weekAdmini.push(task) : weekPedagogue.push(task))
        let NweekPedagogue = []
        let NweekAdmini = []
        weekNotDone.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? NweekAdmini.push(task) : NweekPedagogue.push(task))

        let weekPedagoguePercent = Math.round((weekPedagogue.length / weekNum) * 100)
        let weekAdminiPercent = Math.round((weekAdmini.length / weekNum) * 100)
        let NweekPedagoguePercent = Math.round((NweekPedagogue.length / weekNum) * 100)
        let NweekAdminiPercent = Math.round((NweekAdmini.length / weekNum) * 100)
        setWeek([
            {
                x: `${weekPedagogue.length} 
                        פד' ✅`,
                y: weekPedagoguePercent
            },
            {
                x: `${weekAdmini.length}
                       אד' ✅`,
                y: weekAdminiPercent
            },
            {
                x: `${NweekPedagogue.length}
                        פד' ❌`,
                y: NweekPedagoguePercent
            },
            {
                x: `${NweekAdmini.length}
                        אד' ❌`,

                y: NweekAdminiPercent
            },
        ])
    }

    let allTasks = []
    let doneTasks = []
    let notDoneTasks = []
    let pedagogue = []
    let admini = []
    let Npedagogue = []
    let Nadmini = []

    function selectedTasks(res) {
        allTasks = res
        doneTasks = []
        notDoneTasks = []
        pedagogue = []
        admini = []
        pedagogue = []
        admini = []
        Npedagogue = []
        Nadmini = []
        console.log('ress', res, allTasks);

        res.forEach((task) => task.isDone ? doneTasks.push(task) : notDoneTasks.push(task))


        let all = doneTasks.length + notDoneTasks.length
        let donePercent = Math.round((doneTasks.length / allTasks.length) * 100)
        let notDonePercent = Math.round((notDoneTasks.length / allTasks.length) * 100)

        doneTasks.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? admini.push(task) : pedagogue.push(task))

        notDoneTasks.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? Nadmini.push(task) : Npedagogue.push(task))

        let pedagoguePercent = Math.round((pedagogue.length / doneTasks.length) * 100)
        let adminiPercent = Math.round((admini.length / doneTasks.length) * 100)

        let pedagoguePercentALL = Math.round((pedagogue.length / allTasks.length) * 100)
        let adminiPercentALL = Math.round((admini.length / allTasks.length) * 100)

        let NpedagoguePercent = Math.round((Npedagogue.length / allTasks.length) * 100)
        let NadminiPercent = Math.round((Nadmini.length / allTasks.length) * 100)


        setPieData([
            { name: `${donePercent}%`, בוצעו: doneTasks.length },
            { name: `${notDonePercent}%`, לביצוע: notDoneTasks.length },
        ])
        setPieClass([
            {
                x: `${pedagogue.length} 
                    פד' ✅`,
                y: pedagoguePercentALL
            },
            {
                x: `${admini.length}
                   אד' ✅`,
                y: adminiPercentALL
            },
            {
                x: `${Npedagogue.length}
                    פד' ❌`,
                y: NpedagoguePercent
            },
            {
                x: `${Nadmini.length}
                    אד' ❌`,

                y: NadminiPercent
            },
        ])
        setGPieClass([
            { name: 'pבוצעו', pבוצעו: pedagoguePercentALL },
            { name: 'pלא בוצעו', pלביצוע: adminiPercentALL },
            { name: 'Aבוצעו', Aבוצעו: NpedagoguePercent },
            { name: 'Aלא בוצעו', Aלביצוע: NadminiPercent },

        ])


        let TODAY = []
        TODAY = allTasks.filter((task) => new Date(task.deadline).getDate() == Day)
        let todayDone = []
        let todayNotDone = []
        TODAY.forEach((task) => task.isDone ? todayDone.push(task) : todayNotDone.push(task))
        let todayNotDonePercent = Math.round((todayNotDone.length / TODAY.length) * 100)
        let todayDonePercent = Math.round((todayDone.length / TODAY.length) * 100)

        let dayPedagogue = []
        let dayAdmini = []
        let NdayPedagogue = []
        let NdayAdmini = []
        todayDone.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? dayAdmini.push(task) : dayPedagogue.push(task))
        todayNotDone.forEach((task) => task.department === "מחלקת אדמיניסטרציה" ? NdayAdmini.push(task) : NdayPedagogue.push(task))
        //  TODAY.forEach((task)=>task.department === "מחלקת אדמיניסטרציה"&& task.isDone?)
        let dayPedagoguePercent = Math.round((dayPedagogue.length / TODAY.length) * 100)
        let dayAdminiPercent = Math.round((dayAdmini.length / TODAY.length) * 100)
        let NdayPedagoguePercent = Math.round((NdayPedagogue.length / TODAY.length) * 100)
        let NdayAdminiPercent = Math.round((NdayAdmini.length / TODAY.length) * 100)

        setToday([
            {
                x: `${dayPedagogue.length} 
                        פד' ✅`,
                y: dayPedagoguePercent
            },
            {
                x: `${dayAdmini.length}
                       אד' ✅`,
                y: dayAdminiPercent
            },
            {
                x: `${NdayPedagogue.length}
                        פד' ❌`,
                y: NdayPedagoguePercent
            },
            {
                x: `${NdayAdmini.length}
                        אד' ❌`,

                y: NdayAdminiPercent
            },
        ]
        )

    }
    console.log(pieData, today);
    const tickLabelStyle = {
        fontSize: 12,
    };

    return (
        <>

            <div className={styles['carousel-container']}>

                <Slider
                    {...settings}>


                    <div className={styles.carouselitem} >

                        {/* <div className={styles.msg} style={{  }} >  */}

                        {/* <div className={styles.msgheader}>
                            <p>{''}</p>
                        </div>

                        <h3>{''}</h3>

                        <div className={styles.msgcontent}>
                            {''}
                        </div> */}


                        <div className={styles.hiro}>

                            <div className={`center ${styles.info}`}>

                                <div>
                                    <ul>
                                        <h5>כל המשימות:</h5>
                                        <li><div id={styles.allDone} className={styles.colorInfo}></div>בוצעו</li>
                                        <li><div id={styles.allNotDone} className={styles.colorInfo}></div>לא בוצעו</li>
                                    </ul>

                                </div>

                                <div>
                                    <ul>
                                        <h5>כל המשימות פר מחלקה</h5>
                                        <li><div id={styles.doneP} className={styles.colorInfo}></div>בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.doneA} className={styles.colorInfo}></div>בוצעו מח' אדמיניסטרציה</li>
                                        <li><div id={styles.notDoneP} className={styles.colorInfo}></div>לא בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.notDoneA} className={styles.colorInfo}></div>לא בוצעו מח' אדמיניסטרציה</li>
                                    </ul>
                                </div>

                                <div>
                                    <ul>
                                        <h5>משימות שבוע-קרוב פר מחלקה</h5>
                                        <li><div id={styles.doneP} className={styles.colorInfo}></div>בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.doneA} className={styles.colorInfo}></div>בוצעו מח' אדמיניסטרציה</li>
                                        <li><div id={styles.notDoneP} className={styles.colorInfo}></div>לא בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.notDoneA} className={styles.colorInfo}></div>לא בוצעו מח' אדמיניסטרציה</li>
                                    </ul>
                                </div>

                                <div>
                                    <ul>
                                        <h5>משימות היום פר מחלקה</h5>
                                        <li><div id={styles.doneP} className={styles.colorInfo}></div>בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.doneA} className={styles.colorInfo}></div>בוצעו מח' אדמיניסטרציה</li>
                                        <li><div id={styles.notDoneP} className={styles.colorInfo}></div>לא בוצעו מח' פדגוגיה</li>
                                        <li><div id={styles.notDoneA} className={styles.colorInfo}></div>לא בוצעו מח' אדמיניסטרציה</li>
                                    </ul>
                                </div>



                            </div>

                            <div className={`center ${styles.allGraph}`} >

                                {/* {pieData.length > 0 && <div><VictoryPie
                                data={pieData}
                                width={200}
                                height={100}
                                colorScale={['#8aff5c', '#ff8b5c', '#ffbe5c', '#5cc2ff', '#ff5ccb']}
                                innerRadius={66}
                                labels={({ datum }) =>
                                    `${datum.x}
                                     ${datum.y}%`}
                                labelRadius={40}
                                style={{
                                    labels: { fontSize: 10, fill: 'black' },
                                    data: { strokeWidth: 0.8, stroke: 'white' }
                                }}
                            /></div>
                            } */}

                                {/* {pieData.length > 0 ? <BarChart width={110} height={120} data={pieData} margin={{ right: 30, left: 30, }}> */}
                                    {pieData.length > 0 && typeof pieData[0].בוצעו == 'number' ? <BarChart width={110} height={120} data={pieData} margin={{ right: 30, left: 30, }}>

                                    <CartesianGrid stroke="white" />
                                    {/* <XAxis dataKey="name"  /> */}
                                    <XAxis dataKey="name" fontSize={13} />
                                    {/* <YAxis/> */}
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Bar dataKey="בוצעו" barSize={15} fill="green" />
                                    <Bar dataKey="לביצוע" barSize={15} fill="red" />
                                    {/* <Legend verticalAlign="top" height={36} /> */}
                                </BarChart> : <h3>אין משימות</h3>}



                                {
                                    (pieClass.length > 0) && <>
                                        {(!isFinite(pieClass[0].y)) || (!isFinite(pieClass[1].y)) || (!isFinite(pieClass[2].y)) || (!isFinite(pieClass[3].y))
                                            ? <h3>אין משימות</h3>
                                            : <div><VictoryPie
                                                data={pieClass}
                                                width={200}
                                                height={100}
                                                colorScale={['#76C6D1', '#FEC130', '#76c6d16a', ' #fec03060']}
                                                innerRadius={66}
                                                labels={({ datum }) =>
                                                    `${datum.y}%`}
                                                labelRadius={40}
                                                style={{
                                                    labels: { fontSize: 10, fill: 'black' },
                                                    data: { strokeWidth: 0.8, stroke: 'white' }
                                                }}
                                                events={[
                                                    {
                                                        target: 'data',
                                                        eventHandlers: {
                                                            onMouseOver: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: ({ datum }) => {
                                                                            return { text: `${datum.x}` };
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                            onMouseOut: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: () => {
                                                                            return {};
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                        },
                                                    },
                                                ]}

                                            />

                                            </div>}
                                    </>
                                }



                                {week.length > 0 && <>
                                    {
                                        (!isFinite(week[0].y)) || (!isFinite(week[1].y)) || (!isFinite(week[2].y)) || (!isFinite(week[3].y))
                                            ? <h3>אין משימות</h3>
                                            :
                                            < div > <VictoryPie
                                                data={week}
                                                width={200}
                                                height={100}
                                                // Tooltip={true}
                                                colorScale={['#76C6D1', '#FEC130', '#76c6d16a', '#fec03060']}
                                                innerRadius={66}
                                                labels={({ datum }) =>
                                                    `${datum.y}%`}
                                                labelRadius={40}
                                                style={{
                                                    labels: { fontSize: 10, fill: 'black' },
                                                    data: { strokeWidth: 0.8, stroke: 'white' }
                                                }}
                                                events={[
                                                    {
                                                        target: 'data',
                                                        eventHandlers: {
                                                            onMouseOver: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: ({ datum }) => {
                                                                            return { text: `${datum.x}` };
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                            onMouseOut: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: () => {
                                                                            return {};
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                        },
                                                    },
                                                ]}

                                            />
                                            </div>}
                                </>}



                                {today.length > 0 && <>
                                    {
                                        ((!isFinite(today[0].y)) || (!isFinite(today[1].y)) || (!isFinite(today[2].y)) || (!isFinite(today[3].y)))
                                            ? <h3>אין משימות</h3>
                                            : <div><VictoryPie
                                                data={today}
                                                width={200}
                                                height={100}
                                                colorScale={['#76C6D1', '#FEC130', '#76c6d16a', '#fec03060']}
                                                innerRadius={66}
                                                labels={({ datum }) =>
                                                    `${datum.y}%`}
                                                labelRadius={40}
                                                style={{
                                                    labels: { fontSize: 10, fill: 'black' },
                                                    data: { strokeWidth: 0.8, stroke: 'white' }
                                                }}

                                                events={[
                                                    {
                                                        target: 'data',
                                                        eventHandlers: {
                                                            onMouseOver: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: ({ datum }) => {
                                                                            return { text: `${datum.x}` };
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                            onMouseOut: () => {
                                                                return [
                                                                    {
                                                                        target: 'labels',
                                                                        mutation: () => {
                                                                            return {};
                                                                        },
                                                                    },
                                                                ];
                                                            },
                                                        },
                                                    },
                                                ]}

                                            />
                                            </div>}
                                </>}


                            </div>


                        </div>


                    </div>


                </Slider >


            </div >
        </>
    )
}




















































