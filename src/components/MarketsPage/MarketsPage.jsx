// Components
import MarketsCol from './MarketsCol/MarketsCol';
import BetSlip from './BetSlip/BetSlip';

// Style Tools
import { styled } from '@mui/system';

// Style Components
import Grid from '@mui/material/Grid';

function MarketsPage() {
    
    // This is the half of the Markets page that shows games to wager on
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.light
    }));

    return (
        <ComponentTheme className="markets-page-container" container>  
            <Grid container spacing={0} item xs={7} style={{alignItems: "start"}}>
                <MarketsCol />
            </Grid>

            <BetSlip />
            
        </ComponentTheme>
    )
}

export default MarketsPage