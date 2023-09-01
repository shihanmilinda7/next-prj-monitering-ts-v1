"use client";

import { useEffect, useState } from "react";
import { PrjAssignTaskTableRow } from "./task-table-row";
import { toast } from "react-toastify";
import { setsaved, setunsaved } from "@/store/saveSlice";
import { useSelector, useDispatch } from "react-redux";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";

export const PrjAssignTaskTable = ({
  staffid,
  projectid,
  taskRowObjectsIn,
  tablePagination,
  toggleSaveFlag,
}: {
  staffid: number;
  projectid: number;
  taskRowObjectsIn: any[];
  tablePagination: number;
  toggleSaveFlag: () => void;
}) => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const tableHeads = ["#", "Task Name", "Select"];

  const [taskRows, setTaskRows] = useState(taskRowObjectsIn);
  const [saveBtnActive, setSaveBtnActive] = useState(false);

  //redux
  const save = useSelector((state: any) => state.saveReducer.saveState);
  const dispatch = useDispatch();
  const saveBtnStyle =
    "rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none";
  // const updateData = (
  const cancelBtnStyle =
    "mb-4  flex justify-center bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ";
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
    console.log("save", save);
    // if(!save){
    //   setSaveBtnActive(false);
    // }
  }, [taskRowObjectsIn]);

  const updateTableRows = (newVal: any) => {
    const updatedArray = taskRows.map((r) =>
      r.taskid === newVal.taskid ? newVal : r
    );
    setTaskRows(updatedArray);
    setSaveBtnActive(true);
    // setTaskRowObjects(updatedArray);
  };

  const cancelEvent = () => {
    dispatch(setsaved());
    toggleSaveFlag();
    setSaveBtnActive(false);
  };

  const saveEvent = async () => {
    console.log("staffid", staffid);
    console.log("projectid", projectid);
    console.log("taskRowObjects", taskRows);
    try {
      const response = await fetch(pathname + "/api/project-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffid,
          projectid,
          taskRows,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse == "SUCCESS") {
        toast.success("Project created successfully!", {
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
      console.log("save-befor", save);
      dispatch(setsaved());
      toggleSaveFlag();
      setSaveBtnActive(false);
    } catch (error) {
      toast.error(`${error}`, {
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
  return (
    <div className="md:px-2 py-2 w-full">
      <div className="flex mb-2">
        {/* <button
          onClick={cancelEvent}
          className={
            saveBtnActive
              ? cancelBtnStyle + " ml-auto"
              : cancelBtnStyle + " invisible"
          }
        >
          Cancel
        </button> */}
        <div className={saveBtnActive ? "ml-auto" : "hidden"}>
          <ConfirmAlertbox
            buttonName="Cancel"
            leftButtonAction={cancelEvent}
            title="Are you sure?"
            description="Do you want cancel ?"
            buttonColour="bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600"
          />
        </div>
        <button
          onClick={saveEvent}
          className={
            saveBtnActive ? saveBtnStyle + " ml-3" : saveBtnStyle + " invisible"
          }
        >
          Save
        </button>
      </div>

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
            {taskRows.map((tableRow: any, index: number) => (
              <PrjAssignTaskTableRow
                key={tableRow.taskid}
                index={index}
                tableRowIn={tableRow}
                tablePagination={tablePagination}
                updateTableRows={updateTableRows}
              />
              //       <tr className="even:bg-purple-gray-50/50" key={tableRow.taskid}>
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
              //     checked:bg-purple-800 checked:scale-75
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
