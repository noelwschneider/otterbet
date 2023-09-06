import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Item component
import MarketsItem from './MarketsItem';

// Test Buttons
//& Eventually remove, of course
import TestButtons from '../TestButtons/TestButtons';

function Markets() {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch({type: 'FETCH_MARKETS'})
    }, [])

    const markets = useSelector(store => store.markets)
    console.log(markets)
    

    return (<>
        <TestButtons />
        <h1>Markets</h1>
        {markets.map( game => (<>
            <MarketsItem game={game}/>
        </>))}

    </>)
}

export default Markets 