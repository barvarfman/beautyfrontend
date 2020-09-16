import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {updateActiveStep} from '../../actions/stepperAction';

   function _StepperBtn(props) {
    const [activeStep, setActiveStep] = React.useState(0);
console.log(props);
    const handleNext = () => {
         setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

  
    return (

        <div>
            <Button disabled={activeStep === 0} onClick={handleBack} >
                חזור
              </Button>


            <Button onClick={handleNext}>
                {activeStep === props.steps.length - 1 ? 'סיום' : 'הבא'}
            </Button>
        </div>

    )
}



function mapStateProps(state) {
    return {
      steps:  state.StepperReducer.steps,
      activeStep:state.StepperReducer.step
    }
}

const mapDispatchToProps = {
    updateActiveStep
}

export const StepperBtn = connect(mapStateProps, mapDispatchToProps)(_StepperBtn)
