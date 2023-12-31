// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { PrjAssignTaskTimeAllocTableRow } from "./task-table-row";
// import { toast } from "react-toastify";
// import { setsaved, setunsaved } from "@/store/saveSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { setDate } from "@/store/timeAllocDateSlice";
// import ConfirmAlertbox from "../common-comp/confirm-alertbox";

// export const PrjAssignTaskTimeAllocTable = ({
//   taskHeaderObject,
//   staffid,
//   projectid,
//   taskRowObjectsIn,
//   tablePagination,
//   toggleSaveFlag,
// }: {
//   taskHeaderObject: any;
//   staffid: number;
//   projectid: number;
//   taskRowObjectsIn: any[];
//   tablePagination: number;
//   toggleSaveFlag: () => void;
// }) => {
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }

//   const tableHeads = [
//     "#",
//     "Task Name",
//     "Start",
//     "End",
//     "Time (Hours)",
//     "Remark",
//   ];

//   let tmpRemark = "";
//   let timeAllocHeaderId: any;
//   if (taskHeaderObject) {
//     tmpRemark = taskHeaderObject[0].remark;
//     timeAllocHeaderId = taskHeaderObject[0].timeallocid;
//   }
//   console.log("tmpRemark", tmpRemark);
//   const [taskRows, setTaskRows] = useState(taskRowObjectsIn);
//   const [saveBtnActive, setSaveBtnActive] = useState(false);
//   const [date, setDate1] = useState(new Date().toJSON().slice(0, 10));
//   const [remark, setRemark] = useState(tmpRemark);
//   // console.log("taskHeaderObject", taskHeaderObject);
//   //redux
//   const save = useSelector((state: any) => state.saveReducer.saveState);
//   const reduxDate = useSelector(
//     (state: any) => state.timeAllocDateReducer.date
//   );

//   const dispatch = useDispatch();

//   // const saveBtnStyle =
//   //   "mb-4 ml-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ";
//   // const cancelBtnStyle =
//   //   "mb-4 ml-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ";

//   useEffect(() => {
//     const q = [...taskRowObjectsIn];
//     setTaskRows(q);
//     console.log("q", q);
//     console.log("save5555555", save);
//     setRemark(tmpRemark ?? "");
//   }, [taskRowObjectsIn]);

//   const updateTableRows = (newVal: any) => {
//     const updatedArray = taskRows.map((r) =>
//       r.taskid === newVal.taskid ? newVal : r
//     );
//     setTaskRows(updatedArray);
//     setSaveBtnActive(true);
//   };

//   const addnew = async () => {
//     try {
//       const response = await fetch(pathname + "/api/time-allocation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           staffid,
//           projectid,
//           remark,
//           date,
//           taskRows,
//         }),
//       });
//       const jsonResponse = await response.json();
//       if (jsonResponse == "SUCCESS") {
//         toast.success("Saved Successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//       dispatch(setsaved());
//       toggleSaveFlag();
//       setSaveBtnActive(false);
//     } catch (error) {
//       toast.error(`${error}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   const update = async () => {
//     try {
//       const response = await fetch(pathname + "/api/time-allocation", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           timeAllocHeaderId,
//           remark,
//           taskRows,
//         }),
//       });
//       const jsonResponse = await response.json();
//       if (jsonResponse == "SUCCESS") {
//         toast.success("Updated Successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//       dispatch(setsaved());
//       toggleSaveFlag();
//       setSaveBtnActive(false);
//     } catch (error) {
//       toast.error(`${error}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   const saveEvent = async () => {
//     dispatch(setsaved());
//     if (timeAllocHeaderId) {
//       await update();
//     } else {
//       await addnew();
//     }
//   };

//   const dateInputEvent = (dateValue: string) => {
//     if (save) {
//       setDate1(dateValue);
//       dispatch(setDate(dateValue));
//     } else {
//       toast.error("Please Save changes!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   const remarkInputEvent = (remarkValue: string) => {
//     setRemark(remarkValue);
//     setSaveBtnActive(true);
//     dispatch(setunsaved());
//   };

//   const cancelEvent = () => {
//     dispatch(setsaved());
//     // setSaveBtnActive(false);
//   };
//   return (
//     <div className="md:px-2 py-2 w-full">
//       <div className={saveBtnActive ? "flex" : "hidden"}>
//         {/* <button
//           onClick={saveEvent}
//           className={saveBtnActive ? saveBtnStyle : "hidden"}
//         >
//           Save
//         </button> */}
//         <div className="ml-auto">
//           <button
//             onClick={saveEvent}
//             className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
//           >
//             Save
//           </button>
//         </div>
//         <div className="ml-3">
//           <ConfirmAlertbox
//             buttonName="Cancel"
//             leftButtonAction={cancelEvent}
//             title="Are you sure?"
//             description="Do you want cancel ?"
//             buttonColour="bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600"
//           />
//         </div>
//         {/* <button
//           onClick={saveEvent}
//           className={saveBtnActive ? cancelBtnStyle : "hidden"}
//         >
//           Cancel
//         </button> */}
//       </div>

//       <div className="pb-4 flex w-full ">
//         <div className={projectid ? "mr-4" : "hidden"}>
//           <label
//             htmlFor="date"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Date
//           </label>
//           <div className="mt-2 w-full">
//             <input
//               id="date"
//               name="date"
//               type="date"
//               autoComplete="{autocomplete}"
//               className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
//               value={date}
//               onChange={(e) => dateInputEvent(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className={projectid ? "ml-4 w-full" : "hidden"}>
//           <label
//             htmlFor="remark"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Remark
//           </label>
//           <div className="mt-2 w-full">
//             <textarea
//               id="remark"
//               name="remark"
//               rows={2}
//               value={remark}
//               onChange={(e) => remarkInputEvent(e.target.value)}
//               className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="pt-4 pb-2">
//         <h1 className="text-2xl text-purple-400 mr-auto">Task list</h1>
//       </div>
//       <div className="shadow rounded border-b border-gray-200 w-full">
//         <table className="min-w-full bg-white">
//           <thead className="border-b-2 text-black border-purple-400">
//             <tr>
//               {tableHeads.map((head) => (
//                 <th
//                   key={head}
//                   className="text-left py-5 px-4 uppercase text-sm font-bold"
//                 >
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <Suspense fallback={<Loading />}>
//             <tbody className="text-gray-700">
//               {taskRows.map((tableRow: any, index: number) => (
//                 <PrjAssignTaskTimeAllocTableRow
//                   key={tableRow.taskid}
//                   index={index}
//                   tableRowIn={tableRow}
//                   tablePagination={tablePagination}
//                   updateTableRows={updateTableRows}
//                 />
//               ))}
//             </tbody>
//           </Suspense>
//         </table>
//       </div>
//     </div>
//   );
// };

// function Loading() {
//   return <h2>🌀 Loading...</h2>;
// }
