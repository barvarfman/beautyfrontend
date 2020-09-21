import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
// useLocation
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { TreatmentApp } from './pages/TreatmentApp/TreatmentApp.jsx'
import { CalendarApp } from './pages/CalendarApp/CalendarApp.jsx'
import { SubmitForm } from './pages/SubmitForm/SubmitForm.jsx'
import { CancelAppointment } from './pages/CancelAppointment/CancelAppointment.jsx'
import { HashRouter as Router} from 'react-router-dom';
// import { AnimatePresence} from 'framer-motion'

function App() {
  // const location=useLocation()
  // console.log(location);
  return (
    <Router>
      <div className="App">
        <AppHeader/>
        {/* <AnimatePresence exitBeforeEnter> */}
          <Switch >
            {/* location={location} key={location.pathname} */}
            <Route path="/calendar" component={CalendarApp} />
            <Route path="/cancelAppointment" component={CancelAppointment} />
            <Route path="/form" component={SubmitForm} />
            <Route path="/" component={TreatmentApp} />
          </Switch>
        {/* </AnimatePresence> */}
      </div>
      </Router>
  );
}

export default App;
