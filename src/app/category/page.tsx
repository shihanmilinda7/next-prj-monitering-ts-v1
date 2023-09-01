"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import CategoryAddNew from "../components/category/addnew";
import { CategoryTable } from "../components/category/table";
import { CategoryObj } from "../components/category/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";

export default function Categoty() {
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

  const [categoryRowData, setCategoryRowData] = useState<CategoryObj[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      // const columns = JSON.stringify({ staffid: true })
      const category_details = await fetch("api/category");
      const res = await category_details.json();
      setCategoryRowData(res.categoriesData);
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
          <h1 className="text-4xl   uppercase text-purple-600 mr-auto">
            Category
          </h1>
          <CategoryAddNew
            buttonName="Add New"
            setReloadTable={toggleReloadTable}
          />
        </div>
        <div>
          {categoryRowData && (
            <CategoryTable
              categoryRowData={categoryRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
      </div>
    </WithRole>
  );
}
