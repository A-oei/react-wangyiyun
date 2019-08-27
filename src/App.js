import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './component/NavigationBar';
import HTTPTem from './page/AxiosTem';


import PhoneLogin from './page/Login/PhoneLogin';
import Home from './page/Hone/index';
import SongListDetail from './page/SoneListDetail/index';

import {Switch, Route, Redirect} from 'react-router-dom';

import WarningLayer from '@/component/PopLayer/warningLayer.js';


function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/phoneLogin' component={PhoneLogin}/>
                <Route path='/songListsDetail' component={SongListDetail}/>
                <Redirect to='/home'/>
            </Switch>
            {WarningLayer}
        </div>
    );
}

export default App;
