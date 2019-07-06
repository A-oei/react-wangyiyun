import React, {Component} from 'react';
import axios from 'axios';

class HTTPTem extends Component {
    constructor(prop) {
        super(prop)
    }

    sendRequest() {
        axios.get('/user/detail', {
            params: {
                uid: 32953014
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('%c' + err, "color:red");
            })
    }

    render() {
        return (
            <div>
                <h2 onClick={this.sendRequest.bind(this)}>aixos click</h2>
            </div>
        )
    }
}

export default HTTPTem;
