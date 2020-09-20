import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './TabsApp.scss';
import { withRouter } from 'react-router-dom';

export function _TabsApp(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      props.history.push('/cancelAppointment')
    } else {
      props.history.push('/')
    }
  };

  const style = {
    width:'50%',
    boxShadow:'none'
  }

  return (

    <AppBar position="static" style={{boxShadow:'none'}} >
      <Tabs value={value} onChange={handleChange} className="tabs">
        <Tab label="זימון" style={style}/>
        <Tab label="ביטול" style={style}/>
      </Tabs>
    </AppBar>

  );
}

export const TabsApp = withRouter(_TabsApp)