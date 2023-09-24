// This component contains the "My Bets" nav link
    // Navigate to '/my-bets' on button-click

// Dependencies
import React from 'react';

// Routing hooks
import { useHistory } from 'react-router-dom';

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// Style Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function UserMenu() {
    const history = useHistory();

    // Theming
    const theme = useTheme();
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

    // Handler function for My Bets nav link
    const handleNavigation = (event) => {
        history.push(event.currentTarget.id);
    }

    return (
        <ComponentTheme item xs={4}>
            <Button
            id='/my-bets'
            variant="text"
            className="navLink"
            style={{  width: "100%", color: theme.palette.primary.contrastText }}
            onClick={event => handleNavigation(event)}>
            My Bets
        </Button>
        </ComponentTheme>
    )
}

export default UserMenu;