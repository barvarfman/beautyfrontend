const INITIAL_STATE = {
    calendar: null,
    timeSlots: null,
    loader:true,
    confirmedEventId:null
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
        case  'SET_loader':
            return {
                ...state,
                loader: action.loader
            }                
      
        default:
            return state;
    }
}


