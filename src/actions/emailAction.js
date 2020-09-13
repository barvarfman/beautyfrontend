import EmailService from '../services/EmailService'
// THUNK
export function updateEmail(emailToSend) {
    return async dispatch => {
        try {
            await dispatch(setEmail(emailToSend));
        } catch (err) {
            console.log('EmailActions: err in sendEmail', err);
        };
    }
}


function setEmail(email) {
    return {
        type: 'UPDATE_EMAIL',
        email
    };
}



export function sendEmail(emailToSend) {
    return async () => {
        try {
            await EmailService.sendMail(emailToSend);
        } catch (err) {
            console.log('EmailActions: err in sendEmail', err);
        };
    }
}


// function setEmail(treatments) {
//     return {
//         type: 'SEND_EMAIL',
//         treatments
//     };
// }
