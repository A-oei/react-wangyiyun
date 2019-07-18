import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';

function NavigationBar() {
    return (
        <div className='top-navigation'>
            <div className='navigation-bar'>
                <a href="/#" className='bar-logo'>
                    网易云音乐
                </a>
                <ul className='bar-lists'>
                    {
                        navList.map(item =>
                            <li>
                                <a href="">
                                    {item.title}
                                </a>
                            </li>
                        )
                    }
                </ul>
                <div className='bar-search'>
                    <input type="text" placeholder='音乐/视频/电台/用户'/>
                </div>
                <div className='bar-creator'>
                    创作者中心
                </div>
                <div className='bar-login'>
                    <div href="" className='login-btn'>
                        登录
                    </div>
                    <ul className='login-options'>
                        {
                            loginList.map((item, index) =>
                                <li key={item.title + index}>
                                    <NavLink to={item.link}>
                                        <i/>
                                        {item.title}
                                    </NavLink>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

const navList = [
        {
            title: '发现音乐'
        },
        {
            title: '我的音乐'
        },
        {
            title: '朋友'
        },
        {
            title: '商城'
        },
        {
            title: '音乐人'
        },
        {
            title: '下载客户端'
        },
    ],
    loginList = [
        {
            title: '手机号登录',
            link: '/phoneLogin'
        },
        {
            title: '微信登录',
            link: '/phoneLogin'
        },
        {
            title: 'QQ登录',
            link: '/phoneLogin'
        },
        {
            title: '新浪微博登录',
            link: '/phoneLogin'
        },
        {
            title: '网易邮箱账号登录',
            link: '/phoneLogin'
        },
    ];
export default NavigationBar;
