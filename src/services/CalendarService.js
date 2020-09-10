// import HttpService from './HttpService'

// const url = process.env.NODE_ENV === 'production'
//     ? '/api/calendar'
//     : '//localhost:3030/api/calendar'

export default {
    getCalendar,
    // update
}

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

const options = {
  headers: {
    Authorization: "Bearer mFzYTSGauAA4QGdG6rI9MtfvvfEZHo"
  }
};

function getCalendar() {
    const url = 'https://api.kloudless.com/v1/accounts?enabled=True'
    console.log(url)
fetch(url, options)
  .then( res => res.json() )
  .then( data => console.log(data) );
}



// function update(calendar) {
//     return HttpService.put('calendar', calendar)
// }


