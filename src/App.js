import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './component/NavigationBar';
import HTTPTem from './page/AxiosTem';
import Carousel from './component/Carousel';

import PhoneLogin from './page/Login/PhoneLogin';

import {Switch, Route, Redirect} from 'react-router-dom';


/* <header className="App-header">
                <HTTPTem/>
            </header>*/



function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Carousel/>
            <Switch>
                <Route path='/phoneLogin' component={PhoneLogin}/>
            </Switch>
            <HTTPTem></HTTPTem>

        </div>
    );
}

export default App;
