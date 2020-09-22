import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { updateActiveStep } from '../../actions/stepperAction';
import { withRouter } from 'react-router-dom';
import './StepperBtn.scss';
function _StepperBtn(props) {

    const [hideBtn, setHideBtn] = useState('');
    const [activeNextBtn, setActiveNextBtn] = useState('');
    const [activeBackBtn, setActiveBackBtn] = useState('');

    useEffect(() => {
        if (props.activeStep !== 1) {setHideBtn('')}
        else {setHideBtn("hide-btn")}
        if (props.activeStep) {setActiveBackBtn('active-btn')}
        else {setActiveBackBtn('')}
        if (props.activeStep === 2 && !props.treatment){setActiveNextBtn('active-btn') 
        } else {setActiveNextBtn('')} 
        if (props.duration) {setActiveNextBtn('active-btn') 
        } else {setActiveNextBtn('')} 
    });

    function changeStep(diff) {
        // confiramtion
        if (props.activeStep + diff === 3) {
            props.setAppointment()
            props.handleOpen()
        }
        props.updateActiveStep(props.activeStep + diff)
        if (!props.activeStep && diff > 0){
            props.history.push('/calendar')
            
        }    
        else if (props.activeStep === 1 && diff > 0) props.history.push('/form')
        else if (props.activeStep === 2 && diff < 0) props.history.push('/calendar')
        else if (props.activeStep === 1 && diff < 0) props.history.push('/')
    }

    function checkStepValidation() {
        if (!props.duration) return true
        if (props.activeStep === 2 && !props.treatment) return true
    }

    return (

        <div className={`stepper-btns-container flex align-center space-around `}>
          <div className="stepper-btn-wrraper stepper-btn-wrraper-back"> 
            <button className={`stepper-btn ${activeBackBtn}`} disabled={props.activeStep === 0} onClick={() => changeStep(-1)} >
                חזור
            </button>
          </div>
          <div className={`stepper-btn-wrraper stepper-btn-wrraper-next ${hideBtn} `}>
            <button className={`stepper-btn ${activeNextBtn}`} onClick={() => changeStep(1)} disabled={checkStepValidation()}>
                    {(props.activeStep === 2) ? 'אשר' : 'הבא'}
            </button>
          </div>
        </div>

    )
}

function mapStateProps(state) {
    return {
        steps: state.StepperReducer.steps,
        activeStep: state.StepperReducer.step,
        duration: state.TreatmentReducer.duration,
        treatment: state.TreatmentReducer.treatment,
    }
}

const mapDispatchToProps = {
    updateActiveStep
}

export const StepperBtn = withRouter(connect(mapStateProps, mapDispatchToProps)(_StepperBtn))
