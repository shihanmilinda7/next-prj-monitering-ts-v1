"use client";

import Link from "next/link";
import NewProjectTask from "./project-task-addnew";
import { ProjectObjectTypes, TaskObjectTypes } from "./types";
import { AiFillEdit } from "react-icons/ai";
import { FcViewDetails } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const ProjectTable = ({
  projectRowObjects,
  tablePagination,
}: {
  projectRowObjects: ProjectObjectTypes[];
  tablePagination: number;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const tableHeads = [
    "#",
    "Name",
    "Description",
    "Start Date",
    "End Date",
    "Status",
    " ",
  ];

  const iconCallBack = (projectid: any) => {
    router.push("/project/new-project?projectid=" + projectid);
  };
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
            {projectRowObjects.map(
              (tableRow: ProjectObjectTypes, index: number) => (
                <tr
                  className="even:bg-purple-gray-50/50"
                  key={tableRow.projectid}
                >
                  <td className="text-left py-3 px-4 font-bold">
                    {(tablePagination - 1) * 10 + (index + 1)}
                  </td>
                  <td className="text-left py-3 px-4">
                    {tableRow.projectname}
                  </td>
                  <td className="text-left py-3 px-4">
                    {tableRow.projectdescription}
                  </td>
                  <td className="text-left py-3 px-4">{tableRow.startdate}</td>
                  <td className="text-left py-3 px-4">{tableRow.enddate}</td>
                  <td className="text-left py-3 px-4">
                    {tableRow.projectstatus}
                  </td>
                  <div className="flex items-center justify-center p-4">
                    {userRole == "User" ? (
                      <span className="text-gray-500 pr-2">
                        <FcViewDetails
                          className="inline-block h-5 w-5 cursor-pointer"
                          onClick={() => iconCallBack(tableRow.projectid)}
                        />
                      </span>
                    ) : (
                      <span className="text-gray-500 pr-2">
                        <AiFillEdit
                          className="inline-block h-5 w-5 cursor-pointer"
                          onClick={() => iconCallBack(tableRow.projectid)}
                        />
                      </span>
                    )}
                    {/* <Link
                      href={
                        "/project/new-project?projectid=" + tableRow.projectid
                      }
                      className="flex justify-center bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      View More..
                    </Link> */}
                  </div>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
