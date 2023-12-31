"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import StaffAddNew from "../components/staff/addnew";
import { StaffTable } from "../components/staff/table";
import { StaffObj } from "../components/staff/types";
import Toast from "../components/common-comp/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import Link from "next/link";
import { ProjectTable } from "../components/project/project-table";
import { ProjectObjectTypes } from "../components/project/types";
import Pagination from "../components/common-comp/pagination";

export default function Project() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const staffid = session?.user.staffid;
  //define state variables
  // const [reloadTable, setReloadTable] = useState(false);
  const [projectRowObjects, setProjectRowObjects] = useState<
    ProjectObjectTypes[]
  >([]);

  const [tablePagination, setTablePagination] = useState(1);
  const [totalProjectCount, setTotalProjectCount] = useState(1);

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
  //re render page
  // const toggleReloadTable = () => {
  //   setReloadTable((prv: boolean) => !prv)
  // }

  const getAllProjectDetails = async () => {
    // declare the data fetching function
    const fetchData = async () => {
      const reponse = await fetch(
        "api/project?page-number=" + tablePagination + "&search-project-name=-1"
      );
      const res = await reponse.json();
      setProjectRowObjects(res.project);
      setTotalProjectCount(res.totalProjectCount);
    };

    // call the function
    fetchData().catch(console.error);
  };

  const getAssignedProjectDetails = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        "api/time-allocation/get-assign-projects?page-number=1&staffid=" +
          staffid+"&columns=all"
      );
      const res = await reponse.json();
      setProjectRowObjects(res.project);
      setTotalProjectCount(res.totalProjectCount);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  };
  useEffect(() => {
    if (userRole == "Admin" || userRole == "Manager") {
      getAllProjectDetails();
    } else {
      getAssignedProjectDetails();
    }
  }, [tablePagination]);

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
        <div className="flex items-center justify-center p-4">
          <h1 className="text-2xl text-purple-600 mr-auto">Projects</h1>

          {userRole == "User" ? null : (
            <Link
              href="/project/new-project"
              className="flex justify-center bg-gradient-to-r from-purple-500 to-purple-600 hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            >
              Create New Project
            </Link>
          )}
        </div>
        <div>
          {projectRowObjects && (
            <ProjectTable
              projectRowObjects={projectRowObjects}
              tablePagination={tablePagination}
            />
          )}
        </div>
        <Pagination
          tablePagination={tablePagination}
          totalProjectCount={totalProjectCount}
          prvTabel={prvTabel}
          nextTabel={nextTabel}
        />
      </div>
    </WithRole>
  );
}
