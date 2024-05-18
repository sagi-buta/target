const getHouer = (data)=>{
    const a = new Date(data).getHours().toString()
    return a
}
const getMinute = (data)=>{
    const a = new Date(data).getMinutes().toString().padStart(2,0)
    return a
}

export default {getHouer , getMinute}