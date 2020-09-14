// import HttpService from './HttpService'
import axios from 'axios';

// const url = process.env.NODE_ENV === 'production'
//     ? '/api/calendar'
//     : '//localhost:3030/api/calendar'

export default {
    getCalendar,
    getAvailbleDailySlots,
    update
}

const ACCOUNTID = '413361439'

async function getCalendar() {
    const res = await axios ({
        method: 'get',
        url: 'https://api.kloudless.com/v1/accounts?enabled=True',
        headers: {Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo"}
    })
    const calendar = res.data.objects[0]
    console.log(calendar)
    return calendar
}

async function getAvailbleDailySlots (startTime,endtTime,duration){ 
  const timeSlots = await axios({
    method: 'post',
    url: `https://api.kloudless.com/v1/accounts/${ACCOUNTID}/cal/availability`,
    headers: {Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo", 'Content-Type': 'application/json'},
    data: JSON.stringify( {
        "meeting_duration": `PT${duration}`,
            "time_windows": [
                {
                    "start": startTime,
                    "end": endtTime
                }
            ] 
    })
  })
  return timeSlots.data.time_windows
}

function update (startTime, endtTime, eventName, creatorName, creatorEmail){
    const url = `https://api.kloudless.com/v1/accounts/${ACCOUNTID}/cal/calendars/primary/events`
fetch(url, {
    method: 'post',
    headers: {Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo", 'Content-Type': 'application/json'}
,
body: JSON.stringify( 
    {
        "name": eventName,
        "start": startTime,
        "end": endtTime,
        "creator": {
            "name": creatorName,
            "email": creatorEmail
        }
    })
}).then(res=>res.json())
  .then(res => console.log(res));
}

// async function update (startTime, endtTime, eventName, creatorName, creatorEmail){
//   const updatedCalendar = await axios ({
//       maethod: 'post',
//       url: `https://api.kloudless.com/v1/accounts/${ACCOUNTID}/cal/calendars/primary/events`,
//       headers: {Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo", 'Content-Type': 'application/json'},
//       body: JSON.stringify ( 
//         {
//             "name": eventName,
//             "start": startTime,
//             "end": endtTime,
//             "creator": {
//                 "name": creatorName,
//                 "email": creatorEmail
//             }
//         })
//   })
//   console.log('updated',updatedCalendar.data)
// }
    


// function update(calendar) {
//     return HttpService.put('calendar', calendar)
// }

