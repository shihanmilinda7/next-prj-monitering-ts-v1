import TaskAddNew from "./addnew";
import { TaskObj, TaskObjExtend } from "./types";

export const TaskTable = ({
  taskRowData,
  setReloadTable,
}: {
  taskRowData: TaskObjExtend[];
  setReloadTable: () => void;
}) => {
  const tableHeads = [
    "#",
    "Task ID",
    "Staff Name",
    "Client",
    "Visit Count",
    "Category",
    "Status",
    "",
  ];

  console.log("ddd", taskRowData);
  return (
    <div className="md:px-2 py-2 w-full">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-purple-400">
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
            {taskRowData.map((tableRow: TaskObjExtend, index: number) => (
              <tr className="even:bg-purple-gray-50/50" key={tableRow.taskid}>
                <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
                <td className="text-left py-3 px-4">{tableRow.taskid}</td>
                <td className="text-left py-3 px-4">{tableRow.staffname}</td>
                <td className="text-left py-3 px-4">{tableRow.clientname}</td>
                <td className="text-left py-3 px-4">{tableRow.visitcount}</td>
                <td className="text-left py-3 px-4">{tableRow.categoryname}</td>
                <td className="text-left py-3 px-4">{tableRow.status}</td>
                <td className="text-left py-3 px-4 cursor-pointer hover:text-amber-900 hover: ">
                  <TaskAddNew
                    setReloadTable={setReloadTable}
                    buttonName="Edit | Delete"
                    selRowData={tableRow}
                    delButton={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
