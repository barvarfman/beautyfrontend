import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './TabsApp.scss';
export  function TabsApp() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange}  className="tabs">
          <Tab label="זימון" />
          <Tab label="ביטול" />
        </Tabs>
      </AppBar>
     
  );
}
