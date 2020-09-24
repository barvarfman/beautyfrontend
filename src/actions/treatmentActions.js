import TreatmentService from '../services/TreatmentService';


export function loadTreatments() {
  
  return async dispatch => {
    try {
      const treatments = await TreatmentService.getTreatments();
      dispatch(setTreatments(treatments));
   
    } catch (err) {
      console.log('TreatmentActions: err in loadTreatments', err);
      // example for rerouting - after changing the store
      // history.push('/some/path');
    } finally {
   
    }
  };
}

function setTreatments(treatments) {
  return {
    type: 'SET_TREATMENTS',
    treatments
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

export function _setTreatment(treatment) {
  return {
    type: 'SET_TREATMENT',
    treatment
  };
}

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

function _removeTreatment(treatmentId) {
  return {
    type: 'REMOVE_TREATMENT',
    treatmentId
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

export function _updatePickedTreatments(treatment,addOrRemove) {
  return {
    type: 'UPDATE_PICKED_TREATMENT',
    treatmentToUpdate:{
      treatment,
      addOrRemove
    }
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

export function _updateDuration(duration) {
    return {
      type: 'UPDATE_DURATION',
      duration
    };
}

export function initDuration() {
  return async dispatch => {
    try {
      await 
      dispatch(_initDuration());
    } catch (err) {
      console.log('ERR WITH initDuration', err);
    }
  };
}

function _initDuration() {
  return {
    type: 'INIT_DURATION'
  };
}
