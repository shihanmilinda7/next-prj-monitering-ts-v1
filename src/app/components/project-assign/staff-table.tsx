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
  const save = useSelector((state: any) => state.saveReducer.saveState);
  const [searchStaffname, setSearchStaffname] = useState("");
  const [searchDesignation, setSearchDesigntion] = useState("");

  // const rSearchStaffName = useSelector((state: any) => state.saveReducer.staffname);
  // const rSearchDesigantion = useSelector((state: any) => state.saveReducer.designation);

  
  const dispatch = useDispatch();

  const searchStaffName = (nameValue:any) =>{
    setSearchStaffname(nameValue)
    dispatch(setSearchStaffName(nameValue));
  }

  const searchDesigantion = (designationValue:any) =>{
    setSearchDesigntion(designationValue)
    dispatch(setSearchDesignation(designationValue));
  }

  const selectRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    staffid: number,
    staffname: string
  ) => {
    if (save) {
      setSetRow(staffid);
      staffTableClickEvent(staffid, staffname);
    } else {
      toast.error("Please Save changes!", {
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
            <tr className="even:bg-blue-gray-50/50">
              <td className="text-left py-2 px-4">$</td>
              <td className="text-left py-2 px-4 font-bold">
                <input
                  type="text"
                  name="searchStaffname"
                  id="searchStaffname"
                  placeholder="Search Name"
                  autoComplete=""
                  value={searchStaffname}
                  onChange={(e) => searchStaffName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </td>
              <td className="text-left py-2 px-4 font-bold">
                <input
                  type="text"
                  name="searchDesignation"
                  id="searchDesignation"
                  placeholder="Search Designation"
                  autoComplete=""
                  value={searchDesignation}
                  onChange={(e) => searchDesigantion(e.target.value)}
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
                    ? "bg-blue-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
                    : "bg-indigo-400 cursor-pointer transition ease-in duration-500"
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
                    className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
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
