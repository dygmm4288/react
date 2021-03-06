import React, { Component } from 'react';
import Try from './Try';
function getNumbers() { // 숫자 4개를 겹치지 않게 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};
const _ = {};
_.push = (list, value) => {
    return [...list, value];
}
class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        const { value, result, tries, answer } = this.state;
        if (value === answer.join('')) {
            this.setState({
                result: '홈런',
                tries: _.push(tries, { tries: this.state.value, result: '홈런!' })
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번넘게 틀려서 실패 답은 ${answer.join('')}`
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                    this.setState({
                        tries: _.push(tries, { tries: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다` }),
                        value: '',
                    });
                }
            }

        }
    };
    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        console.log(this.state.answer);
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도: `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        )
    }
}
export default NumberBaseBall;