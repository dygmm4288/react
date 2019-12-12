const React = require('react');
const { useState, useRef } = React;
import Try from './Try';
/* function */
const _ = {};
_.push = (list, value) => {
    let new_list;
    new_list = [...list, value];
    return new_list;
};
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};
const BaseBall = () => {
    /* state */
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    /*  ref */
    const inputRef = useRef(null);
    const reGame = () => {
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런');
            setTries(_.push(tries, { tries: value, result: '홈런!' }));
            reGame('홈런!');
            inputRef.current.focus();
        } else {
            const answerArray = value.split('').map(v => parseInt(v));
            let strike = 0, ball = 0;
            if (tries.length >= 9) {
                setResult('10번넘게 틀려서 실패! 답은 ' + answer.join(''));
                reGame('땡!');

            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                    setTries(
                        _.push(tries,
                            { tries: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }));
                }
            }
            inputRef.current.focus();
        }
    };
    const onChangeInput = (e) => {
        return setValue(e.target.value);
    };
    console.log(answer);
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} type="text" />
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try keys={`${i + 1}차 시도: `} tryInfo={v} />
                    );
                })}
            </ul>
        </>
    );
};

export default BaseBall;