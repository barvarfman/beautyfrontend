import TreatmentService from '../services/TreatmentService';


// THUNK
export function loadTreatments() {
  
  return async dispatch => {
    try {
      const treatments = await TreatmentService.getTreatments();
        console.log(treatments);
      dispatch(setTreatments(treatments));
   
    } catch (err) {
      console.log('TreatmentActions: err in loadTreatments', err);
      // example for rerouting - after changing the store
      // history.push('/some/path');
    } finally {
   
    }
  };
}
// THUNK
export function removeTreatment(treatmentId) {
  return async dispatch => {
    try {
      await TreatmentService.remove(treatmentId);
      dispatch(_removeTreatment(treatmentId));
    } catch (err) {
      console.log('TreatmentActions: err in removeTreatment', err);
    }
  };
}
export function setTreatment(treatment) {
    return {
      type: 'SET_TREATMENT',
      treatment
    };
  }
  function setTreatments(treatments) {
    return {
      type: 'SET_TREATMENTS',
      treatments
    };
  }
function _removeTreatment(treatmentId) {
  return {
    type: 'REMOVE_TREATMENT',
    treatmentId
  };
}
