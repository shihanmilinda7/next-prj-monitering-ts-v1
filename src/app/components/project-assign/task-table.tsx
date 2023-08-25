"use client";

import { useEffect, useState } from "react";
import { PrjAssignTaskTableRow } from "./task-table-row";

export const PrjAssignTaskTable = ({
  taskRowObjectsIn,
  tablePagination,
  setTaskRowObjects,
}: {
  taskRowObjectsIn: any[];
  tablePagination: number;
  setTaskRowObjects: (taskObject: any[]) => void;
}) => {
  const tableHeads = ["#", "Task Name", "Select"];

  const [taskRows, setTaskRows] = useState(taskRowObjectsIn);

  // const updateData = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   newTaskObject: any[]
  // ) => {
  //   setTaskRowObjects(newTaskObject);
  // };

  useEffect(() => {
    const q = [...taskRowObjectsIn];
    setTaskRows(q);
    // console.log("saddddddddd", q);
  }, [taskRowObjectsIn]);

  const updateTableRows = (newVal: any) => {
    const updatedArray = taskRows.map((r) =>
      r.taskid === newVal.taskid ? newVal : r
    );
    setTaskRows(updatedArray);
    setTaskRowObjects(updatedArray);
  };
  return (
    <div className="md:px-2 py-2 w-full">
      <div className="shadow rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-indigo-400">
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-4 uppercase text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {taskRows.map((tableRow: any, index: number) => (
              <PrjAssignTaskTableRow
                index={index}
                tableRowIn={tableRow}
                tablePagination={tablePagination}
                updateTableRows={updateTableRows}
              />
              //       <tr className="even:bg-blue-gray-50/50" key={tableRow.taskid}>
              //         <td className="text-left py-3 px-4 font-bold">
              //           {(tablePagination - 1) * 10 + (index + 1)}
              //         </td>
              //         <td className="text-left py-3 px-4">{tableRow.taskname}</td>
              //         <td className="text-left py-3 px-4">
              //           <div className="flex flex-row">
              //             <input
              //               type="checkbox"
              //               id="cb1"
              //               value={"cb1"}
              //               onChange={(e) =>
              //                 updateData(e, { ...tableRow, selected: e.target.value })
              //               }
              //               className="
              //     appearance-none h-6 w-6 bg-gray-400 rounded-full
              //     checked:bg-indigo-800 checked:scale-75
              //     transition-all duration-200 peer
              // "
              //             />
              //           </div>
              //         </td>
              //       </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
