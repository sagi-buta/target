import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './style.module.css'; // הכנס את השמות הכלליים של הקלאסים שיצרת
import { DataContext } from '../../context'
import dates from '../../functions/dates'
import apiCalls from '../../functions/apiCalls'


function MessageBoard() {

    const context = useContext(DataContext)

    const [adsData, setAdsData] = useState();

    // const [newAd, setNewAd] = useState({ title: '', date: '', content: '', backgroundColor: '' });

    const settings = {
        initialSlide: 0,
        infinite: false,
        // infinite: true,
        speed: 1200,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        slide: 'index'
       
    };

   

    const editStateAd = (msg, use) => {
        setAdsData(prev => [...prev, msg])
    }
    let nosorted = []
    let sorted = []
    useEffect(() => {
        // טען את מערך המודעות
        apiCalls.get('/data/title/messages')
            .then((res) => {
                return setAdsData(
                    res.data.sort((a, b) => { return new Date(dates.normalDate(a.date)) - new Date(dates.normalDate(b.date)) })
                    ) })
                    .catch(err =>context.setPopUp(
                        <div>
                          <h4>שגיאה: {err.response.status}</h4>
                          <p>הודעה: {err.response.data.msg}</p>
                      </div>
                      ))
    }, []);

    const deleteAd = (e, ad, index) => {
        // מחק את המודעה לפי האינדקס
        e.stopPropagation()
        e.preventDefault()

        let updatedArr = [...adsData]
        updatedArr.splice(index, 1)
        let objForserver = { data: updatedArr }

        apiCalls.put(`/data/title/messages`, objForserver)
            .then(res => {
                setAdsData(
                    res.data.sort((a, b) => { return new Date(dates.normalDate(a.date)) - new Date(dates.normalDate(b.date)) }))
            })
            .catch(err =>context.setPopUp(
                <div>
                  <h4>שגיאה: {err.response.status}</h4>
                  <p>הודעה: {err.response.data.msg}</p>
              </div>
              ))
    };

    const addOrUpdatAd = (e, index, ad) => {
        e.preventDefault()
        e.stopPropagation()
        const newMsg = {
            title: e.target.title.value,
            date: e.target?.date ? e.target.date.value : dates.normalDate(String(new Date)),
            content: e.target.content.value,
            backgroundColor: e.target.backgroundColor.value
        }

        let updatedArr = [...adsData]
        let objForserver = {}

        if (e.target.date) {//עריכת מודעה
            console.log(index, adsData, updatedArr);
            updatedArr.splice(index, 1, newMsg)
            objForserver = { data: updatedArr }

            apiCalls.put(`/data/title/messages`, objForserver)
                .then(res => {
                    setAdsData(
                        res.data.sort((a, b) => { return new Date(dates.normalDate(a.date)) - new Date(dates.normalDate(b.date)) }))
                })
                .catch(err =>context.setPopUp(
                    <div>
                      <h4>שגיאה: {err.response.status}</h4>
                      <p>הודעה: {err.response.data.msg}</p>
                  </div>
                  ))
        }
        else {//הוספה
            updatedArr.push(newMsg)
            objForserver = { data: updatedArr }

            apiCalls.put(`/data/title/messages`, objForserver)
                .then(res => setAdsData(res.data.sort((a, b) => { return new Date(dates.normalDate(a.date)) - new Date(dates.normalDate(b.date)) })))
                .catch(err =>context.setPopUp(
                    <div>
                      <h4>שגיאה: {err.response.status}</h4>
                      <p>הודעה: {err.response.data.msg}</p>
                  </div>
                  ))
        }
        context.setPopUp(null)
    };

    function formPoup(e, ad, index) {
        context.setPopUp(form(e, ad, index))
    }

    function form(e, ad, index) {
        let form = < form className={'center formToPopUp'} onSubmit={(e) => addOrUpdatAd(e, index, ad)} >

            <lable>
                כותרת
            </lable>
            <input
                type="text"
                placeholder="כותרת"
                name='title'
                defaultValue={ad?.title}
            />
            {
                ad && <>
                    <label> תאריך</label>
                    <input type="date" defaultValue={dates.normalDate(ad.date)} name='date' />
                </>
            }
            <label>
                תוכן המודעה
            </label>
            <textarea
                type="text"
                placeholder="תוכן"
                name='content'
                defaultValue={ad?.content}
            />
            <label>
                בחירת צבע רקע המודעה
            </label>
            <div>
                <input
                    type="color"
                    placeholder="צבע רקע"
                    name='backgroundColor'
                    defaultValue={ad?.backgroundColor ? ad.backgroundColor : '#0059b3'}
                />
            </div>

            <div>
                <button type='submit'>שמור</button>
            </div>

        </form >
        return form
    }

    return (
        <>
            <div className={styles['carousel-container']}>

                <Slider className="slider"
                    {...settings}>
                    {adsData !== undefined && adsData.map((ad, index) => (

                        <div key={index} className={styles.carouselitem} >

                            <div className={styles.msg} style={{ backgroundColor: ad.backgroundColor }} >

                                <div className={styles.msgheader}>
                                    {/* <p>{dates.getDate(ad.date)}</p> */}
                                    <p>{dates.getDate(ad.date)}</p>
                                </div>

                                <h3>{ad.title}</h3>

                                <div className={styles.msgcontent}>
                                    {ad.content}
                                </div>

                                {context.activUser.role == 'admin' && <div className={styles.msgbtns} >
                                    <button onClick={(e) => deleteAd(e, ad, index)}>מחק מודעה</button>
                                    {/* <button onClick={() => editAd(index, ad)}>ערוך מודעה</button> */}
                                    <button onClick={(e) => formPoup(e, ad, index)}>ערוך מודעה</button>
                                </div>}

                            </div>

                        </div>

                    ))}
                </Slider>

            </div>
            {context.activUser.role == 'admin' && <div className={styles['add-ad-container']} >
                <button onClick={() => formPoup()}>+ הוספת מודעה</button>
            </div>}
        </>

    )
}

export default MessageBoard