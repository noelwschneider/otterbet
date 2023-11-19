// Hooks
import { useDispatch } from 'react-redux';
import useStore from '../../../../hooks/useStore';

// Style
import { styles } from '../../../../styling/styles';
import {
    Grid,
    Button
} from '@mui/material';

// Utilities
import validate from './validateWagers';
import sum from './sumWagers';


function SubmitButton({ props }) {
    const dispatch = useDispatch();

    const user = useStore("user");
    const betslip = useStore("betslip");
    const { entry } = props;

    // Submit handler
    const handleSubmit = () => {  
        if (validate(betslip, entry.funds)) {
            //! This can probably be handled in the server
            betslip.map(bet => {
                bet.entry_id = entry.id
            });
    
            // send betslip to betslip.saga for POST
            dispatch({
                type: 'SUBMIT_WAGERS',
                payload: {
                    betslip,
                    wagerSum: sum(betslip),
                    user,
                    entry
                }
            });
        } else {
            //! render error message
            // for now:
            console.log('betslip validation failed');
        }        
    } 

    return (
        <Grid 
        component={Button}
        container 
        item 
        xs={12}
        onClick={handleSubmit}
        sx={styles.betslip.submitButton}>
            Submit
        </Grid>
    )
}

export default SubmitButton 