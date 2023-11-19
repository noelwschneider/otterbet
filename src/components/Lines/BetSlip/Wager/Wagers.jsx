// Hooks
import useStore from '../../../../hooks/useStore';

// Components
import LineData from './Line/LineData';
import Form from './Form/Form';
import Header from './Header';

// Style
import {
    Grid,
    CardActions,
    CardActionArea,
} from '@mui/material';


export default function Wagers() {
    const betslip = useStore("betslip");

    return (
        <Grid 
        container 
        item 
        xs={12} 
        component={CardActionArea} 
        disableRipple>

            {betslip.map(bet => (
                <Grid 
                container 
                item 
                xs={12} 
                component={CardActions}
                key={bet.game_id} >
                    
                    <Header bet={bet} betslip={betslip}/>
                    <LineData key={bet.id} bet={bet} />
                    <Form key={bet.id} bet={bet} />

                </Grid>
            ))}

        </Grid>
    )
}