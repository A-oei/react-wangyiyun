import React from "react";
/*===================
react 双向绑定组件
==================*/

const BilateralInput = function (options) {

    const {stateKey, type = 'text', className = 'inputDefault'} = options,
        {inputVal = ''} = this.state, that = this;

    // 监听get，set方法，set时自动更新state
    Object.defineProperty(this.state, stateKey, {
        get() {
            return inputVal;
        },
        set(val) {
            that.setState({[stateKey]: val});
        }
    });

    const handleChange = e => {
        this.setState({[stateKey]: e.target.value});
    };



    const content = (
        <input
            type={type}
            className={className}
            value={inputVal}
            onChange={handleChange}
        />
    )
    return content;
}
export default BilateralInput;
