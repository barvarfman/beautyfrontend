import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {updateActiveStep} from '../../actions/stepperAction';
import {withRouter} from 'react-router-dom';

   function _StepperBtn(props) {

    function changeStep(diff) {
         props.updateActiveStep(props.activeStep + diff)
         if (!props.activeStep && diff>0) props.history.push('/calendar')
         else if ( props.activeStep === 1 && diff > 0) props.history.push('/form')
         else if ( props.activeStep === 2 && diff < 0) props.history.push('/calendar')
         else if ( props.activeStep === 1 && diff < 0) props.history.push('/')
    }

    function checkStepValidation() {
        if (!props.duration) return true
        // if (props.activeStep === 1 && props.treatmentDate)
    }
  
    return (

        <div>
            <Button disabled={props.activeStep === 0} onClick={() => changeStep(-1)} >
                חזור
            </Button>
            {(props.activeStep !==1)&&
            <Button onClick={() => changeStep(1)} disabled={checkStepValidation()}>
                הבא
            </Button>
            }
        </div>

    )
}

function mapStateProps(state) {
    return {
      steps: state.StepperReducer.steps,
      activeStep: state.StepperReducer.step,
      duration: state.TreatmentReducer.duration,
    //   treatmentDate:
    }
}

const mapDispatchToProps = {
    updateActiveStep
}

export const StepperBtn = withRouter(connect(mapStateProps, mapDispatchToProps)(_StepperBtn))