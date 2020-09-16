

export function updateActiveStep(step) {
    return async dispatch => {
      try {
        await 
        dispatch(_updateActiveStep(step));
      } catch (err) {
        console.log('stepperActions: err in updateActiveStep', err);
      }
    };
  }
  export function _updateActiveStep(step) {
      return {
        type: 'UPDATE_ACTIVE_STEP',
        step
        }
      };


