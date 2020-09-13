const INITIAL_STATE = {
    calendar: null,
}

export function CalendarReducer(state = INITIAL_STATE, action) {
    switch (action.type) {      
        
        case 'SET_CALENDAR':
            return {
                ...state,
                calendar: action.calendar
            }          
      
        default:
            return state;
    }
}


