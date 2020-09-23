import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import './CancelAppointment.scss';
import { withRouter } from 'react-router-dom';
import { updatePhoneForCancel, sendEmail } from '../../actions/formAction.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { motion } from 'framer-motion'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setTreatment, initPickedTreatments,initDuration } from '../../actions/treatmentActions.js';
import { setTimeSlots } from '../../actions/calendarActions.js';
import { updateActiveStep } from '../../actions/stepperAction';
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


export function _CancelAppointment(props) {

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
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                color: '#172b4d'
            }
        },
    }));


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
         initApp()
        props.history.push('/')
    };

    function initApp() {
        props.updateActiveStep(0)
        props.setTreatment(null)
        props.setTimeSlots(null)
        props.initDuration()
        props.initPickedTreatments()
      }


    const [eventToCancel, setEventToCancel] = useState(null)
    useEffect(() => {
    }, []);

    async function cancelAppointment() {
        const events = await CalendarService.getEventByPhone(props.phone)
        const eventToRmove = events[0]
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
        setEventToCancel(null)
        sendEmail()
        handleOpen()
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'phone':
                if (value.length >= 9 && value.length <= 10) {
                    CalendarService.getEventByPhone(value)
                        .then(ev => {
                            if (!ev[0]) return
                            const dateParts = (ev[0].date).split('-')
                            const dateIsraeliDisplay = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
                            setEventToCancel({
                                treatments: ev[0].treatments,
                                startTime: UtilsService.changeTimeForDisplay(ev[0].startTime, -3),
                                endTime: UtilsService.changeTimeForDisplay(ev[0].endTime, -3),
                                date: dateIsraeliDisplay,
                            })
                        })
                }
                props.updatePhoneForCancel(value)
                break;
            default:
                console.log("not working");
        }

    }

    function sendEmail() {
        const { phone } = props
        let emailObj = {
            // email,
            bodyText: `שלום, ${"cusomer name"}
        בוטל תור${eventToCancel.treatments}  
            בתאריך ${eventToCancel.date}
                בוטל עם מספר  - ${phone}`
        }
        props.sendEmail(emailObj)
    }

    const classes = useStyles();
    return (
        <motion.div
            className="motion-div"
            initial="out"
            exit="in"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
            <main className="cancel-appointment flex column align-center space-around main-container">
                <div className="flex align-center column">
                    <div className="cancel-form-title">נא להזין מספר טלפון לביטול התור  :</div>
                    <TextField autoFocus={true} className={classes.root} name="phone" id="outlined-basic" variant="outlined" value={props.phone} onChange={handleChange} />
                </div>
                <div className="table-wrapper">
                    {(eventToCancel) && <div className="table-title"> פרטי התור :</div>}
                    {(eventToCancel) ?
                        <div className="apointment-details">
                            <div className="table-cell"> <span>סוג הטיפול</span> : {eventToCancel.treatments}</div>
                            <div className="table-cell"> בתאריך : {eventToCancel.date}</div>
                            <div className="last-cell"> בין השעות : {`${eventToCancel.endTime} - ${eventToCancel.startTime}`}</div>
                        </div>
                        :
                        <div className="space"></div>
                    }
                </div>
                <div className="space"></div>
                {(eventToCancel) && <button onClick={cancelAppointment} className="trash-btn"> מחק תור <i className="fas fa-trash" ></i></button>}

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
                            <h2 id="transition-modal-title">התור בוטל</h2>
                            <p id="transition-modal-description"></p>
                        </div>
                    </Fade>
                </Modal>
            </main>
        </motion.div>
    );
}

function mapStateProps(state) {
    return {
        phone: state.FormReducer.phoneForCancel
    }
}

const mapDispatchToProps = {
    updatePhoneForCancel,
    sendEmail,
    setTreatment,
    updateActiveStep,
    setTimeSlots,
    initDuration,
    initPickedTreatments,
}

export const CancelAppointment = withRouter(connect(mapStateProps, mapDispatchToProps)(_CancelAppointment))


