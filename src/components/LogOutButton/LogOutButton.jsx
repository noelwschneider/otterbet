//! THIS COMPONENT IS NO LONGER IN USE
//! IT HAS BEEN REPLACED BY 'src/components/Nav/MenuItems/LogOutButton
//! Delete this file once all style refactoring is complete
import React from 'react';
import { useDispatch } from 'react-redux';

// Styling
import Button from '@mui/material/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from its parents through React props
      //^ This is worth breaking down and understanding at a lower level
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
