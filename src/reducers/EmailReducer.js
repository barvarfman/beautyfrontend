const INITIAL_STATE = {
    email: '',
}

export function EmailReducer(state = INITIAL_STATE, action) {
    switch (action.type) {      
        
        case 'UPDATE_EMAIL':
            return {
                ...state,
                email: action.email
            }       
      
        default:
            return state;
    }
}

