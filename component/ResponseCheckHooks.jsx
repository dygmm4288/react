import React, { useState, useRef } from 'react';
import RenderAverage from './renderAverage';

function log(value) {
    console.log(value);
    return value;
};

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const setScreen = (state, message) => {
        setState(state);
        setMessage(message);
        return [state, message];
    };

    const onClickScreen = () => {
        if (state === 'waiting') {
            setScreen('ready', '초록색이 되면 클릭하세요');
            timeOut.current = setTimeout(() => {
                setScreen('now', '지금 클릭!');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (state === 'ready') {
            setScreen('waiting', '너무 성급하시군요! 초록색이 된 후에 클릭하세요!');
            clearTimeout(timeOut.current);
        } else if (state === 'now') {
            endTime.current = new Date();
            setScreen('waiting', '클릭해서 시작하세요.');
            setResult((prev) => {

                return [
                    ...prev, endTime.current - startTime.current
                ];
            });
        }
    };
    const onReset = () => {
        setResult([]);
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}>
                {message}
            </div>
            <RenderAverage info={{ result: result, onReset: onReset }} />
        </>
    );
};

export default ResponseCheck;