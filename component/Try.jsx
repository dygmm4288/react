import React, { Component } from 'react';
const { memo } = require('react');
// class Try extends Component {

//     render() {
//         const { tryInfo } = this.props;
//         return (
//             <li>
//                 <div>{tryInfo.tries}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }
const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});
export default Try;