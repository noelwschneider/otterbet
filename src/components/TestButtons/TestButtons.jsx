import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function TestButtons() {
    const dispatch = useDispatch()
    
    const testData = useSelector(store => store.test)
    const user = useSelector(store => store.user)
    const odds = useSelector(store => store.odds)
    const scores = useSelector(store => store.scores)
    
    const [testString, setTestString] = useState('')
    const [testArray, setTestArray] = useState([])

    const datesObject = {
        startDate: `2023-09-12`,
        endDate: `2023-09-19`
    }

    const sport = 'americanfootball_nfl'

    // ODDS
    const testOddsGet = () => {
        console.log('odds before dispatch:', odds)

        const oddsObject = {
            startDate: datesObject.startDate,
            endDate: datesObject.endDate,
            sport: sport
        }
        dispatch({ type: 'FETCH_ODDS', payload: oddsObject })
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

    const testScoresUpdate = async () => {
        // console.log('scores update button')

        const scoresData = {
            competition: 'american-football', 
            date: null
        }
        
        await dispatch({ type: 'UPDATE_SCORES', payload: scoresData})

        // await console.log(testData)
        // await setTestArray(testData)
    }

    // Entries
    const createEntry = () => {
        let defaultEntry = {
            default_entry: false,
            user_id: user.id,
            name: 'My first entry',
            type: 'sandbox',
            funds: 1000,
            contest_id: null // contest_id
        }

        dispatch({ type: 'CREATE_ENTRY', payload: defaultEntry})
    }

    const getEntry = () => {

        dispatch({ type: 'FETCH_ENTRY', payload: user.id})
    }


    
    
    // MARKETS PAGE
    const testGetMarketItems = () => {
        console.log('button works')
        dispatch({ type: 'FETCH_MARKETS' , payload: datesObject})
    }

    return (<>
        <h1>Odds</h1>
        <button onClick={testOddsGet} >Test odds GET (API)</button>
        <button onClick={testOddsPost} >Test odds.router POST</button>

        <br/>
        <br/>

        <h1>Scores/games</h1>
        <button onClick={testScoresGet}>Test scores get (API)</button>
        <button onClick={testScoresPost} disabled>Test scores POST</button>
        <button onClick={testScoresUpdate} >Test scores update</button>

        <br/>
        <br/>

        <h1>Entries</h1>
        <button onClick={getEntry} disabled>Get Entry</button>
        <button onClick={createEntry} disabled>Create Entry</button>
        

        <h1>Markets page</h1>
        <button onClick={testGetMarketItems} >Test get market items GET</button>

        
{/* 
        <h1>TEST DATA</h1>
        {testData.map( thing => (<>
            <p>{JSON.stringify(thing)}</p>
        </>))} 
*/}
    </>)
}

export default TestButtons