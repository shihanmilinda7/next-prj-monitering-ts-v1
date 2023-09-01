// "use client";
// import { Provider } from "react-redux";
// import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
// import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
// import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
// import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
// import Pagination from "@/app/components/common-comp/pagination";
// import { WithRole } from "@/app/components/common-comp/withRole";
// import Navbar from "@/app/components/navbar/navbar";
// import NewProjectTask from "@/app/components/project/project-task-addnew";
// import { ProjectTaskTable } from "@/app/components/project/project-task-table";
// import { TaskObjectTypes } from "@/app/components/project/types";
// import Spinner from "@/app/dashboard/loading";
// import { inputFieldValidation } from "@/app/utils/utils";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { PrjAssignStaffTable } from "../components/project-assign/staff-table";
// import { PrjAssignProjectTable } from "../components/project-assign/project-table";
// import { PrjAssignTaskTable } from "../components/project-assign/task-table";
// import store from "@/store/store";
// import { useSelector, useDispatch } from "react-redux";

// export default function ProjectAssign() {
//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//     // console.log("pathname1", window.location.href);
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//     // console.log("pathname", pathname);
//   }

//   const router = useRouter();
//   // const { data: session, status } = useSession();

//   // if (status === 'loading') {
//   //   return <div><Spinner /></div>;
//   // }

//   // if (!session) {
//   //   router.push('/'); // Redirect to login page if not authenticated
//   //   return null;
//   // }

//   //redux
//   const save = useSelector((state: any) => state.saveReducer.saveState);

//   const [staffRowObjects, setStaffRowObjects] = useState<any[]>([]);
//   const [staffid, setStaffid] = useState<any>();
//   const [staffname, setStaffname] = useState("Select from below...");
//   const [staffTablePage, setStaffTablePage] = useState(1);
//   const [totalStaffCount, setTotalStaffCount] = useState(1);

//   const nextStaffTabel = () => {
//     if (Math.ceil(totalStaffCount / 10) > staffTablePage) {
//       setStaffTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvStaffTabel = () => {
//     if (staffTablePage > 1) {
//       setStaffTablePage((prv: number) => prv - 1);
//     }
//   };

//   const staffTableClickEvent = (staffid: number, staffname: string) => {
//     if (!save) {
//       toast.error("Please Save changes!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } else {
//       // toast.error("No any changes!", {
//       //   position: "top-right",
//       //   autoClose: 5000,
//       //   hideProgressBar: false,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       //   draggable: true,
//       //   progress: undefined,
//       //   theme: "colored",
//       // });
//       setStaffid(staffid);
//       setStaffname(staffname);
//     }
//   };

//   const [projectRowObjects, setProjectRowObjects] = useState<any[]>([]);
//   const [projectid, setProjectid] = useState<any>();
//   const [projectname, setProjectname] = useState("Select from below...");
//   const [projectTablePage, setProjectTablePage] = useState(1);
//   const [totalProjectCount, setTotalProjectCount] = useState(1);

//   const nextProjectTabel = () => {
//     if (Math.ceil(totalProjectCount / 10) > projectTablePage) {
//       setProjectTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvProjectTabel = () => {
//     if (projectTablePage > 1) {
//       setProjectTablePage((prv: number) => prv - 1);
//     }
//   };

//   const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);
//   // const [initialTaskRowObjects, setInitialTaskRowObjects] = useState<any[]>([]);
//   const [taskTablePage, setTaskTablePage] = useState(1);
//   const [totalTaskCount, setTotalTaskCount] = useState(1);

//   const [saveFlag, setSaveFlag] = useState(false);

//   const toggleSaveFlag = () => {
//     setSaveFlag((prv: boolean) => !prv);
//   };

//   const nextTaskTabel = () => {
//     if (Math.ceil(totalTaskCount / 10) > taskTablePage) {
//       setTaskTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvTaskTabel = () => {
//     if (taskTablePage > 1) {
//       setTaskTablePage((prv: number) => prv - 1);
//     }
//   };

//   const getAssignTasks = async (projectId?: number, staffid?: number) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/project-assign?projectid=" +
//         projectId +
//         "&staffid=" +
//         staffid
//     );
//     const res = await reponse.json();

//     return res.totalAssignTask;
//   };

//   const getProjectTasks = async (projectId?: number, pageNo?: number) => {
//     const tmpPageNo = pageNo ? pageNo : taskTablePage;
//     const reponse = await fetch(
//       pathname +
//         "/api/project/get-task-as-project-pagination?page-number=" +
//         tmpPageNo +
//         "&projectid=" +
//         projectId
//     );
//     const res = await reponse.json();
//     setTotalTaskCount(res.totalProjectTaskCount);

//     return res.projecttasks;
//   };

//   const createTaskRowObj = async (assignTasks: any, projectTasks: any) => {
//     const tmpAssignTask = await assignTasks;
//     const tmpProjectTask = await projectTasks;
//     console.log("await projectTasks", tmpAssignTask);
//     if (tmpAssignTask.length > 0) {
//       console.log("call 1");

