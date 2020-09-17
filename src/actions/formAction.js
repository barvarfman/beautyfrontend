import EmailService from '../services/EmailService'
// THUNK
export function updateEmail(emailToSend) {
    return async dispatch => {
        try {
            await dispatch(setEmail(emailToSend));
        } catch (err) {
            console.log('formActions: err in sendEmail', err);
        };
    }
}


function setEmail(email) {
    return {
        type: 'UPDATE_EMAIL',
        email
    };
}

export function updateName(customerName) {
    return async dispatch => {
        try {
            await dispatch(_updateName(customerName));
        } catch (err) {
            console.log('formActions: err in updateName', err);
        };
    }
}


function _updateName(customerName) {
    return {
        type: 'UPDATE_NAME',
        customerName
    };
}

export function updatePhone(customerPhone) {
    return async dispatch => {
        try {
            await dispatch(_updatePhone(customerPhone));
        } catch (err) {
            console.log('formActions: err in updateCustomerPhone', err);
        };
    }
}


function _updatePhone(customerPhone) {
    return {
        type: 'UPDATE_PHONE',
        customerPhone
    };
}



export function sendEmail(emailToSend) {
    return async () => {
        try {
            await EmailService.sendMail(emailToSend);
        } catch (err) {
            console.log('formActions: err in sendEmail', err);
        };
    }
}


