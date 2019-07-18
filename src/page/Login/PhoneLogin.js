import React, {Component} from 'react';
import http from '../../core/require';
import './PhoneLogin.scss';

import WarningLayer from '@/component/PopLayer/warningLayer.js';


const otherList = [
    {
        title: '微信登录'
    },
    {
        title: 'QQ登录'
    },
    {
        title: '微博登录'
    },
    {
        title: '网易邮箱账号登录'
    },
]

class PhoneLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 2,//状态,
            phone: '',//手机号
            password: '',//密码,
            inputval: "www",
        }
    }

    changeStatus(status, e) {
        e.preventDefault();
        this.setState({
            status: status
        })
    }

    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }

    //登录
    submit(e) {
        e.preventDefault();
        http.get('login/cellphone', {
            phone: this.state.phone,
            password: this.state.password
        })
            .then(res => {
                {WarningLayer({status: true, type: 'success', content: '登录成功 (￣▽￣)／'})}
            })
            .catch(err => {
                {WarningLayer({status: true, type: 'error', content: '登录失败 (￣▽￣)／'})}
            })
    }

    render() {

        let header, loginLabel, pwaLabel, contentFooter, footer, content,
            status = this.state.status;


        if (status === 0) {
            header = <header className='login-header'>手机号登陆</header>
            loginLabel = null;
            pwaLabel = null;
            contentFooter =
                <div className='content-footer'>
                    <div className='footer-left'>
                        <input type="checkbox" id="automatic"/>
                        <label htmlFor="automatic">自动登录</label>
                    </div>

                    <a href="">
                        忘记密码
                    </a>

                    <input type="button" className='footer-login' value='登录'
                           onClick={this.submit.bind(this)}
                    />
                </div>
            footer = <footer>
                <a href="" className='footer-other' onClick={this.changeStatus.bind(this, 2)}>
                    &lt;  其他方式登录
                </a>
                <a onClick={this.changeStatus.bind(this, 1)}>
                    没有账号？免费注册 &gt;
                </a>
            </footer>
        }
        else if (status === 1) {
            header = <header className='login-header'>手机号注册</header>
            loginLabel = <label>手机号：</label>
            pwaLabel = <label>密码：</label>
            contentFooter =
                <div className='content-footer'>
                    <input type="button" value='下一步'/>
                </div>
            footer = <footer>
                <a className='footer-other' onClick={this.changeStatus.bind(this, 0)}>
                    &lt;  返回登录
                </a>
            </footer>
        }
        else if (status === 2) {
            header = <header className='login-header'>登录</header>;
        }

        let login = <div className='login-content'>

                {loginLabel}
                <div className='content-iphone'>
                    <select name="1" id="">
                        <option value="2">+86</option>
                        <option value="1">+96</option>
                        <option value="3">+46</option>
                    </select>
                    <input type="text" placeholder='请输入手机号' value={this.state.phone}
                           onChange={this.handleChange.bind(this, 'phone')}/>
                </div>
                {pwaLabel}
                <input type="password" placeholder='请输入密码' className='content-pwa'
                       value={this.state.password}
                       onChange={this.handleChange.bind(this, 'password')}/>

                {contentFooter}
            </div>,
            other = <div className='login-content-other'>
                <div className="login-wrap">
                    <div className="wrap-img"/>
                    <a type="button" className='wrap-iphone' onClick={this.changeStatus.bind(this, 0)}>
                        手机号登录
                    </a>
                    <a type="button" className='wrap-registered' onClick={this.changeStatus.bind(this, 1)}>
                        注册
                    </a>
                </div>
                <div className="other-wrap">
                    <ul>
                        {
                            otherList.map(((item, index) =>
                                    <li key={index}>
                                        <i/>
                                        <span>{item.title}</span>
                                    </li>
                            ))
                        }
                    </ul>
                </div>
            </div>;

        if (status === 2) {
            content = other
        }
        else {
            content = login;
        }

        return (
            <div className='phone-login'>
                {header}
                {content}
                {footer}
            </div>
        )
    }
}


export default PhoneLogin;
