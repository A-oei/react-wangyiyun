/*-------------------
歌单封面模板
--------------------*/
import React from 'react';
import {NavLink} from 'react-router-dom';
import './songTem.scss';

function SongTem({link = '/', img = '', name = '未知歌单',id=''}) {

    return (
        <div className='song-tem' key={id}>
            <NavLink to={link} className='tem-bg'/>
            <img src={img} className='tem-img'/>
            <div className='tem-bottom'>
                <span/>
                <span className='play-volume'>{}</span>
                <span className='play-btn'/>
            </div>
            <NavLink className='tem-name' to={link}>{name}</NavLink>
        </div>
    )
}

export default SongTem;
