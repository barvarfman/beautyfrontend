import React from 'react';
import { useLocation } from 'react-router-dom';
import { TabsApp } from '../TabsApp/TabsApp.jsx';
import { StepperApp } from '../StepperApp/StepperApp.jsx';
import './AppHeader.scss';


export function AppHeader(props) {

    const location = useLocation()

    return (
        <>
            <div className="app-header">
                <header className="flex space-between upper-header">
                    <h2 className="header-right">ניהול תורים</h2>
                    <h2 className="logo">Bar</h2>
                </header>
                <TabsApp />
                {
                    (location.pathname === '/cancelAppointment')? '': <StepperApp />
                }
            </div>

        </>
    )
}





