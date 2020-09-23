import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';

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
      props.updateDuration(false)
      props.updatePickedTreatments('remove')
    }
    setCheckedA(event.target.checked)
  };

  return (
    <div>
      <Switch
        checked={checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}