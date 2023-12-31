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

export default function NewProject() {
  //get pathname
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

  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  //define state variables
  // const [reloadTable, setReloadTable] = useState(false);

  const searchParams = useSearchParams();
  const selProjectid = searchParams.get("projectid");

  const [projectid, setProjectid] = useState("");
  const [projectname, setProjectname] = useState("");
  const [projectdescription, setProjectdescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [projectstatus, setProjectstatus] = useState("");
  const [pageReload, setPageReload] = useState(false);

  const [taskRowObjects, setTaskRowObjects] = useState<TaskObjectTypes[]>([]);

  const statusOptionValues = [
    { value: "", name: "Select Status" },
    { value: "Pending", name: "Pending" },
    { value: "Started", name: "Started" },
    { value: "End", name: "End" },
    { value: "Suspended", name: "Suspended" },
  ];

  const [tablePagination, setTablePagination] = useState(1);

  const nextTabel = () => {
    if (Math.ceil(taskRowObjects.length / 10) > tablePagination) {
      setTablePagination((prv: number) => prv + 1);
    }
  };

  const prvTabel = () => {
    if (tablePagination > 1) {
      setTablePagination((prv: number) => prv - 1);
    }
  };

  const updateTaskRowObjectArray = (
    tasks?: any,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => {
    const tmpArray: any = [...taskRowObjects];

    if (options?.deleteTask) {
      if (index || index == 0) {
        if (!options?.deltaskid) {
          tmpArray.splice(index, 1);
          setTaskRowObjects(tmpArray);
        } else {
          tmpArray[index]["rowStatus"] = "deleted";
          setTaskRowObjects(tmpArray);
        }
      }
    } else {
      if (tasks) {
        if (index || index == 0) {
          const keys: any = Object.keys(tasks);
          keys.forEach((key: any) => {
            tmpArray[index][key] = tasks[key];
          });
          setTaskRowObjects(tmpArray);
        } else {
          //update display object
          tmpArray.push(tasks);
          setTaskRowObjects(tmpArray);
          //update initial object
        }
      }
    }
  };

  //for states update
  useEffect(() => {
    // declare the data fetching function

    if (selProjectid) {
      const fetchData = async () => {
        const reponse = await fetch(
          pathname + "/api/project/get-as-project?projectid=" + selProjectid
        );
        const res = await reponse.json();
        console.log("res", res);
        const project = res.project[0];
        const projectTasks = res.projectTasks;
        console.log("project.projectid", projectTasks);
        //update states
        setProjectid(project.projectid);
        setProjectname(project.projectname);
        setProjectdescription(project.projectdescription);
        setStartdate(project.startdate);
        setEnddate(project.enddate);
        setProjectstatus(project.projectstatus);
        setTaskRowObjects(projectTasks);
        // setPageReload(true)
      };

      // call the function
      fetchData().catch(console.error);
    }
  }, []);

  const cancelButton = () => {
    router.push("/project");
  };

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!projectid) {
      await addnew();
    } else {
      await update();
    }
  };

  //add new project action
  const addnew = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus,
                taskRowObjects,
              }),
            }
          );
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
            router.push("/project");
          }
        } else {
          toast.info("Project should be contain at least one task!", {
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
      }
    } catch (error) {
      toast.error("Error!", {
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

  //update project action
  const update = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectid,
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus,
                taskRowObjects,
              }),
            }
          );
          const jsonResponse = await response.json();

          if (jsonResponse == "SUCCESS") {
            toast.success("Project updated successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            router.push("/project");
          }
        } else {
          toast.info("Project should be contain at least one task!", {
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
      }
    } catch (error) {
      toast.error("Error!", {
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

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }

  return (
    <WithRole roles={["Admin", "Manager", "User"]}>
      <div>
        <Navbar />
        <div className="">
          <div className="flex items-center justify-center p-4">
            <h1 className="text-2xl text-purple-600 mr-auto">
              {!projectid ? "New Project" : "Project - " + projectname}
            </h1>
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="mx-auto w-full flex flex-wrap">
              <div className={userRole == "User" ? "pointer-events-none mx-auto w-full flex flex-wrap" : "mx-auto w-full flex flex-wrap"}>
                <div className="w-full px-3 sm:w-1/4">
                  <TextInputField
                    label="Project Name"
                    id="projectname"
                    name="projectname"
                    autoComplete=""
                    placeholder="Project Name"
                    value={projectname}
                    onChange={(e) => setProjectname(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 sm:w-1/4">
                  <DateInputField
                    label="Start Date"
                    id="startdate"
                    name="startdate"
                    autoComplete=""
                    placeholder="Start Date"
                    value={startdate}
                    onChange={(e) => setStartdate(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 sm:w-1/4">
                  <DateInputField
                    label="End Date"
                    id="enddate"
                    name="enddate"
                    autoComplete=""
                    placeholder="End Date"
                    value={enddate}
                    onChange={(e) => setEnddate(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 sm:w-1/4">
                  <SelectBoxInputField
                    label="Project Status"
                    value={projectstatus}
                    options={statusOptionValues}
                    onSelect={(e) => setProjectstatus(e.target.value)}
                  />
                </div>
                <div className="px-3 mb-4 w-full">
                  <label
                    htmlFor="projectdescription"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Project Description
                  </label>
                  <div className="mt-2 sm:w-5/5">
                    <textarea
                      id="projectdescription"
                      name="projectdescription"
                      rows={2}
                      // cols={40}
                      value={projectdescription}
                      onChange={(e) => setProjectdescription(e.target.value)}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex px-3 w-full">
                <h1 className="text-xl text-purple-600 mr-auto">Task List</h1>
                <div className={userRole == "User" ? "hidden" : "ml-auto"}>
                  <NewProjectTask
                    arrayUpdateFuntion={updateTaskRowObjectArray}
                    buttonName="New Task"
                  />
                </div>
              </div>
              <div className="w-full">
                <ProjectTaskTable
                  taskRowObjects={taskRowObjects}
                  arrayUpdateFuntion={updateTaskRowObjectArray}
                />
              </div>
              <div className="flex px-3 w-full">
                <div className="ml-auto">
                  <ConfirmAlertbox
                    buttonName="Cancel"
                    leftButtonAction={cancelButton}
                    title="Are you sure?"
                    description="Do you want cancel ?"
                    buttonColour="bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600"
                  />
                </div>
                <div className={userRole == "User" ? "hidden" : "ml-3"}>
                  <button
                    onClick={submitButtonHandler}
                    className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Submit
                  </button>
                </div>

                {/* <div className={showDelButton ? "flex ml-auto" : "flex ml-auto hidden"}>
                <ConfirmAlertbox buttonName="Delete" leftButtonAction={deleteAction} title="Are you sure?" description="Do you want to delete this record ?" />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}
