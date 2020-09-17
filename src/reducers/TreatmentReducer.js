import UtilsService from "../services/UtilsService";

const INITIAL_STATE = {
    treatment: null,
    treatments: null,
    pickedTreatments:[],
    duration:0
}

export function TreatmentReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_TREATMENTS':
            return {
                ...state,
                treatments: action.treatments
            }            
        case 'SET_TREATMENT':
            console.log(action.treatment);
            return {
                ...state,
                treatment: action.treatment
            }    
        case 'REMOVE_TREATMENT':
        return {
          ...state,
          treatments: state.treatments.filter(treatment => treatment._id !== action.treatmentId)
        };        
        case 'UPDATE_DURATION':
        return {
          ...state,
          duration: state.duration+(action.duration)
        };        
        case 'UPDATE_PICKED_TREATMENT':
        return {
          ...state,
          pickedTreatments:UtilsService.updatePickedTreatments(state.pickedTreatments,action) 
        };        
        case 'INIT_PICKED_TREATMENTS':
        return {
          ...state,
          pickedTreatments:[]
        };        
      
        default:
            return state;
    }
}

