"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PrjAssignProjectTable = ({
  projectTableClickEvent,
  projectRowObjects,
  tablePagination,
  staffid,
}: {
  projectTableClickEvent: (projectid: number, projectname: string) => void;
  projectRowObjects: any[];
  tablePagination: number;
  staffid?: number;
}) => {
  const tableHeads = ["#", "Project Name"];
  const [selRow, setSetRow] = useState<any>();

  const selectRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    index: number,
    projectid: number,
    projectname: string
  ) => {
    if (staffid) {
      setSetRow(index);
      projectTableClickEvent(projectid, projectname);
    }else{
      toast.info("No staff selected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {}, [selRow]);

  return (
    <div className="md:px-2 py-2 w-full">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
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
            {projectRowObjects.map((tableRow: any, index: number) => (
              <tr
                onClick={(e) =>
                  selectRow(e, index, tableRow.projectid, tableRow.projectname)
                }
                className={
                  index != selRow
                    ? "bg-blue-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
                    : "bg-indigo-400  cursor-pointer transition ease-in duration-500"
                }
                key={tableRow.staffid}
              >
                <td className="text-left py-3 px-4 font-bold">
                  {(tablePagination - 1) * 10 + (index + 1)}
                </td>
                <td className="text-left py-3 px-4">{tableRow.projectname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
