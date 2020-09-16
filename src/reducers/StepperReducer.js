const INITIAL_STATE = {
  step:0,
  steps:['טיפול', 'תאריך', 'סיום']
}

export function StepperReducer(state = INITIAL_STATE, action) {
    switch (action.type) {      
        
        case 'UPDATE_ACTIVE_STEP':
            return {
                ...state,
                step:action.step
            }       
       
        default:
            return state;
    }
}

