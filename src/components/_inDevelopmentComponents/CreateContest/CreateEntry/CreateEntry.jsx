import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

// Components
import CreateContest from '../_inDevelopmentComponents/CreateContest/CreateContest';

//! This is an unfinished component
//! I realized an easier solution for my immediate needs
//! I am keeping this because it is a fine start to something I will want to make later

function CreateEntry() {

    return (<>
        <Typography 
            variant="h2" 
            sx={{ paddingLeft: "19px" }}>
            Create New Sandbox
        </Typography>

        <CreateContest 
            type='sandbox' 
        />

    </>)
}

export default CreateEntry