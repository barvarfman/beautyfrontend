import React, { useEffect } from "react";
import { connect } from 'react-redux';
import CalendarService from '../../services/CalendarService';
import './CancelAppointment.scss';
import { withRouter } from 'react-router-dom';
import { updatePhoneForCancel } from '../../actions/formAction.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { motion } from 'framer-motion'
const pageVariants={
    in:{
        opacity: 1 ,
        x:0
    },
    out:{
        opacity: 0,
        x:"50%"
    }
}

const pageTransition={
    duration:1.3,
    type:"spring",
    stiffness:50
}

export function _CancelAppointment(props) {
    
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          }
        },
      }));

    useEffect(() => {
    }, []);

    async function cancelAppointment() {
        const events = await CalendarService.getEventByPhone(props.phone)
        const eventToRmove = events[0]
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
        rotate="rotate"
    }
    
    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'phone':
                props.updatePhoneForCancel(value)
                break;
            default:
                console.log("not working");
        }
        
    }
     let trashStyle ="fas fa-trash"
     let rotate=""
    const classes = useStyles();


    return (
        <motion.div
            initial="out"
            exit="in"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
        <main className="cancel-appointment">
            <div>
                <div className="black">נא להזין מספר טלפון לביטול התור  :</div>
                {/* <input name="phone" value={props.phone} onChange={handleChange} /> */}
                <form className={classes.root} noValidate autoComplete="off">
                    <div className="cancel-input-wrapper flex">
                     <TextField name="phone" id="outlined-basic"  variant="outlined" value={props.phone} onChange={handleChange}/>
                     { props.phone.length===10 && <i className={`${trashStyle} ${rotate}`} onClick={cancelAppointment}></i>}
                    </div>
                </form>
            </div>
        </main>
        </motion.div>
    );
}

function mapStateProps(state) {
    return {
        phone: state.FormReducer.phoneForCancel,
    }
}

const mapDispatchToProps = {
    updatePhoneForCancel,
}

export const CancelAppointment = withRouter(connect(mapStateProps, mapDispatchToProps)(_CancelAppointment))
