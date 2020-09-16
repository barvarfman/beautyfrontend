import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { TabsApp } from '../TabsApp/TabsApp.jsx';
import { StepperApp } from '../StepperApp/StepperApp.jsx';
import './AppHeader.scss';


export function AppHeader(props) {
    return (
        <>
            <div className="app-header">
                <header className="flex space-between">
                    <h2 className="header-right">ניהול תורים</h2>
                    <h2 className="logo">Logo</h2>
                </header>
                {/* <div className="bottom-header flex space-between">
                    <div className="bottom-header-title"><h3>זימון</h3></div>
                    <div className="bottom-header-title"><h3>ביטול</h3></div>
                </div> */}
                <TabsApp />

                <StepperApp />

            </div>

        </>
    )
}





