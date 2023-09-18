import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Style Tools
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';

function UserMenu() {

    // Theming
    const theme = useTheme()
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 0,
 
            width: "100%",
            color: theme.palette.primary.contrastText,
            border: "1px solid black",
                borderRadius: "10px 10px 0px 0px",
                overflow: "hidden",
                backgroundClip: "border-box"
            

    }));

    // This component exists because the menu dropdown can't access the anchor element if it is declared outside of a component wrapping the button
    const MenuStuff = () => {
        const history = useHistory()
        const [anchorEl, setAnchorEl] = useState(null);

        const handleNavigation = (event) => {
            setAnchorEl(null)
            history.push(event.currentTarget.id)
        }

        return (< >
            <Button
            id="simple-button"
            className="navLink"
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="text"

            onClick={(event) => {
                setAnchorEl(event.currentTarget)
            }}

            style={{  
                width: "100%",
                color: theme.palette.primary.contrastText,
                
                
            }}
        >
            User
        </Button>

        <Menu
            className="navMenu"
            id="simple-menu"
            anchorEl={anchorEl}

            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

            transformOrigin={{ vertical: 'top', horizontal: 'center' }}

            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            style={{
                // position: "relative"
            }}
        >
            <MenuItem
                className="navMenuItem"
                id="/"
                onClick={event => handleNavigation(event)}>
                Profile
            </MenuItem>

            <MenuItem 
                id="/my-bets"
                className="navMenuItem"
                onClick={event =>  handleNavigation(event)}>
                My Bets
            </MenuItem>

            <MenuItem
                id="/"
                className="navMenuItem"
                onClick={event =>  handleNavigation(event)}>
                Manage Entries
            </MenuItem>

        </Menu>
        </>)
    }

    return (<ComponentTheme item xs={4}>
        <MenuStuff></MenuStuff>

        
        
    </ComponentTheme>
    )
}

export default UserMenu