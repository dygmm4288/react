import React, { useContext, memo } from "react";
import Td from "./Td.jsx";
import { TableContext } from "./MindSearch";
const Tr = memo(({ rowIndex }) => {
	const { tableData } = useContext(TableContext);
	return (
		<tr>
			{tableData[0] &&
				Array(tableData[0].length)
					.fill()
					.map((td, i) => <Td cellIndex={i} rowIndex={rowIndex} />)}
		</tr>
	);
});

export default Tr;
