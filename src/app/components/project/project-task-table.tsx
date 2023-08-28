"use client";

import NewProjectTask from "./project-task-addnew";
import { TaskObjectTypes } from "./types";

export const ProjectTaskTable = ({
  taskRowObjects,
  arrayUpdateFuntion,
}: {
  taskRowObjects: TaskObjectTypes[];
  arrayUpdateFuntion: (
    taskObject?: TaskObjectTypes,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => void;
}) => {
  const tableHeads = [
    "#",
    "Task Name",
    "Task Description",
    "Start Date",
    "End Date",
    " ",
  ];
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
            {taskRowObjects.map((tableRow: TaskObjectTypes, index: number) =>
              tableRow.hasOwnProperty("rowStatus") ? null : (
                <tr className="even:bg-blue-gray-50/50" key={tableRow.taskid}>
                  <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
                  <td className="text-left py-3 px-4">{tableRow.taskname}</td>
                  <td className="text-left py-3 px-4">
                    {tableRow.taskdescription}
                  </td>
                  <td className="text-left py-3 px-4">{tableRow.startdate}</td>
                  <td className="text-left py-3 px-4">{tableRow.enddate}</td>
                  <td className="text-left py-3 px-4 cursor-pointer hover:text-amber-900 hover: ">
                    <NewProjectTask
                      arrayUpdateFuntion={arrayUpdateFuntion}
                      selRowObject={tableRow}
                      index={index}
                      buttonName="Edit Task"
                      delButton={true}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
