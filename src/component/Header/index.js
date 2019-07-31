/*------------
列表页眉
---------------*/

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss';


function Header({path = '/', title = 'title', slot, morePath = '/', more = '更多'}) {

    return (
        <div className='main-header'>
            <NavLink to={path} className='header-title'>{title}</NavLink>
            <div className='slot-content' dangerouslySetInnerHTML={{
                __html: slot
            }}/>
            <NavLink to={morePath} className='header-more'>
                {more}
                <i/>
            </NavLink>
        </div>
    )
}

export default Header;
