import React from 'react'

//create :avinoam   

function generateHours() {
    const intervals = [];
    const startHour = 0;
    const endHour = 23;
    const intervalMinutes = 15;

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const time = `${formattedHour}:${formattedMinute}`;
            intervals.push(time);
        }
    }

    return intervals;
}

export default generateHours  