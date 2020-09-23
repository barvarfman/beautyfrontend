import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  direction: 'rtl',
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export function SwitchApp(props) {

  const [checkedA, setCheckedA] = useState(false);

  useEffect(() => {
    setCheckedA(props.isActive)
  }, [props.isActive])

  const handleChange = (event) => {
    if (!checkedA) {
      props.updateDuration(true)
      props.updatePickedTreatments('add')
    }
    else {
      props.setIsActive(false)
      props.updateDuration(false)
      props.updatePickedTreatments('remove')
    }
    setCheckedA(event.target.checked)
  };

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Switch
            checked={checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}