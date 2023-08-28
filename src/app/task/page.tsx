"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import TaskAddNew from "../components/task/addnew";
import { TaskObj, TaskObjExtend } from "../components/task/types";
import { TaskTable } from "../components/task/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";

export default function Task() {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  const [taskRowData, setTaskRowData] = useState<TaskObjExtend[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const task_details = await fetch("api/task");
      const res = await task_details.json();
      setTaskRowData(res.tasks);
      console.log("res", res);
    };

    // call the function
    fetchData().catch(console.error);
  }, [reloadTable]);
  return (
    <WithRole roles={["admin"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <h1 className="text-4xl   uppercase text-indigo-600 mr-auto">
            Tasks
          </h1>
          <TaskAddNew buttonName="Add New" setReloadTable={toggleReloadTable} />
        </div>
        <div>
          {taskRowData && (
            <TaskTable
              taskRowData={taskRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
      </div>
    </WithRole>
  );
}
