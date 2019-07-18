import React, {Component} from 'react';
import axios from 'axios';
import BilateralInput from '../core/bilateralInputt';


import './index.scss';

class HTTPTem extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            inputVal: "www",
        }
    }

    sendRequest() {

        axios.get('http://localhost:3000/login/cellphone?phone=18621747040&password=123456')
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
                {BilateralInput.call(this, {stateKey: "inputVal"})}
                <h2 onClick={this.sendRequest.bind(this)}>aixos click</h2>
            </div>
        )
    }
}

export default HTTPTem;
