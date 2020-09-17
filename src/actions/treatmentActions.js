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

export function updateDuration(duration) {
  return async dispatch => {
    try {
      await 
      dispatch(_updateDuration(duration));
    } catch (err) {
      console.log('TreatmentActions: err in addDuration', err);
    }
  };
}

export function updatePickedTreatments(treatment,addOrRemove) {
  return async dispatch => {
    try {
      await 
      dispatch(_updatePickedTreatments(treatment,addOrRemove));
    } catch (err) {
      console.log('TreatmentActions: err in updatePickedTreatments', err);
    }
  };
}
export function setTreatment(treatment) {
  return async dispatch => {
    try {
      await 
      dispatch((_setTreatment(treatment)));
    } catch (err) {
      console.log('TreatmentActions: err in setTreatment', err);
    }
  };
}
export function _updatePickedTreatments(treatment,addOrRemove) {
    return {
      type: 'UPDATE_PICKED_TREATMENT',
      treatmentObj:{
        treatment,
        addOrRemove
      }
    };
  }

export function _updateDuration(duration) {
    return {
      type: 'UPDATE_DURATION',
      duration
    };
  }
export function _setTreatment(treatment) {
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

export function initPickedTreatments() {
  return async dispatch => {
    try {
      await 
      dispatch(_initPickedTreatments());
    } catch (err) {
      console.log('ERR WITH initPickedTreatments', err);
    }
  };
}


function _initPickedTreatments() {
  return {
    type: 'INIT_PICKED_TREATMENTS'
  };
}