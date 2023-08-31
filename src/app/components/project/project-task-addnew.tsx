"use client";

import Modal from "react-modal";

import { useState } from "react";
import TextInputField from "../common-comp/input-fields/text-input-fields";
import DateInputField from "../common-comp/input-fields/date-input-fields";
import { TaskObjectTypes } from "./types";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";
import { inputFieldValidation } from "@/app/utils/utils";

const NewProjectTask = ({
  arrayUpdateFuntion,
  selRowObject,
  index,
  buttonName,
  delButton,
}: {
  arrayUpdateFuntion: (
    taskObject?: TaskObjectTypes,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => void;
  selRowObject?: TaskObjectTypes;
  index?: number;
  buttonName: string;
  delButton?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [taskid, setTaskid] = useState(selRowObject?.taskid ?? "");
  const [taskname, setTaskname] = useState(selRowObject?.taskname ?? "");
  const [taskdescription, setTaskdescription] = useState(
    selRowObject?.taskdescription ?? ""
  );
  const [startdate, setStartdate] = useState(selRowObject?.startdate ?? "");
  const [enddate, setEnddate] = useState(selRowObject?.enddate ?? "");

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
    },
  };

  const addnewOrupdate = () => {
    const validation = inputFieldValidation({
      taskname,
      taskdescription,
      startdate,
      enddate,
    });
    if (validation == 0) {
      // setIsOpen(false);
      arrayUpdateFuntion(
        { taskname, taskdescription, startdate, enddate },
        index
      );
    }

    // setLabel("");
    // setType("")
  };

  const deleteAction = () => {
    setIsOpen(false);
    const deleteTask: boolean | undefined = true;
    if (!taskid) {
      console.log("no task id");
      arrayUpdateFuntion({}, index, { deleteTask });
    } else {
      console.log("taskid", taskid);
      const deltaskid: any = taskid;
      arrayUpdateFuntion({}, index, { deleteTask, deltaskid });
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
      >
        {buttonName}
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-12 pb-1">
          <h1 className="text-2xl uppercase text-indigo-800">{buttonName}</h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <TextInputField
                  label="Task Name"
                  id="taskname"
                  name="taskname"
                  autoComplete=""
                  placeholder="Task Name"
                  value={taskname}
                  onChange={(e) => setTaskname(e.target.value)}
                />
                <TextInputField
                  label="Task Description"
                  id="taskdescription"
                  name="taskdescription"
                  autoComplete=""
                  placeholder="Task Description"
                  value={taskdescription}
                  onChange={(e) => setTaskdescription(e.target.value)}
                />
                <DateInputField
                  label="Start Date"
                  id="startdate"
                  name="startdate"
                  autoComplete=""
                  placeholder="Start Date"
                  value={startdate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
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
            </div>
            <div className="flex items-center justify-center">
              <div className="mr-3">
                <button
                  onClick={addnewOrupdate}
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
                className={delButton ? "flex ml-auto" : "flex ml-auto hidden"}
              >
                <ConfirmAlertbox
                  buttonName="Delete"
                  leftButtonAction={deleteAction}
                  title="Are you sure?"
                  description="Do you want to delete this record ?"
                  buttonColour="bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-l hover:from-red-500 hover:to-red-600 ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NewProjectTask;
