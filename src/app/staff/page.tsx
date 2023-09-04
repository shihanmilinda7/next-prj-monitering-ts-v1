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
import Pagination from "../components/common-comp/pagination";

export default function Staff() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [staffRowData, setStaffRowData] = useState<any[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const [tablePagination, setTablePagination] = useState(1);
  const [totalStaffCount, setTotalStaffCount] = useState(1);

  const nextTabel = () => {
    if (Math.ceil(totalStaffCount / 10) > tablePagination) {
      setTablePagination((prv: number) => prv + 1);
    }
  };

  const prvTabel = () => {
    if (tablePagination > 1) {
      setTablePagination((prv: number) => prv - 1);
    }
  };

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const staff_details = await fetch(
        "api/staff?page-number=" + tablePagination
      );
      const res = await staff_details.json();
      setStaffRowData(res.staff);
      setTotalStaffCount(res.staffCount);
      console.log("res", res);
    };

    // call the function
    fetchData().catch(console.error);
  }, [reloadTable, tablePagination]);
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
    <WithRole roles={["Admin", "Manager"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <h1 className="text-4xl   uppercase text-purple-600 mr-auto">
            Staff
          </h1>
          <StaffAddNew
            buttonName="Add New"
            setReloadTable={toggleReloadTable}
          />
        </div>
        <div>
          {staffRowData && (
            <StaffTable
              staffRowData={staffRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
        <Pagination
          tablePagination={tablePagination}
          totalProjectCount={totalStaffCount}
          prvTabel={prvTabel}
          nextTabel={nextTabel}
        />
      </div>
    </WithRole>
  );
}
