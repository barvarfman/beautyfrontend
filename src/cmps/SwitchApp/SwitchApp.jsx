import React, { useState, useEffect } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset,createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const theme = createMuiTheme({
  direction: 'rtl',
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export function SwitchApp(props) {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(props.isActive)
  }, [props.isActive])

  const handleChange = (event) => {
    if (!isChecked) {
      props.updateDuration(true)
      props.updatePickedTreatments('add')
    }
    else {
      props.setIsActive(false)
      props.updateDuration(false)
      props.updatePickedTreatments('remove')
    }
    setIsChecked(event.target.isChecked)
  };

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Switch
            isChecked={isChecked}
            onChange={handleChange}
            name="isChecked"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}