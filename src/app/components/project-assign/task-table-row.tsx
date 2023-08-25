"use client";

import { useEffect, useState } from "react";

export const PrjAssignTaskTableRow = ({
  index,
  tableRowIn,
  tablePagination,
  updateTableRows,
}: {
  index: number;
  tableRowIn: any;
  tablePagination: number;
  updateTableRows: (taskRow: any) => void;
}) => {
  const [tableRow, setTableRow] = useState(tableRowIn);

  useEffect(() => {
    const q = {...tableRowIn}
    setTableRow(q)
  }, [tableRowIn]);

  const updateData = (newObject: any) => {
    setTableRow(newObject);
    updateTableRows(newObject);
  };

  return (
    <tr className="even:bg-blue-gray-50/50" key={tableRow.taskid}>
      <td className="text-left py-3 px-4 font-bold">
        {(tablePagination - 1) * 10 + (index + 1)}
      </td>
      <td className="text-left py-3 px-4">{tableRow.taskname}</td>
      <td className="text-left py-3 px-4">
        <div className="flex flex-row">
          <input
            type="checkbox"
            id="cb1"
            value="cb1"
            onChange={(e) =>
              updateData({ ...tableRow, selected: e.target.checked })
            }
            className="
appearance-none h-6 w-6 bg-gray-400 rounded-full 
checked:bg-indigo-800 checked:scale-75
transition-all duration-200 peer
"
          />
        </div>
      </td>
    </tr>
  );
};
