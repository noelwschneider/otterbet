import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';
// Components
import BetSlipItem from './BetSlipItem';

// Styling
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Betslip.css'

function BetSlip() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    useEffect( () => {
        dispatch({ type: 'FETCH_ENTRY', payload: user.id})
        console.log(selectedEntry)
    }, [])

    
    
    const [selectedEntry, setSelectedEntry] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [invalidInputAlert, setInvalidInputAlert] = useState(false)
    const [insufficientFundsAlert, setInsufficientFundsAlert] = useState(false)


    const handleEntryClick = (index) => {
        setSelectedEntry(index);
        setAnchorEl(null)
    }

    // This could benefit from modularization
    const handleSubmit = () => {
        console.log('in handleSubmit. Current betslip:', betslip)
        
        // validation
        const userFunds = entry[selectedEntry].funds
        let wagerSum = 0
        
        // validate that user has entered a value > 0 in each input field
        for (let bet of betslip) {
            console.log('current bet:', bet)
            if (bet.wager <= 0) {
                // alert the user
                    // I need access to info to notify user of the specific bet that failed the check
                // terminate submission
                console.log('empty or negative wager')
                setInvalidInputAlert(true)
                return
            }
            wagerSum += Number(bet.wager)
        }

        // Validate that user has funds to place current wagers
        if (wagerSum > userFunds) {
            setInsufficientFundsAlert(true)
            return
        }

        betslip.map( bet => {
            bet.entry_id = entry[selectedEntry].id
        })
        
        // send betslip to betslip.saga for POST
        dispatch({type: 'SUBMIT_WAGERS', payload: {betslip, wagerSum, user, entry: entry[selectedEntry]}})
    }

    return (
    <Box 
        sx={{
            maxHeight: "75vh", 
            display: 'flex', 
            flexDirection: 'column', 
            position: "fixed", 
            right: "0px", 
            top: "150px",
        }}
        className="container" 
    >
        <Card sx={{overflow: "scroll"}}>
            <CardHeader title={<Typography variant="h2">Bet Slip</Typography>}/>
            
            {/* Alert to render when user has not submitted a valid wager */}
            {invalidInputAlert 
                ? <Alert severity="error" onClose={() => setInvalidInputAlert(false)}>Please enter a positive value for all wagers</Alert> 
                : <></>
            }

            {/* Alert to render when the user has submitted wagers they cannot afford */}
            {insufficientFundsAlert 
                ? <Alert severity="error" onClose={() => setInsufficientFundsAlert(false)}>Insufficient funds for entered wagers</Alert> 
                : <></>
            }

            {/* Render a prompt if the user does not have a valid entry yet, or render a menu of their entries */}
            {entry.length === 0
                ? <>
                    <Typography variant="h5">You don't have any entries!</Typography>
                    <Typography variant="h5">
                        <Link to="/create-entry">Create a sandbox</Link> or <Link>join a contest</Link> to get started!
                    </Typography>
                </>
                : <>
                
                    
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant="contained"
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        {entry[selectedEntry].name}
                    </Button>

                    <span>
                        <Typography variant="h5">
                            <strong>Available funds: </strong>
                            ${entry[selectedEntry].funds}
                        </Typography>
                        
                    </span>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {entry.map( (entryItem, index) => (
                            <MenuItem 
                                key={entryItem.id}
                                onClick={() => handleEntryClick(index)}
                                disableGutters={true}>
                                    {entryItem.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </>}

            <CardActionArea disableRipple component="div">
                <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: "start"}}>
                    {betslip.map( bet => (
                        <BetSlipItem key={bet.id} bet={bet}/>
                    ))}
                    <Button onClick={handleSubmit}>Submit</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    </Box>)
}

export default BetSlip