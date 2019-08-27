import React, {Component} from 'react';
import service from '@/services/songListDetail.js';

class SongListsDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        service.get_song_detail({id: 24381616})
            .then(res => {
                console.log(res, 'detail-res');
            })
    }

    render() {
        return (
            <div className='song-detail-wrap'>
                <div className='detail-list-wrap'>
                    <div className="detail-info">
                        <div className="info-cover">
                            <img src=""/>
                        </div>
                        <div className="info-introduction">

                        </div>
                    </div>
                    <div className="detail-lists">

                    </div>
                    <div className='detail-comment'>

                    </div>
                </div>
                <div className="song-lists-related">

                </div>
            </div>
        )


    }
}

export default SongListsDetail;