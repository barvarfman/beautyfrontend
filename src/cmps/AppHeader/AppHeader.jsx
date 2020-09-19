import React from 'react';
import { TabsApp } from '../TabsApp/TabsApp.jsx';
import { StepperApp } from '../StepperApp/StepperApp.jsx';
import './AppHeader.scss';


export function AppHeader() {
    return (
        <>
            <div className="app-header">
                <header className="flex space-between">
                    <h2 className="header-right">ניהול תורים</h2>
                    <h2 className="logo">Logo</h2>
                </header>
                <TabsApp />

                <StepperApp />

            </div>

        </>
    )
}





