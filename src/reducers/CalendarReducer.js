const INITIAL_STATE = {
    calendar: null,
    timeSlots: null,
    loder:true
}

export function CalendarReducer(state = INITIAL_STATE, action) {
    switch (action.type) {      
        
        case 'SET_CALENDAR':
            return {
                ...state,
                calendar: action.calendar
            }          
        case 'SET_TIMESLOTS':
            return {
                ...state,
                timeSlots: action.timeSlots
            }          
        case  'SET_LODER':
            return {
                ...state,
                loder: action.loder
            }          
      
        default:
            return state;
    }
}


