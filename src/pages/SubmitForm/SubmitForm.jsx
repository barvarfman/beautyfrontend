import React from "react";
import { connect } from 'react-redux';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import { updateEmail, updateName, updatePhone, sendEmail } from '../../actions/formActions.js';
import { setTimeSlots } from '../../actions/calendarActions.js';
import { setTreatment, updateDuration, initPickedTreatments, initDuration } from '../../actions/treatmentActions.js';
import './SubmitForm.scss';
import { updateActiveStep } from '../../actions/stepperActions';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { motion } from 'framer-motion'

const pageVariants = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: "50%"
    }
}

const pageTransition = {
    duration: 1.3,
    type: "spring",
    stiffness: 50
}

export function _SubmitForm(props) {
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    // }, []);
    
    
    async function setAppointment(time = props.treatment.time, date = props.treatment.date) {
        let treatmentsType = ''
        props.pickedTreatments.forEach((tr, idx) => {
            if (props.pickedTreatments.length !== idx + 1) treatmentsType += tr.name + ', '
            else treatmentsType += tr.name
        })
        treatmentsType.substring()
        time = UtilsService.changeTimeForDisplay(time, 3)
        const startTime = `${date}T${time}:00Z`
        time = UtilsService.calculateEndTime(time, props.duration)
        const endTime = `${date}T${time}:00Z`
        const confirmedEvent = await CalendarService.update(startTime, endTime, treatmentsType, 'ayal', 'ayal@gmail.com')
        const event = {
            phone: props.phone,
            eventId: confirmedEvent.id,
            treatments: treatmentsType,
            duration: props.duration,
            startTime: startTime.slice(11, 20),
            endTime: endTime.slice(11, 20),
            date: startTime.slice(0, 10)
        }
        CalendarService.saveConfirmedEvent(event)
        console.log(event);
        sendEmail()
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'name':
                props.updateName(value)
                break;
                case 'phone':
                    props.updatePhone(value)
                    break;
                    case 'email':
                        props.updateEmail(value)
                        break;
                        default:
                            console.log('default');
                        }
                    }
                    
                    function sendEmail() {
                        const { name, phone, email, duration, treatment, pickedTreatments } = props
                        let treatmentsType = UtilsService.arrayToString(pickedTreatments)
                        let emailObj = {
                            email,
                            bodyText: `שלום, ${name} שמחים שבחרת במספרת קובי!
                            נקבע לך תור ל${treatmentsType}  
                            בתאריך ${treatment.date}
                            בשעה ${treatment.time}
                            משך זמן הטיפול מוערך כ- ${duration} דקות
                            הטלפון שהתקבל ליצירת קשר הוא - ${phone}`
                        }
                        props.sendEmail(emailObj)
                    }
                    
                    function initApp() {
                        props.updateActiveStep(0)
                        props.setTreatment(null)
                        props.setTimeSlots(null)
                        props.initDuration()
                        props.initPickedTreatments()
                        props.history.push('/')
                    }
                   
                    
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            color: 'form-title'
        },
        input: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            }
        }
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        initApp()
    };

    const dateParts = (props.treatment.date).split('-')
    const dateIsraeliDisplay = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
    const endTime= UtilsService.calculateEndTime(props.treatment.time,props.duration)

    return (
        <>
            <button className="restart-btn" onClick={initApp}>אתחול  <i className="fas fa-redo-alt"></i></button>
            <motion.div
                initial="out"
                exit="in"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
                style={{ textAlign: 'center' }}
            >
                <div>
                    <form className={`${classes.input} submit-form flex column align-center`} noValidate autoComplete="off">
                        <div>
                            <div className="form-title">שם מלא :</div>
                            <TextField autoFocus={true} name="name" id="outlined-basic" variant="outlined" value={props.name} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="form-title">טלפון :</div>
                            <TextField name="phone" id="outlined-basic" variant="outlined" value={props.phone} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="form-title">מייל :</div>
                            <TextField name="email" id="outlined-basic" variant="outlined" value={props.email} onChange={handleChange} />
                        </div>
                    </form>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">התור נקבע בהצלחה</h2>
                                <div> נקבע לך תור ל: {UtilsService.arrayToString(props.pickedTreatments)}  </div>
                                <div> בתאריך {dateIsraeliDisplay}</div>
                                <div> בין השעות: {endTime} - {props.treatment.time}</div>
                                
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </motion.div>
            <StepperBtn handleOpen={handleOpen} setAppointment={setAppointment} />
        </>
    );
}

function mapStateProps(state) {
    return {
        name: state.FormReducer.name,
        email: state.FormReducer.email,
        phone: state.FormReducer.phone,
        pickedTreatments: state.TreatmentReducer.pickedTreatments,
        duration: state.TreatmentReducer.duration,
        treatment: state.TreatmentReducer.treatment,
    }
}

const mapDispatchToProps = {
    updateEmail,
    updateName,
    updatePhone,
    sendEmail,
    updateActiveStep,
    setTreatment,
    updateDuration,
    setTimeSlots,
    initPickedTreatments,
    initDuration
}

export const SubmitForm = withRouter(connect(mapStateProps, mapDispatchToProps)(_SubmitForm))
