import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function TestButtons() {
    const dispatch = useDispatch()
    
    const user = useSelector(store => store.user)
    const odds = useSelector(store => store.odds)
    const scores = useSelector(store => store.scores)
    

    // ODDS
    const testOddsGet = () => {
        console.log('odds before dispatch:', odds)
        dispatch({ type: 'FETCH_ODDS' })
        console.log('odds after dispatch', odds)
    }

    const testOddsPost = () => {
        console.log('post button works')
        dispatch({ type: 'POST_ODDS', payload: odds })
    }

    // SCORES
    const testScoresGet = () => {
        console.log('button works')
        dispatch({ type: 'FETCH_SCORES' })
    }

    const testScoresPost = () => {
        console.log('button works')
        dispatch({ type: 'ADMIN_POST_SCORES', payload: scores})
    }

    // Entries
    const createEntry = () => {
        let defaultEntry = {
            user_id: user.id,
            name: 'My first entry',
            type: 'defaultSandbox',
            funds: 1000,
            contest_id: null // contest_id
        }

        dispatch({ type: 'CREATE_ENTRY', payload: defaultEntry})
    }

    // MARKETS PAGE
    const testGetMarketItems = () => {
        console.log('button works')
        dispatch({ type: 'FETCH_MARKETS' })
    }

    

    return (<>
        <h1>Odds</h1>
        <button onClick={testOddsGet} disabled>Test odds GET (API)</button>
        <button onClick={testOddsPost} disabled>Test odds.router POST</button>

        <br/>
        <br/>

        <h1>Scores/games</h1>
        <button onClick={testScoresGet} disabled>Test scores get (API)</button>
        <button onClick={testScoresPost} disabled>Test scores POST</button>

        <br/>
        <br/>

        <h1>Entries</h1>
        <button onClick={createEntry}>Create Entry</button>

        <h1>Markets page</h1>
        <button onClick={testGetMarketItems}>Test get market items GET</button>
    </>)
}

export default TestButtons