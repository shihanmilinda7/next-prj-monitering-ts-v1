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

export default function Staff() {
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

  const [staffRowData, setStaffRowData] = useState<StaffObj[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const staff_details = await fetch("api/staff");
      const res = await staff_details.json();
      setStaffRowData(res.staff);
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
      </div>
    </WithRole>
  );
}
