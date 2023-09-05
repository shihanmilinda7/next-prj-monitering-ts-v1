"use client";

import { setSearchDesignation, setSearchStaffName } from "@/store/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const PrjAssignStaffTable = ({
  staffTableClickEvent,
  staffRowObjects,
  tablePagination,
}: {
  staffTableClickEvent: (staffid: number, staffname: string) => void;
  staffRowObjects: any[];
  tablePagination: number;
}) => {
  const tableHeads = ["#", "Staff Name", "Designation"];
  const [selRow, setSetRow] = useState<any>();
  const [searchStaffname1, setSearchStaffname1] = useState("");
  const [searchDesignation1, setSearchDesignation1] = useState("");

  // const rSearchStaffName = useSelector((state: any) => state.saveReducer.staffname);
  // const rSearchDesignation = useSelector((state: any) => state.saveReducer.designation);

  //redux state for project assign
  const projectAssignSave = useSelector(
    (state: any) => state.projectAssignSaveReducer.projectAssignSaveState
  );

  const dispatch = useDispatch();

  const searchStaffNameEvent = (nameValue: any) => {
    setSearchStaffname1(nameValue);
    dispatch(setSearchStaffName(nameValue));
  };

  const searchDesignationEvent = (designationValue: any) => {
    setSearchDesignation1(designationValue);
    dispatch(setSearchDesignation(designationValue));
  };

  const selectRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    staffid: number,
    staffname: string
  ) => {
    if (projectAssignSave) {
      setSetRow(staffid);
      staffTableClickEvent(staffid, staffname);
    } else {
      toast.error("Please Save changes!", {
        position: "top-right",
        autoClose: 3000,
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
      <div className="shadow rounded border-b border-gray-200 w-full">
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
            <tr className="even:bg-purple-gray-50/50">
              <td className="text-left py-2 px-4">$</td>
              <td className="text-left py-2 px-4 font-bold">
                <input
                  type="text"
                  name="searchStaffname"
                  id="searchStaffname"
                  placeholder="Name"
                  autoComplete=""
                  value={searchStaffname1}
                  onChange={(e) => searchStaffNameEvent(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </td>
              <td className="text-left py-2 px-4 font-bold">
                <input
                  type="text"
                  name="searchDesignation"
                  id="searchDesignation"
                  placeholder="Designation"
                  autoComplete=""
                  value={searchDesignation1}
                  onChange={(e) => searchDesignationEvent(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </td>
            </tr>

            {staffRowObjects.map((tableRow: any, index: number) => (
              <tr
                onClick={(e) =>
                  selectRow(e, tableRow.staffid, tableRow.staffname)
                }
                className={
                  tableRow.staffid != selRow
                    ? "bg-purple-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
                    : "bg-purple-400 cursor-pointer transition ease-in duration-500"
                }
                key={tableRow.staffid}
              >
                <td className="text-left py-3 px-4 font-bold">
                  {(tablePagination - 1) * 10 + (index + 1)}
                </td>
                <td className="text-left py-3 px-4">{tableRow.staffname}</td>
                <td className="text-left py-3 px-4">
                  {tableRow.designation ? tableRow.designation : "No Data"}
                </td>

                {/* <td className="text-left py-3 px-4 cursor-pointer hover:text-amber-900 hover: ">
                  <button
                    onClick={(e) =>
                      selectRow(e, index, tableRow.staffid, tableRow.staffname)
                    }
                    className="flex justify-center bg-gradient-to-r from-purple-500 to-purple-600  hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Select
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
