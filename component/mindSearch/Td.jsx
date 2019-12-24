import React, { useContext, useCallback, memo, useMemo } from "react";
import {
	CODE,
	TableContext,
	OPEN_CELL,
	FLAG_CELL,
	QUESTION_CELL,
	NORMALIZE_CELL,
	CLICKED_MINE
} from "./MindSearch";

const getTdStyle = code => {
	switch (code) {
		case CODE.NORMAL:
		case CODE.MINE:
			return {
				background: "#444444"
			};
		case CODE.OPENED:
			return {
				background: "white"
			};
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return {
				background: "yellow"
			};
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return {
				background: "red"
			};
		default:
			return {
				background: "white"
			};
	}
};

const getTdText = code => {
	switch (code) {
		case CODE.NORMAL:
			return "";
		case CODE.MINE:
			return "x";
		case CODE.CLICKED_MINE:
			return "펑";
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return "!";
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return "?";
		default:
			return code || "";
	}
};
const Td = memo(({ cellIndex, rowIndex }) => {
	const { dispatch, tableData, halted } = useContext(TableContext);
	const onClickTd = useCallback(() => {
		if (halted) {
			return;
		}
		const row = rowIndex,
			cell = cellIndex;
		switch (tableData[rowIndex][cellIndex]) {
			case CODE.OPENED:
			case CODE.FLAG:
			case CODE.FLAG_MINE:
			case CODE.QUESTION:
			case CODE.QUESTION_MINE:
				return;
			case CODE.NORMAL:
				dispatch({ type: OPEN_CELL, row, cell });
				return;
			case CODE.MINE:
				dispatch({ type: CLICKED_MINE, row, cell });
				return;
			case CODE.QUESTION_MINE:
		}
	}, [tableData[rowIndex][cellIndex], halted]);

	const onRightClickTd = useCallback(
		e => {
			const row = rowIndex,
				cell = cellIndex;
			if (halted) {
				return;
			}
			e.preventDefault();
			switch (tableData[rowIndex][cellIndex]) {
				case CODE.NORMAL:
				case CODE.MINE:
					dispatch({ type: FLAG_CELL, row, cell });
					return;
				case CODE.FLAG_MINE:
				case CODE.FLAG:
					dispatch({ type: QUESTION_CELL, row, cell });
					return;
				case CODE.QUESTION_MINE:
				case CODE.QUESTION:
					dispatch({ type: NORMALIZE_CELL, row, cell });
					return;
				default:
					return;
			}
		},
		[tableData[rowIndex][cellIndex], halted]
	);
	return useMemo(() => {
		<td
			style={getTdStyle(tableData[rowIndex][cellIndex])}
			onClick={onClickTd}
			onContextMenu={onRightClickTd}>
			{getTdText(tableData[rowIndex][cellIndex])}
		</td>;
	}, [tableData[rowIndex][cellIndex]]);
});

export default Td;
