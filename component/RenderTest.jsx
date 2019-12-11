import React, { Component } from 'react';
class Test extends Component {
    state = {
        couter: 0,
    };
    onClick = () => {
        this.setState({});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }
    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}
export default Test;