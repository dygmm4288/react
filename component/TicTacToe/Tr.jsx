import React, { useEffect, useRef, memo, useMemo } from "react";
import Td from "./Td.jsx";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
	return (
		<tr>
			{Array(rowData.length)
				.fill()
				.map((tr, i) =>
					useMemo(
						() => (
							<Td
								key={i}
								dispatch={dispatch}
								rowIndex={rowIndex}
								cellData={rowData[i]}
								cellIndex={i}>
								{""}
							</Td>
						),
						[rowData[i]]
					)
				)}
		</tr>
	);
});

export default Tr;
