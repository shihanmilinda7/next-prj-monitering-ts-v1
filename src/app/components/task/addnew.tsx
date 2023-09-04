"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TextInputField from "../common-comp/input-fields/text-input-fields";
import { TaskObj, TaskObjExtend } from "./types";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";
import SelectBoxInputField from "../common-comp/input-fields/select-input-field";
import { StaffObj } from "../staff/types";
import { CategoryDetailObj, CategoryObj } from "../category/types";
import IntegerInputField from "../common-comp/input-fields/number-input-field";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";

type ParamTypes = {
  buttonName: string;
  selRowData?: TaskObj;
  delButton?: boolean;
  setReloadTable?: () => void;
};

const TaskAddNew = (params: ParamTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [taskid, setTaskid] = useState(params.selRowData?.taskid ?? "");
  const [staffid, setStaffid] = useState(params.selRowData?.staffid ?? "");
  const [clientname, setClientname] = useState(
    params.selRowData?.clientname ?? ""
  );
  const [categoryid, setCategoryid] = useState(
    params.selRowData?.categoryid ?? ""
  );
  const [location, setLocation] = useState(params.selRowData?.location ?? "");
  const [visitcount, setVisitcount] = useState(
    params.selRowData?.visitcount ?? ""
  );

  const [staffOptionValues, setStaffOptionValues] = useState<
    { value?: number | string; name?: string }[]
  >([
    {
      value: "no",
      name: "No Data",
    },
  ]);
  const [categoryOptionValues, setCategoryOptionValues] = useState<
    { value?: number | string; name?: string }[]
  >([
    {
      value: "no",
      name: "No Data",
    },
  ]);

  const [fetchedCategoryDetailsData, setFetchedCategoryDetailsData] = useState(
    []
  );

  const [showDelButton, setShowDelButton] = useState(params.delButton);
  const [showCatDetails, setShowCatDetails] = useState(false);

  const customStyles = {
    overlay: {
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "45%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    getStaffValues();
    getCategoryValues();
    if (categoryid) {
      fetchCatDetailsData(categoryid);
    }
  }, []);

  //show category details
  const showCategoryDeatils = () => {
    setShowCatDetails(!showCatDetails);
  };

  //fetch category details as sel category data
  const fetchCatDetailsData = async (categoryid: string | number) => {
    const fetchData = async () => {
      const all_cat_details = await fetch(
        "api/category/get_cat_as_catid?categoryid=" + categoryid
      );
      const res = await all_cat_details.json();
      setFetchedCategoryDetailsData(res.categoriesData);
      // setStaffid(selRowData?.staffid ?? "");
    };
    // call the function
    fetchData().catch(console.error);
  };

  //get staff details
  const getStaffValues = () => {
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true, staffname: true });
      const staff_details = await fetch("api/staff?=columns" + columns);
      const res = await staff_details.json();
      const staffData: StaffObj[] = res.staff;

      //create option array
      const optionArray: { value?: number | string; name?: string }[] =
        staffData.map((s) => {
          return { value: s.staffid, name: s.staffname };
        });
      setStaffOptionValues(optionArray);
    };
    fetchData().catch(console.error);
  };

  //get category details
  const getCategoryValues = () => {
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true, staffname: true });
      const catgegory_details = await fetch("api/category");
      const res = await catgegory_details.json();
      const categoryData: CategoryObj[] = res.categoriesData;

      //create option array
      const optionArray: { value?: number | string; name?: string }[] =
        categoryData.map((c) => {
          return { value: c.categoryid, name: c.categoryname };
        });
      setCategoryOptionValues(optionArray);
    };
    fetchData().catch(console.error);
  };

  //change event for category select
  const categoryOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryid(e.target.value);
    fetchCatDetailsData(e.target.value);
  };

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (taskid) {
      update();
    } else {
      console.log("ad new working");
      addnew();
    }
  };

  //add new staff action
  const addnew = async () => {
    const validation = inputFieldValidation({
      staffid,
      clientname,
      categoryid,
      location,
      visitcount,
    });

    console.log("validation", validation > 0);
    if (validation == 0) {
      const res_addnew_task = await fetch("api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffid,
          clientname,
          categoryid,
          location,
          visitcount,
        }),
      });

      const res = await res_addnew_task.json();
      console.log(res);

      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        toast.success("Task crated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Errorf !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  //update task action
  const update = async () => {
    const validation = inputFieldValidation({
      staffid,
      clientname,
      categoryid,
      location,
      visitcount,
    });
    if (validation == 0) {
      const responseUpdateStaff = await fetch("api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskid,
          staffid,
          clientname,
          categoryid,
          location,
          visitcount,
        }),
      });

      const res = await responseUpdateStaff.json();

      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        toast.success("Task updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  //delete task action
  const deleteAction = async () => {
    if (taskid) {
      const responseDelTask = await fetch("api/task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskid }),
      });

      const res = await responseDelTask.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        toast.success("Task deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      if (params.setReloadTable) {
        params.setReloadTable();
      }
      router.push("/task");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center bg-gradient-to-r from-purple-500 to-purple-600  hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
      >
        {params.buttonName}
      </button>
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-12 pb-1">
          <h1 className="text-2xl uppercase text-purple-800">Create Task</h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <SelectBoxInputField
                  label="Staff Name"
                  value={staffid}
                  options={staffOptionValues}
                  onSelect={(e) => setStaffid(e.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <TextInputField
                  label="Client Name"
                  id="clientname"
                  name="clientname"
                  autoComplete=""
                  placeholder="Client Name"
                  value={clientname}
                  onChange={(e) => setClientname(e.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <SelectBoxInputField
                  label="Category"
                  value={categoryid}
                  options={categoryOptionValues}
                  onSelect={(e) => categoryOnSelect(e)}
                />
              </div>
              <h1
                className="text-purple-800 font-semiboldd hover:font-bold cursor-pointer mb-4"
                onClick={showCategoryDeatils}
              >
                {showCatDetails ? "Show Less" : "Show More"}
              </h1>
              <div
                className={
                  showCatDetails
                    ? "grid grid-cols-2 gap-4 content-start w-full  px-3"
                    : "flex hidden"
                }
              >
                {fetchedCategoryDetailsData.map(
                  (data: CategoryDetailObj, index) => (
                    <input
                      key={data.categorydetailid}
                      type="text"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      value={data.categorydetailname}
                    />
                  )
                )}
              </div>
              <div className="-mx-3 flex flex-wrap px-3">
                <div className="w-full px-3 sm:w-3/4">
                  <TextInputField
                    label="Location"
                    id="location"
                    name="location"
                    autoComplete=""
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 sm:w-1/4">
                  <IntegerInputField
                    label="No. of visits"
                    id="visitcount"
                    name="visitcount"
                    autoComplete=""
                    placeholder="1-10"
                    value={visitcount}
                    onChange={(e) => setVisitcount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mr-3">
                <button
                  onClick={submitButtonHandler}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Cancel
                </button>
              </div>

              <div
                className={
                  showDelButton ? "flex ml-auto" : "flex ml-auto hidden"
                }
              >
                <ConfirmAlertbox
                  buttonName="Delete"
                  leftButtonAction={deleteAction}
                  title="Are you sure?"
                  description="Do you want to delete this record ?"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TaskAddNew;
