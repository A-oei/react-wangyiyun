import React, {Component} from 'react';
import './carousel.scss';


class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            motion: true, //是否保留过渡效果,
            timer: '',
            bannerLists: []

        }
    }


    //检测是否越界
    judgeMax() {
        let max = this.props.bannerLists.length;
        if (this.state.index > max) {
            this.setState({
                motion: false,
                index: 1
            });
            return;
        }
    }

    judgeMin() {
        let max = this.props.bannerLists.length;
        this.setState({
            motion: false,
            index: max - 1
        })
        return;
    }


    //轮播
    componentDidMount() {
        console.log(this.props);
        let bannerLists = [...this.props.bannerLists];
        console.log(bannerLists, '1');
        bannerLists.push(bannerLists[0]);
        bannerLists.unshift(bannerLists[bannerLists.length - 1]);

        let timer = setInterval(_ => {
            this.setState({
                motion: true
            })
            this.setState({
                index: this.state.index + 1
            })
        }, 3000)

        this.setState({
            timer,
            bannerLists
        })

        console.log(this.state.bannerLists);
    }

    render() {
        return (
            <div className='carousel'>
                <div className='carousel-wrap'>
                    <ul className='wrap-carousel-list'>
                        {
                            this.props.bannerLists.map(item =>
                                <li className='carousel-list-item'>
                                    <img src={item.pic}/>
                                </li>
                            )
                        }
                    </ul>
                    <div className='wrap-download'>
                        <a href="https://music.163.com/#/download"/>
                        <p>pc 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                    <a href="" className='slide-btn-l'/>
                    <a href="" className='slide-btn-r'/>
                </div>
            </div>

        )
    }
}

export default Carousel;
