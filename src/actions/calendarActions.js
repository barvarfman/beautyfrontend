import CalendarService from '../services/CalendarService';

// THUNK
export function loadCalendar() {
  
  return async dispatch => {
    try {
      const calendar = await CalendarService.getCalendar();
      dispatch(setCalendar(calendar));
    } catch (err) {
      console.log('CalendarActions: err in loadCalendars', err);
  };
}
}

export function setCalendar(calendar) {
    return {
      type: 'SET_CALENDAR',
      calendar
     };
}
