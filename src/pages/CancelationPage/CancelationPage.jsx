import React, { useState, useEffect } from "react";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import CalendarService from '../../services/CalendarService';
import './CancelationPage.scss';

export  function CancelationPage() {

    async function cancelAppointment (phone){
        const events = await CalendarService.getEventByPhone(phone)
        const eventToRmove = events[0]
        console.log ('event to remove', eventToRmove)
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
    }
  
  return (
    <>
        <AppHeader />
        <input/>
        <StepperBtn/>
    </>
  );
}


// cancelAppointment ('043222222')