//       // console.log("assignTasks", assignTasks);
//       const tmpRowObjs = tmpProjectTask.map((pt: any) => {
//         const findAssignTask: any = tmpAssignTask.find(
//           (t: any) => t.taskid === pt.taskid
//         );
//         return {
//           taskid: pt.taskid,
//           taskname: pt.taskname,
//           projecttaskassignid: findAssignTask
//             ? findAssignTask.projecttaskassignid
//             : 0,
//           selected: findAssignTask ? true : false,
//         };
//       });
//       setTaskRowObjects(tmpRowObjs);
//       // setInitialTaskRowObjects([...tmpRowObjs]);
//       console.log("tmpRowObjs", tmpRowObjs);
//     } else {
//       console.log("call 2");
//       const tmpPrjObj = tmpProjectTask.map((obj: any) => {
//         return {
//           ...obj,
//           projecttaskassignid: 0,
//           // console.log("obj",obj,)
//           selected: false,
//         };
//       });
//       console.log("tmpPrjObj", tmpPrjObj);
//       setTaskRowObjects(tmpPrjObj);
//       // setInitialTaskRowObjects([...tmpPrjObj]);
//     }
//   };

//   const projectTableClickEvent = async (
//     projectid: number,
//     projectname: string
//   ) => {
//     if (!save) {
//       toast.error("Please Save changes!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } else {
//       setProjectid(projectid);
//       setProjectname(projectname);
//       // await getTasks(projectid, staffid);
//       const assignTasks = await getAssignTasks(projectid, staffid);
//       const projectTasks = await getProjectTasks(projectid, 1);
//       createTaskRowObj(assignTasks, projectTasks);
//     }
//   };

//   //for staff table pagination update
//   useEffect(() => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname + "/api/staff/get-staff?page-number=" + staffTablePage
//       );
//       const res = await reponse.json();
//       setStaffRowObjects(res.staff);
//       setTotalStaffCount(res.totalStaffCount);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   }, [staffTablePage]);

//   //for project table pagination update
//   useEffect(() => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname + "/api/project?page-number=" + projectTablePage
//       );
//       const res = await reponse.json();
//       console.log("res", res);
//       setProjectRowObjects(res.project);
//       setTotalProjectCount(res.totalProjectCount);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   }, [projectTablePage]);

//   //for task table pagination update                                                 TO DOOOOOOOOO
//   useEffect(() => {
//     if (projectid) {
//       if (!save) {
//         toast.error("Please Save changes!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         const assignTasks: any = getAssignTasks(projectid, staffid);
//         const projectTasks = getProjectTasks(projectid);
//         // console.log("initialTaskRowObjects", initialTaskRowObjects);
//         // console.log("taskRowObjects", taskRowObjects);
//         createTaskRowObj(assignTasks, projectTasks);
//       }
//     }
//   }, [taskTablePage, staffid, saveFlag]);

//   return (
//     // <WithRole roles={['admin']}>
//     // <Provider store={store}>
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center p-4">
//         <h1 className="text-4xl text-indigo-600 mr-auto">
//           Project assign
//         </h1>
//         {/* <button
//           className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
//         >
//           Save Not
//         </button> */}
//       </div>
//       <div className="flex">
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-indigo-400 mr-auto">
//             Staff name : {staffname}
//           </h1>
//           <div>
//             {staffRowObjects && (
//               <PrjAssignStaffTable
//                 staffTableClickEvent={staffTableClickEvent}
//                 staffRowObjects={staffRowObjects}
//                 tablePagination={staffTablePage}
//               />
//             )}
//             <Pagination
//               tablePagination={staffTablePage}
//               totalProjectCount={totalStaffCount}
//               prvTabel={prvStaffTabel}
//               nextTabel={nextStaffTabel}
//             />
//           </div>
//         </div>
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-indigo-400 mr-auto">
//             Project name - {projectname}
//           </h1>
//           <div>
//             {projectRowObjects && (
//               <PrjAssignProjectTable
//                 projectTableClickEvent={projectTableClickEvent}
//                 projectRowObjects={projectRowObjects}
//                 tablePagination={projectTablePage}
//                 staffid={staffid}
//               />
//             )}
//             <Pagination
//               tablePagination={projectTablePage}
//               totalProjectCount={totalProjectCount}
//               prvTabel={prvProjectTabel}
//               nextTabel={nextProjectTabel}
//             />
//           </div>
//         </div>
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-indigo-400 mr-auto">Task list</h1>
//           <div>
//             {taskRowObjects && (
//               <PrjAssignTaskTable
//                 staffid={staffid}
//                 projectid={projectid}
//                 taskRowObjectsIn={taskRowObjects}
//                 tablePagination={taskTablePage}
//                 toggleSaveFlag={toggleSaveFlag}
//               />
//             )}
//             <Pagination
//               tablePagination={taskTablePage}
//               totalProjectCount={totalTaskCount}
//               prvTabel={prvTaskTabel}
//               nextTabel={nextTaskTabel}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// {
//   /* </Provider> </WithRole>*/
// }
