import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function TestButtons() {
    const dispatch = useDispatch()
    
    const odds = useSelector(store => store.odds)
    console.log('odds in store:', odds)

    const games = useSelector(store => store.games)

    const scores = useSelector(store => store.scores)
    console.log('scores response:', scores)
    

    const [domData, setDomData] = useState('')
    const testOddsGet = () => {
        console.log('odds before dispatch:', odds)
        dispatch({ type: 'FETCH_ODDS' })
        console.log('odds after dispatch', odds)
    }

    const testOddsPost = () => {
        console.log('post button works')
        dispatch({ type: 'POST_ODDS', payload: odds })
    }

    const testGamesGet = () => {
        console.log('games get button works')
        dispatch({ type: 'FETCH_GAMES' })
    }

    const testGamesPost = () => {
        console.log('post games button works')
        dispatch({ type: 'POST_GAMES', payload: games })
    }

    const testScoresGet = () => {
        console.log('button works')
        dispatch({ type: 'FETCH_SCORES' })
    }

    const testGetMarketItems = () => {
        console.log('button works')
        dispatch({ type: 'FETCH_MARKETS' })
    }

    const testScoresPost = () => {
        console.log('button works')
        dispatch({ type: 'UPDATE_SCORES', payload: scores})
    }

    return (<>
        <button onClick={testOddsGet} disabled>Test odds GET (API)</button>

        <button onClick={testOddsPost} disabled>Test odds.router POST</button>

        <button onClick={testScoresGet}>Test scores get (API)</button>

        <button onClick={testGetMarketItems}>Test get market items GET</button>

        <button onClick={testScoresPost} disabled>Test scores POST</button>
    </>)
}

export default TestButtons