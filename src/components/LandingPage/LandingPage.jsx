import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const dispatch = useDispatch();
  const odds = useSelector(store => store.odds)
  const games = useSelector(store => store.games)

  const onLogin = (event) => {
    history.push('/login');
  };

  const testAPIGet = () => {
    console.log('odds before dispatch:', odds)
    dispatch({type: 'FETCH_ODDS'})
    console.log('odds after dispatch', odds)
  }

  const testPost = () => {
    console.log('post button works')
    dispatch({type: 'POST_ODDS', payload: odds})
  }

  const testGamesGet = () => {
    console.log('games get button works')
    dispatch({type: 'FETCH_GAMES'})
  }

  const testGamesPost = () => {
    console.log('post games butotn works')
    dispatch({type: 'POST_GAMES', payload: games})
  }

  const testScoresGet = () => {
    console.log('button works')
    dispatch({type: 'FETCH_SCORES'})
  }

  return (
    <div className="container">
      <h2>{heading}</h2>

      <button onClick={testAPIGet} disabled>Test odds.router GET (API)</button>

      <button onClick={testPost} disabled>Test odds.router POST</button>

      <button onClick={testGamesGet} disabled>Test odds.router games GET</button>

      <button onClick={testGamesPost} disabled>Test odds.router games POST</button>

      <button onClick={testScoresGet}>Test scores get</button>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>

          <p>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </p>

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
