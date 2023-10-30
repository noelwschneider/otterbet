// Hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../../../hooks/useStore';

// Style tools
import { styles } from '../../../../styling/styles';


// Style Components
import { 
  Grid,
  Button } from '@mui/material';



function SubmitButton() {
  const dispatch = useDispatch();

  // Global State
  const user = useStore("user");
  const betslip = useStore("betslip");
  const entry = useStore("entries");

  // Local State
  //! The setter isn't getting used, which tells me I'm doing this wrong
  //! Either selectedEntry is a global state thing, or I need to pass setSelectedEntry down
  //! through props (and confirm this will actually update selected entry up here)
  const [selectedEntry, setSelectedEntry] = useState(0)

  // Submit handler
  const handleSubmit = () => {

    // validation
    const userFunds = entry[selectedEntry].funds

    // validate that user has entered a value > 0 in each input field
    let wagerSum = 0;
    for (let bet of betslip) {
      if (bet.wager <= 0) {
        //! I need access to info to notify user of the specific bet that failed the check
        //& render the alert to the DOM
        return
      }
      wagerSum += Number(bet.wager)
    }

    // Validate that user has funds to place current wagers
    if (wagerSum > userFunds) {
      //& Render the appropriate alert to the DOM
      return
    }

    betslip.map(bet => {
      bet.entry_id = entry[selectedEntry].id
    })

    // send betslip to betslip.saga for POST
    dispatch({ 
      type: 'SUBMIT_WAGERS', 
      payload: { 
        betslip, 
        wagerSum, 
        user, 
        entry: entry[selectedEntry] 
      } 
    });
  }

  return (
    <Grid component={Button}
      container item xs={12}
      sx={styles.betslip.submitButton}
      onClick={handleSubmit}>

      Submit

    </Grid>
  )
}

export default SubmitButton 