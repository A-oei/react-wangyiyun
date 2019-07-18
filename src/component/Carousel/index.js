import React, {Component} from 'react';
import './index.scss';


class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carouselLists: [
                {
                    content: 'http://p1.music.126.net/u77rLXO71wdpRFUxkScqKg==/109951164202222658.jpg'
                }
            ]
        }
    }

    render() {
        return (
            <div className='carousel'>
                <ul className='carousel-wrap'>
                    {
                        this.state.carouselLists.map(item =>
                            <li className='wrap-item'>
                                <img src={item.content}/>
                            </li>
                        )

                    }
                    <li className='wrap-download'>
                        <a href="https://music.163.com/#/download"/>
                        <p>pc 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </li>

                    <a href="" className='slide-btn-l'/>
                    <a href="" className='slide-btn-r'/>
                </ul>
            </div>
        )
    }
}

export default Carousel;
