// Components
import UserMenu from './UserMenu';
import MarketsMenu from './MarketsMenu';
import LogOutButton from './LogOutButton';

// Style Tools
import { styles } from '../../../styling/styles'

// Style Components
import Grid from '@mui/material/Grid';

function MenuItems() {

    return (
        <Grid 
            container 
            item xs={5}
            sx={styles.header.menu.container}>

            <UserMenu />
            <MarketsMenu />
            <LogOutButton />

        </Grid>
    )
}

export default MenuItems