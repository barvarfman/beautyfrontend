import React from 'react';
import Switch from '@material-ui/core/Switch';

export  function SwitchApp(props) {
  const [state, setState] = React.useState({
    checkedA: false,
  });
  
   
  
  const handleChange = (event) => {
    if(!state.checkedA){
      props.updateDuration(true)
      props.updatePickedTreatments('add')
   }
   else{
     props.updateDuration(false)
     props.updatePickedTreatments('remove')
   }
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}