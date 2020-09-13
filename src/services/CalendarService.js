// import HttpService from './HttpService'

// const url = process.env.NODE_ENV === 'production'
//     ? '/api/calendar'
//     : '//localhost:3030/api/calendar'

export default {
    getCalendar,
    getAvailbleDailySlots,
    update
}

const ACCOUNTID = '413361439'

// function getCalendar() {
//     ajax({
//         url: URL,
//         beforeSend: function(xhr) {
//              xhr.setRequestHeader("Authorization", "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo")
//         }, success: function(data){
//             alert(data);
//             //process the JSON data etc
//         }
//     })
// }

function getCalendar() {
    const options = {
        headers: {
          Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo"
        }
    };
    const url = 'https://api.kloudless.com/v1/accounts?enabled=True'
    console.log(url)
fetch(url, options)
  .then( res => res.json() )
  .then( data => console.log(data.objects[0]) );
}

function getAvailbleDailySlots (startTime,endtTime,duration){
    const url = `https://api.kloudless.com/v1/accounts/${ACCOUNTID}/cal/availability`
fetch(url, {
    method: 'post',
    headers: {Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo", 'Content-Type': 'application/json'}
,
body: JSON.stringify( {
    "meeting_duration": `PT${duration}`,
        "time_windows": [
            {
                "start": startTime,
                "end": endtTime
            }
        ] 
})
}).then(res=>res.json())
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



// function update(calendar) {
//     return HttpService.put('calendar', calendar)
// }

