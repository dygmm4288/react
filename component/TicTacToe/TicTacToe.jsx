import React, { useState, useReducer, useCallback, useEffect } from "react";
import Table from "./Table.jsx";
import "./Table.css";
const initialState = {
	winner: "",
	turn: "O",
	tableData: [
		["", "", ""],
		["", "", ""],
		["", "", ""]
	],
	recentCell: [-1, -1]
};
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_TABLE_DATA";
const reducer = (state, action) => {
	switch (action.type) {
		case SET_WINNER:
			//state.winner = action.winner; 이렇게 안됨
			return {
				...state,
				winner: action.winner
			};
		case CLICK_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...tableData[action.row]];
			tableData[action.row][action.cell] = state.turn;
			return {
				...state,
				tableData,
				recentCell: [action.row, action.cell]
			};
		}
		case CHANGE_TURN: {
			return {
				...state,
				turn: state.turn === "O" ? "X" : "O"
			};
		}
		case RESET_GAME: {
			return {
				...state,
				turn: "O",
				tableData: [
					["", "", ""],
					["", "", ""],
					["", "", ""]
				],
				recentCell: [-1, -1]
			};
		}
	}
};
const TicTacToe = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { tableData, turn, winner, recentCell } = state;
	const onClickTable = useCallback(() => {
		dispatch({ type: "SET_WINNER", winner: "O" }); //action개체
	}, []);
	//비동기 처리는 useEffect
	useEffect(() => {
		const [row, cell] = recentCell;
		console.log(row, cell);
		let win = false;
		if (row < 0) {
			return;
		}
		if (
			tableData[row][0] === turn &&
			tableData[row][1] === turn &&
			tableData[row][2] === turn
		) {
			win = true;
		}
		if (
			tableData[0][cell] === turn &&
			tableData[1][cell] === turn &&
			tableData[2][cell]
		) {
			win = true;
		}
		if (
			tableData[0][0] === turn &&
			tableData[1][1] === turn &&
			tableData[2][2]
		) {
			win = true;
		}
		if (
			tableData[0][2] === turn &&
			tableData[1][1] === turn &&
			tableData[2][0]
		) {
			win = true;
		}
		if (win) {
			dispatch({ type: SET_WINNER, winner: turn });
			dispatch({ type: RESET_GAME });
		} else {
			//무승부 검사
			let all = true;
			tableData.forEach(row => {
				row.forEach(cell => {
					if (!cell) {
						all = false;
					}
				});
			});
			if (all) {
				dispatch({ type: RESET_GAME });
			} else {
				dispatch({ type: CHANGE_TURN });
			}
		}
	}, [recentCell]);
	return (
		<>
			<Table
				onClick={onClickTable}
				tableData={state.tableData}
				dispatch={dispatch}
			/>
			{state.winner && <div>{state.winner}님의 승리</div>}
		</>
	);
};

export default TicTacToe;
