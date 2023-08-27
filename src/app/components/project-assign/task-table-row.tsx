"use client";

import { setsaved, setunsaved } from "@/store/saveSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

export const PrjAssignTaskTableRow = ({
  key,
  index,
  tableRowIn,
  tablePagination,
  updateTableRows,
}: {
  key: number;
  index: number;
  tableRowIn: any;
  tablePagination: number;
  updateTableRows: (taskRow: any) => void;
}) => {
  const [tableRow, setTableRow] = useState(tableRowIn);
  const save = useSelector((state: any) => state.saveReducer.saveState);
  const dispatch = useDispatch();
  // console.log("save",save,)

  useEffect(() => {
    const q = { ...tableRowIn };
    setTableRow(q);
  }, [tableRowIn]);

  const updateData = (newObject: any) => {
    setTableRow(newObject);
    updateTableRows(newObject);
    dispatch(setunsaved())
    // console.log("save",save,)
  };

  return (
    <tr className="even:bg-blue-gray-50/50" key={key}>
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
            checked={tableRow.selected}
            onChange={(e) =>
              updateData({ ...tableRow, selected: e.target.checked })
            }
            className="
            form-checkbox h-5 w-5 text-gray-600"
          />
        </div>
      </td>
    </tr>
  );
};
