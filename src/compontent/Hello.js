
import './Hello.css';
import './Hello.scss';

import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'blue'
}


// 分块或者是异步加载的写法
require.ensure([], () => {
    // All the code in here, and everything that is imported
    // will be in a separate file
    var Hello1=require('./Hello1');
},'hello1');

export default class Hello extends Component {

    render() {
        return (
            <div>
                <h1 style={style} onClick={()=>this.myClick("fdfdf",23)}>5期lallalalla!!!!!!!</h1>
                <br/>
                <img/>
            </div>
        )
    }
}
