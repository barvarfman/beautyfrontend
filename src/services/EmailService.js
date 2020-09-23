import HttpService from './HttpService'

export default {
    sendMail
}

function sendMail(emailObj) {
    return HttpService.post('email',emailObj)
}


