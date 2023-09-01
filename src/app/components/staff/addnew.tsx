"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import TextInputField from "../common-comp/input-fields/text-input-fields";
import { StaffObj } from "./types";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";
import { useRouter } from "next/navigation";
import Toast from "../common-comp/toast";
import { toast } from "react-toastify";
import SelectBoxInputField from "../common-comp/input-fields/select-input-field";
import { inputFieldValidation } from "@/app/utils/utils";

type ParamTypes = {
  buttonName: string;
  selRowData?: StaffObj;
  delButton?: boolean;
  setReloadTable?: () => void;
  showAddnewAlert?: () => void;
};

const StaffAddNew = (params: ParamTypes) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [staffid, setStaffid] = useState(params.selRowData?.staffid ?? "");
  const [staffname, setStaffname] = useState(
    params.selRowData?.staffname ?? ""
  );
  const [username, setUsername] = useState(params.selRowData?.username ?? "");
  const [contracttype, setContracttype] = useState(
    params.selRowData?.contracttype ?? ""
  );
  const [contactno, setContactno] = useState(
    params.selRowData?.contactno ?? ""
  );
  const [designation, setDesignation] = useState(
    params.selRowData?.designation ?? ""
  );
  const [nic, setNic] = useState(params.selRowData?.nic ?? "");
  const [password, setPassword] = useState(params.selRowData?.password ?? "");
  const [role, setRole] = useState(params.selRowData?.role ?? "");
  const [confirmpassword, setConfirmpassword] = useState(
    params.selRowData?.password ?? ""
  );
  const [userid, setUserid] = useState(params.selRowData?.userid ?? "");

  const [showDelButton, setShowDelButton] = useState(params.delButton);

  const [successfulToast, setSuccessfulToast] = useState(false);
  const closeButtonAction = () => {
    setSuccessfulToast(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
  };

  const roleOptionValues = [
    { value: "", name: "Select role" },
    { value: "Admin", name: "Admin" },
    { value: "Manager", name: "Manager" },
    { value: "User", name: "User" },
  ];

  const contractTypeOptionValues = [
    { value: "", name: "Select Contract Type" },
    { value: "Training", name: "Training" },
    { value: "Probation", name: "Probation" },
    { value: "Permanent", name: "Permanent" },
    { value: "Contract", name: "Contract" },
    { value: "Assigment", name: "Assigment" },
    { value: "Casual", name: "Casual" },
  ];

  const designationOptionValues = [
    { value: "", name: "Select Designation" },
    { value: "Software Engineer", name: "Software Engineer" },
    { value: "Front-End Developer", name: "Front-End Developer" },
    { value: "Back-End Developer", name: "Back-End Developer" },
    { value: "Full-Stack Developer", name: "Full-Stack Developer" },
    { value: "Software Architect", name: "Software Architect" },
    { value: "Lead Developer", name: "Lead Developer" },
    { value: "DevOps Engineer", name: "DevOps Engineer" },
    {
      value: "Quality Assurance (QA) Engineer",
      name: "Quality Assurance (QA) Engineer",
    },
    { value: "Product Manager", name: "Product Manager" },
    { value: "UI/UX Designer", name: "UI/UX Designer" },
    { value: "Data Engineer", name: "Data Engineer" },
    { value: "Security Engineer ", name: "Security Engineer " },
  ];

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (staffid) {
      update();
    } else {
      addnew();
    }
  };

  const usernameValidation = async (
    username: string,
    staffid?: number | string
  ) => {
    console.log("staffid", staffid);
    // staffid
    const reponse = await fetch(
      "api/staff/username-validation?username=" +
        username +
        "&staffid=" +
        staffid
    );
    const res = await reponse.json();
    return res.message;
  };

  //add new staff action
  const addnew = async () => {
    const validation = inputFieldValidation({
      staffname,
      contracttype,
      contactno,
      nic,
      password,
      username,
      role,
      designation,
    });
    console.log("call addnew");
    try {
      //check input field empty or not
      if (validation == 0) {
        //password validation
        if (password != confirmpassword) {
          toast.info("Password does not match!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          //username validation
          const tmpUsernameValidation = await usernameValidation(username, 0);
          if (tmpUsernameValidation != "FAIL") {
            toast.info("Username already exists!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            //api call
            const responseNewStaff = await fetch("api/staff", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                staffname,
                contracttype,
                contactno,
                nic,
                password,
                username,
                role,
                designation,
              }),
            });
            const res = await responseNewStaff.json();

            if (res == "SUCCESS") {
              setIsOpen(false);
              if (params.setReloadTable) {
                params.setReloadTable();
              }
              toast.success("Staff created successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          }
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
  //update staff action
  const update = async () => {
    const validation = inputFieldValidation({
      staffname,
      contracttype,
      contactno,
      nic,
      password,
      username,
      role,
      designation,
    });

    try {
      //check input field empty or not
      if (validation == 0) {
        //password validation
        if (password != confirmpassword) {
          toast.info("Password does not match!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          //username validation
          const tmpUsernameValidation = await usernameValidation(
            username,
            staffid
          );
          if (tmpUsernameValidation != "FAIL") {
            toast.info("Username already exists!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            //api call
            const responseUpdateStaff = await fetch("api/staff", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userid,
                staffid,
                staffname,
                contracttype,
                contactno,
                nic,
                password,
                username,
                role,
                designation,
              }),
            });
            const res = await responseUpdateStaff.json();

            if (res == "SUCCESS") {
              setIsOpen(false);
              if (params.setReloadTable) {
                params.setReloadTable();
              }
              toast.success("Staff created successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          }
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

  const deleteAction = async () => {
    if (staffid) {
      const responseDelStaff = await fetch("api/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffid, userid }),
      });

      const res = await responseDelStaff.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        toast.success("Staff deleted successfully!", {
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
      // window.location.href = "/staff"
      if (params.setReloadTable) {
        params.setReloadTable();
      }
      router.push("/staff");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
      >
        {params.buttonName}
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-12">
          <h1 className="text-2xl uppercase text-indigo-800">
            {!staffid ? "Add New Staff Member" : "Edit Staff Member"}
          </h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Name"
                  id="staffname"
                  name="staffname"
                  autoComplete=""
                  placeholder="Name"
                  value={staffname}
                  onChange={(e) => setStaffname(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <SelectBoxInputField
                  label="Contract Type"
                  value={contracttype}
                  options={contractTypeOptionValues}
                  onSelect={(e) => setContracttype(e.target.value)}
                />
                {/* <TextInputField
                  label="Contract Type"
                  id="contracttype"
                  name="contracttype"
                  autoComplete=""
                  placeholder="Contract Type"
                  value={contracttype}
                  onChange={(e) => setContracttype(e.target.value)}
                /> */}
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Username"
                  id="username"
                  name="username"
                  autoComplete=""
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <SelectBoxInputField
                  label="Role"
                  value={role}
                  options={roleOptionValues}
                  onSelect={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <SelectBoxInputField
                  label="Designation"
                  value={designation}
                  options={designationOptionValues}
                  onSelect={(e) => setDesignation(e.target.value)}
                />
                {/* <TextInputField
                  label="Designation"
                  id="designation"
                  name="designation"
                  autoComplete=""
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                /> */}
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Contact No"
                  id="contactno"
                  name="contactno"
                  autoComplete=""
                  placeholder="Contact No"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="NIC"
                  id="nic"
                  name="nic"
                  autoComplete=""
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Password"
                  id="password"
                  name="password"
                  autoComplete=""
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Confirm Password"
                  id="confirmpassword"
                  name="confirmpassword"
                  autoComplete=""
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
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
          {successfulToast && (
            <Toast
              title="Succes"
              description="Staff Created successfully!"
              buttonColour="bg-green-600 dark:bg-green-700"
              closeButtonAction={closeButtonAction}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
export default StaffAddNew;
