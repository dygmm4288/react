import React, { useCallback, useRef, useEffect, memo, useMemo } from "react";
import { CLICK_CELL } from "./TicTacToe.jsx";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
	console.log("td rendered");
	const ref = useRef([]);
	useEffect(() => {
		//어떤게 바뀌고 어떤게 안바뀌는지 바뀌는게 있다면 false
		//false가 있다면 그것때문에 리랜더링을 하는 것이다.
		console.log(
			rowIndex === ref.current[0],
			cellIndex === ref.current[1],
			dispatch === ref.current[2],
			cellData === ref.current[3]
		);
		console.log(cellData, ref.current[3]);
		ref.current = [rowIndex, cellIndex, dispatch, cellData];
	}, [rowIndex, cellIndex, dispatch, cellData]);

	const onClickTd = useCallback(() => {
		if (cellData) {
			//기존에 데이터가 있으면 끊어버리기
			return;
		}
		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
	}, [cellData]);
	return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
