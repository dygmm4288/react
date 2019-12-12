import React, { memo } from 'react';

const RenderAverage = memo((info) => {
    const renderAverage = () => {
        let result = info.result,
            onReset = info.onReset;
        console.log(result, onReset);
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };
    return (
        <>
            {renderAverage}
        </>
    );
});

export default RenderAverage;