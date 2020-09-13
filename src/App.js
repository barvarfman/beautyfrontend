import React from 'react';
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { TreatmentApp } from './pages/TreatmentApp/TreatmentApp.jsx'
import { CalendarApp } from './pages/CalendarApp/CalendarApp.jsx'
import { AppFooter } from './cmps/AppFooter/AppFooter';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/calendar" component={ CalendarApp } />
          <Route path="/" component={ TreatmentApp } />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
