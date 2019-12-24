import React, { useContext, memo } from "react";
import Tr from "./Tr.jsx";
import { TableContext } from "./MindSearch.jsx";
const Table = memo(() => {
	const { tableData } = useContext(TableContext);
	return (
		<table>
			{Array(tableData.length)
				.fill()
				.map((tr, i) => (
					<Tr rowIndex={i} />
				))}
		</table>
	);
});

export default Table;
