import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {updateActiveStep} from '../../actions/stepperAction';


   function _StepperBtn(props) {

    function changeStep(diff) {
         props.updateActiveStep(props.activeStep + diff)
         if (!props.activeStep && diff>0) props.pushRoute('/calendar')
         else if ( props.activeStep === 1 && diff > 0) props.pushRoute('/form')
         else if ( props.activeStep === 2 && diff < 0) props.pushRoute('/calendar')
         else if ( props.activeStep === 1 && diff < 0) props.pushRoute('/')
    }

    function checkStepValidation() {
        console.log(props.duration)
        if (!props.duration) return true
        // if (props.activeStep === 1 && props.treatmentDate)
    }
  
    return (

        <div>
            <Button disabled={props.activeStep === 0} onClick={() => changeStep(-1)} >
                חזור
            </Button>
            <Button onClick={() => changeStep(1)} disabled={checkStepValidation()}>
                {props.activeStep === props.steps.length - 1 ? 'סיום' : 'הבא'}
            </Button>
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

export const StepperBtn = connect(mapStateProps, mapDispatchToProps)(_StepperBtn)
