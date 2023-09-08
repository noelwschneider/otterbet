import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MyBetsItem from './MyBetsItem';

import Typography from '@mui/material/Typography';
function MyBets() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_MYBETS', payload: user})
    }, [])

    const user = useSelector(store => store.user)
    const userBets = useSelector(store => store.myBets)

    console.log('data in MyBets components', userBets)

    return (<>
        <Typography variant="h2" sx={{paddingLeft: "19px"}}>My Bets</Typography>

        {userBets.map( bet => (
            <MyBetsItem key={bet.id} bet={bet}/>
        ))}
    </>)
}

export default MyBets