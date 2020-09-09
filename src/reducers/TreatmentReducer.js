const INITIAL_STATE = {
    treatment: null,
    treatments: null
}

export function TreatmentReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_TREATMENTS':
            return {
                ...state,
                treatments: action.treatments
            }            
        case 'SET_TREATMENT':
            return {
                ...state,
                treatment: action.treatment
            }    
        case 'REMOVE_TREATMENT':
        return {
          ...state,
          treatments: state.treatments.filter(treatment => treatment._id !== action.treatmentId)
        };        
      
        default:
            return state;
    }
}

