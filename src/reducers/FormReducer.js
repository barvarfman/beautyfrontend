const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    phoneForCancel:''
}

export function FormReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'UPDATE_NAME':
            return {
                ...state,
                name: action.customerName
            }
        case 'UPDATE_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'UPDATE_PHONE':
            return {
                ...state,
                phone: action.customerPhone
            }
        case 'UPDATE_PHONEֹֹֹֹֹ_FOR_CANCEL':
            return {
                ...state,
                phoneForCancel: action.phoneForCancel
            }

        default:
            return state;
    }
}

