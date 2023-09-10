import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import MarketsItem from './MarketsItem';
import BetSlip from './BetSlip';

function Markets() {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch({type: 'FETCH_MARKETS'})
    }, [])
    
    const markets = useSelector(store => store.markets)
    // console.log('markets from store', markets)

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