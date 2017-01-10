
import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'yellow'
}

export default class Hello1 extends Component {

    render() {
        return (
            <div>
                <h1 style={style}>这是hello1模块</h1>
            </div>
        )
    }
}
