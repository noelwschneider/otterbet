import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import MarketsItem from './MarketsItem';
import BetSlip from './BetSlip';

function Markets() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const betslip = useSelector(store => store.betslip)
    const entry = useSelector(store => store.entry)

    const [startDate, setStartDate] = useState('2023-09-13')
    const [endDate, setEndDate] = useState('2023-09-20')

    const dateRange = {
        startDate,
        endDate
    }

    useEffect( () => {
        dispatch({type: 'FETCH_ODDS', payload: dateRange})
    }, [])
    
    const markets = useSelector(store => store.odds)
    console.log('markets from store', markets)

    return (<>
        {/* <TestButtons /> */}
        <BetSlip/>
        <h1>Markets</h1>
        {markets.map( game => (
            <MarketsItem key={game.id} game={game}/>    
        ))}

    </>)
}

export default Markets 