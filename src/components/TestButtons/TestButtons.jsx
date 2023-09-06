import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function TestButtons() {

    const odds = useSelector(store => store.odds)
    const games = useSelector(store => store.games)

    const testAPIGet = () => {
        console.log('odds before dispatch:', odds)
        dispatch({ type: 'FETCH_ODDS' })
        console.log('odds after dispatch', odds)
    }

    const testPost = () => {
        console.log('post button works')
        dispatch({ type: 'POST_ODDS', payload: odds })
    }

    const testGamesGet = () => {
        console.log('games get button works')
        dispatch({ type: 'FETCH_GAMES' })
    }

    const testGamesPost = () => {
        console.log('post games butotn works')
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

    return (<>
        <button onClick={testAPIGet} disabled>Test odds.router GET (API)</button>

        <button onClick={testPost} disabled>Test odds.router POST</button>

        <button onClick={testGamesGet} disabled>Test odds.router games GET</button>

        <button onClick={testGamesPost} disabled>Test odds.router games POST</button>

        <button onClick={testScoresGet}>Test scores get</button>

        <button onClick={testGetMarketItems}>Test get market items GET</button>
    </>)
}

export default TestButtons