import React from 'react';
import {NavLink} from 'react-router-dom';
import './discTem.scss';

function DiscTem({discLink = '/', img = '', discTitle = '未知名称', titleLink = '/', singerLink = '/', singer = '未知歌手'}) {
    return (
        <div className='disc-tem'>
            <NavLink to={discLink} className='tem-bg'/>
            <img src={img} className='penetrate'/>
            <span className='music-play'/>
            <NavLink to={titleLink} className='disc-title line-omit'>{discTitle}</NavLink>
            <NavLink to={singerLink} className='singer line-omit'>{singer}</NavLink>
        </div>
    )
}

export default DiscTem;
