import React from "react";
import Tr from "./Tr.jsx";

const Table = ({ tableData, dispatch }) => {
	return (
		<table>
			{Array(tableData.length)
				.fill()
				.map((tr, i) => (
					<Tr
						key={`tr${i}`}
						rowIndex={i}
						rowData={tableData[i]}
						dispatch={dispatch}
					/>
				))}
		</table>
	);
};

export default Table;
