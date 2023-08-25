"use client";

import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
import Pagination from "@/app/components/common-comp/pagination";
import { WithRole } from "@/app/components/common-comp/withRole";
import Navbar from "@/app/components/navbar/navbar";
import NewProjectTask from "@/app/components/project/project-task-addnew";
import { ProjectTaskTable } from "@/app/components/project/project-task-table";
import { TaskObjectTypes } from "@/app/components/project/types";
import Spinner from "@/app/dashboard/loading";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PrjAssignStaffTable } from "../components/project-assign/staff-table";

export default function ProjectAssign() {
  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 7);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const router = useRouter();
  // const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return <div><Spinner /></div>;
  // }

  // if (!session) {
  //   router.push('/'); // Redirect to login page if not authenticated
  //   return null;
  // }

  //define state variables
  // const [reloadTable, setReloadTable] = useState(false);

  // const searchParams = useSearchParams();
  // const selProjectid = searchParams.get("projectid");

  // const [projectid, setProjectid] = useState("");
  // const [projectname, setProjectname] = useState("");
  // const [projectdescription, setProjectdescription] = useState("");
  // const [startdate, setStartdate] = useState("");
  // const [enddate, setEnddate] = useState("");
  // const [projectstatus, setProjectstatus] = useState("");
  // const [pageReload, setPageReload] = useState(false);

  const [staffRowObjects, setStaffRowObjects] = useState<any[]>([]);
  const [tablePagination, setTablePagination] = useState(1);
  const [totalProjectCount, setTotalProjectCount] = useState(1);
  const [staffid, setStaffid] = useState<any>();
  const [staffname, setStaffname] = useState("No any selection");

  const nextTabel = () => {
    if (Math.ceil(totalProjectCount / 10) > tablePagination) {
      setTablePagination((prv: number) => prv + 1);
    }
  };

  const prvTabel = () => {
    if (tablePagination > 1) {
      setTablePagination((prv: number) => prv - 1);
    }
  };

  const staffTableClickEvent = (staffid: number, staffname: string) => {
    setStaffid(staffid);
    setStaffname(staffname);
  };

  // const statusOptionValues = [
  //   { value: "", name: "Select Status" },
  //   { value: "Pending", name: "Pending" },
  //   { value: "Started", name: "Started" },
  //   { value: "End", name: "End" },
  //   { value: "Suspended", name: "Suspended" },
  // ];

  // const [tablePagination, setTablePagination] = useState(1);

  // const nextTabel = () => {
  //   if (Math.ceil(taskRowObjects.length / 10) > tablePagination) {
  //     setTablePagination((prv: number) => prv + 1);
  //   }
  // };

  // const prvTabel = () => {
  //   if (tablePagination > 1) {
  //     setTablePagination((prv: number) => prv - 1);
  //   }
  // };

  // const updateTaskRowObjectArray = (
  //   tasks?: any,
  //   index?: number,
  //   options?: { deleteTask?: boolean; deltaskid?: number }
  // ) => {
  //   const tmpArray: any = [...taskRowObjects];

  //   if (options?.deleteTask) {
  //     if (index || index == 0) {
  //       if (!options?.deltaskid) {
  //         tmpArray.splice(index, 1);
  //         setTaskRowObjects(tmpArray);
  //       } else {
  //         tmpArray[index]["rowStatus"] = "deleted";
  //         setTaskRowObjects(tmpArray);
  //       }
  //     }
  //   } else {
  //     if (tasks) {
  //       if (index || index == 0) {
  //         const keys: any = Object.keys(tasks);
  //         keys.forEach((key: any) => {
  //           tmpArray[index][key] = tasks[key];
  //         });
  //         setTaskRowObjects(tmpArray);
  //       } else {
  //         //update display object
  //         tmpArray.push(tasks);
  //         setTaskRowObjects(tmpArray);
  //         //update initial object
  //       }
  //     }
  //   }
  // };

  //for states update
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const reponse = await fetch(
        pathname + "/api/staff/get-staff?page-number=" + tablePagination
      );
      const res = await reponse.json();
      console.log("res", res);
      setStaffRowObjects(res.staff);
      setTotalProjectCount(res.totalStaffCount);

      // const project = res.project[0];
      // const projectTasks = res.projectTasks;
      // console.log("project.projectid", projectTasks);
    };
    // call the function
    fetchData().catch(console.error);
  }, [tablePagination]);

  //for page reload
  // useEffect(() => {}, [pageReload]);

  const cancelButton = () => {
    router.push("/project");
  };

  // const submitButtonHandler = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.preventDefault();
  //   if (!projectid) {
  //     await addnew();
  //   } else {
  //     await update();
  //   }
  // };

  // //add new project action
  // const addnew = async () => {
  //   const validation = inputFieldValidation({
  //     projectname,
  //     projectdescription,
  //     startdate,
  //     enddate,
  //   });
  //   try {
  //     //check input field empty or not
  //     if (validation == 0) {
  //       if (taskRowObjects.length > 0) {
  //         //api call
  //         const response = await fetch(
  //           pathname + "/api/project/get-as-project",
  //           {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({
  //               projectname,
  //               projectdescription,
  //               startdate,
  //               enddate,
  //               projectstatus,
  //               taskRowObjects,
  //             }),
  //           }
  //         );
  //         const jsonResponse = await response.json();

  //         if (jsonResponse == "SUCCESS") {
  //           toast.success("Project created successfully!", {
  //             position: "top-right",
  //             autoClose: 3000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored",
  //           });
  //           router.push("/project");
  //         }
  //       } else {
  //         toast.info("Project should be contain at least one task!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Error!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

  // //update project action
  // const update = async () => {
  //   const validation = inputFieldValidation({
  //     projectname,
  //     projectdescription,
  //     startdate,
  //     enddate,
  //   });
  //   try {
  //     //check input field empty or not
  //     if (validation == 0) {
  //       if (taskRowObjects.length > 0) {
  //         //api call
  //         const response = await fetch(
  //           pathname + "/api/project/get-as-project",
  //           {
  //             method: "PUT",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({
  //               projectid,
  //               projectname,
  //               projectdescription,
  //               startdate,
  //               enddate,
  //               projectstatus,
  //               taskRowObjects,
  //             }),
  //           }
  //         );
  //         const jsonResponse = await response.json();

  //         if (jsonResponse == "SUCCESS") {
  //           toast.success("Project updated successfully!", {
  //             position: "top-right",
  //             autoClose: 3000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored",
  //           });
  //           router.push("/project");
  //         }
  //       } else {
  //         toast.info("Project should be contain at least one task!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Error!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };
  //re render page
  // const toggleReloadTable = () => {
  //   setReloadTable((prv: boolean) => !prv)
  // }

  // useEffect(() => {
  //   // declare the data fetching function
  //   // const fetchData = async () => {
  //   //   const columns = JSON.stringify({ staffid: true })
  //   //   const staff_details = await fetch(
  //   //     "api/staff",
  //   //   );
  //   //   const res = await staff_details.json();
  //   //   setStaffRowData(res.staff);
  //   //   console.log("res", res,)
  //   // };

  //   // // call the function
  //   // fetchData().catch(console.error);
  // }, []);
  return (
    // <WithRole roles={['admin']}>
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold uppercase text-indigo-600 mr-auto">
          Project Assign
        </h1>
      </div>
      <div className="w-1/3 pl-4">
        <h1 className="text-2xl font-extrabold text-indigo-400 mr-auto">
          Name - {staffname}
        </h1>
        <div>
          {staffRowObjects && (
            <PrjAssignStaffTable
              staffTableClickEvent={staffTableClickEvent}
              staffRowObjects={staffRowObjects}
              tablePagination={tablePagination}
            />
          )}
          <Pagination
            tablePagination={tablePagination}
            totalProjectCount={totalProjectCount}
            prvTabel={prvTabel}
            nextTabel={nextTabel}
          />
        </div>
      </div>
    </div>
    // </WithRole>
  );
}
