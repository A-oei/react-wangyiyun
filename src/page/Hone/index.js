import React, {Component} from 'react';
import Carousel from '@/component/Carousel';
import Header from '@/component/Header'
import {NavLink} from 'react-router-dom';

/*--------------
组件
---------------*/
//热门推荐
import SongTem from '@/component/SongTem';
//新碟上架
import DiscTem from '@/component/DiscTem';


import services from '../../services/home';
import './home.scss';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: `
                   <div class="h-classify-lists">
                       <a href="/huayu">华语</a>
                       <span>|</span>
                       <a>流行</a>
                       <span>|</span>
                       <a>摇滚</a>
                       <span>|</span>
                       <a>民谣</a>
                       <span>|</span>
                       <a>电子</a>
                    </div>`,

            /*--------------------
            轮播图
            ---------------------*/
            bannerLists: [],
            /*-------------------
            热门推荐
            ----------------------*/
            recommendLists: [],
            /*------------
            新碟上架
            ------------*/
            nRecordLists: [],
            index: 0,//轮播
            width: 655,//轮播宽度
            listsStyle: 'translateX(0)',
            motion: true,
            /*--------------------
            榜单
            --------------*/
            leaderboardLists: [],
            /*-----------------
            入驻歌手
            ---------------*/
            enteringList: []
        }


        this.carouselLists = React.createRef();
        this.listsWrap = React.createRef();
    }

    //
    componentDidMount() {
        services.get_h_recommend()
            .then(res => {
                let rdata = res.result.slice(0, 8);

                this.setState({
                    recommendLists: rdata
                })
            })

        this.getNewSong();

        this.getHotRecommend();

        ['3', '0', '2'].forEach(item => {
            this.getLeaderboardList(item)
        })

        this.getEnteringList({cat: '5001', limit: 5})

    }

    //获取推荐歌曲
    getNewSong() {
        services.get_new_song()
            .then(res => {
                console.log(res.banners, 'res');
                this.setState({
                    bannerLists: res.banners
                })
            })
    }

    //获取热门推荐
    getHotRecommend() {
        services.get_n_record()
            .then(res => {
                res.albums.splice(-2);

                let rdata = [...res.albums],
                    l = rdata.length,
                    i = 0;
                //
                for (; i < l / 2; i++) {
                    rdata.push(res.albums[i]);
                    rdata.unshift(res.albums[l - i - 1]);
                }

                this.setState({
                    nRecordLists: rdata
                })

                //获取轮播图宽度
                // this.listsWrap.current.clientWidth && (this.width = this.listsWrap.current.clientWidth);
            })
    }

    //获取榜单
    getLeaderboardList(idx) {
        services.get_Leaderboard({idx})
            .then(res => {
                let rdata = this.state.leaderboardLists,
                    tracks = res.playlist.tracks.splice(0, 10);

                rdata.push({
                    name: res.playlist.name,
                    cover: res.playlist.coverImgUrl,
                    id: res.playlist.id,
                    tracks
                })

                this.setState({
                    leaderboardLists: rdata
                })
                console.log(this.state.leaderboardLists);
            })
    }

    //获取入驻歌手列表
    getEnteringList(params) {
        services.get_entering_list(params)
            .then(res => {
                this.setState({
                    enteringList: res.artists
                })
            })
    }

    //点击轮播
    Carousel(index) {

        let i = this.state.index;
        i += index;
        this.setState({
            listsStyle: `translateX(${(-this.state.width * i)}px)`,
        })

        this.setState({
            index: i
        })
    }

    TransitionEnd() {

    }

    render() {
        return (
            <div className='home'>

                <Carousel bannerLists={this.state.bannerLists}/>

                <div className='home-content'>
                    <div className='content-left'>

                        <div className='h-recommend'>
                            {Header({
                                path: '/', title: '热门推荐',
                                morePath: '/', slot: this.state.slot
                            })}
                            <div className="recommend-lists">
                                {
                                    this.state.recommendLists.map(item =>
                                        SongTem({
                                            name: item.name,
                                            img: item.picUrl,
                                            id: item.id
                                        })
                                    )
                                }
                            </div>
                        </div>

                        <div className='new-record'>
                            {Header({path: '/', title: '新碟上架', morePath: '/',})}
                            <div className='record-lists'>
                                <span onClick={this.Carousel.bind(this, -1)}/>
                                <span onClick={this.Carousel.bind(this, 1)}/>
                                <div className='lists-wrap' ref={this.listsWrap}>
                                    <ul ref={this.carouselLists}
                                        style={{transform: this.state.listsStyle}}
                                        className={this.state.motion ? 'transition' : ''}
                                        onTransitionEnd={this.TransitionEnd.bind(this)}
                                    >
                                        {
                                            this.state.nRecordLists.map((item, index) =>
                                                <li key={index}>
                                                    {DiscTem({
                                                        img: item.blurPicUrl,
                                                        discTitle: item.name,
                                                        singer: item.artist.name
                                                    })}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='leaderboard'>
                            {Header({path: '/', title: '榜单', morePath: '/',})}
                            <div className='leaderboard-list'>
                                {
                                    this.state.leaderboardLists.map(item =>
                                        <ul>
                                            <li className='LeaderboardTitle'>
                                                <img src={item.cover}/>

                                                <div className='operating'>
                                                    <span className='operating-name'>
                                                    {item.name}
                                                    </span>
                                                    <NavLink className='play-btn'/>
                                                    <NavLink className='collection-btn'/>
                                                </div>
                                            </li>
                                            {
                                                item.tracks.map((list, i) =>
                                                    <li>
                                                        <s>{i + 1}</s>
                                                        <NavLink to='/'>
                                                            {list.al.name}
                                                        </NavLink>
                                                        <div className='single-operation'>
                                                            <NavLink to='/'/>
                                                            <NavLink to='/'/>
                                                            <NavLink to='/'/>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                            <li>
                                                <NavLink to='/'>查看全部 &gt;</NavLink>
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='w-info'>
                            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                            <div className='info-login-btn'>
                                用户登录
                            </div>
                        </div>

                        <ul className='entering-list list-wrap'>
                            <li className='title'>
                                <span>
                                    入驻歌手
                                </span>
                                <NavLink to='/'>查看全部&gt;</NavLink>
                            </li>
                            {
                                this.state.enteringList.map(item =>
                                    <li key={item.id}>
                                        <img src={item.img1v1Url}/>
                                        <span>
                                            {item.name}
                                        </span>
                                    </li>
                                )
                            }
                        </ul>

                        <div className='to-musician list-wrap'>
                            申请成为网易音乐人
                        </div>

                    </div>

                </div>
                <footer className='home-footer'>
                    <div>
                        <div className='footer-left'>
                            <ul>
                                <li>
                                    <NavLink>服务条款</NavLink>
                                </li>
                                <li/>
                                <li>
                                    <NavLink>隐私政策</NavLink>
                                </li>
                                <li/>
                                <li>
                                    <NavLink>
                                        版权投诉指引
                                    </NavLink>
                                </li>
                                <li/>
                                <li>
                                    <NavLink>
                                        服务条款
                                    </NavLink>
                                </li>
                                <li/>
                            </ul>
                            <p>网易公司版权所有©1997-2019&nbsp;&nbsp;杭州乐读科技有限公司运营：<a
                                href="http://p1.music.126.net/03WF0APmm-J0TqdbOc8-XQ==/109951163649544962.png">浙网文[2018]3506-263号</a>
                            </p>
                            <p>违法和不良信息举报电话：0571-89853516 举报邮箱：<a
                                href="https://music.163.com/mailto:ncm5990@163.com">ncm5990@163.com</a></p>
                        </div>
                        <ul className='footer-right'>
                            <li>
                                <a href="https://music.163.com/st/userbasic#/auth"></a>
                            </li>
                            <li>
                                <a href="https://music.163.com/nmusician/web/index"></a>
                            </li>
                            <li>
                                <a href="https://music.163.com/web/reward"></a>
                            </li>
                            <li>
                                <a href="https://music.163.com/uservideo#/plan"></a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Home;
