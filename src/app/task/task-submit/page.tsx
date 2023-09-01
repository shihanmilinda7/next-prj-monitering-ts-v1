"use client";

import { CategoryDetailObj } from "@/app/components/category/types";
import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
import WebcamComponent from "@/app/components/common-comp/web-cam";
import { WithRole } from "@/app/components/common-comp/withRole";
import Navbar from "@/app/components/navbar/navbar";
import Spinner from "@/app/dashboard/loading";
import { ApiResult } from "@/app/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type taskPhotoObjTypes = {
  taskphotoid?: number;
  taskid?: number;
  categoryid?: number;
  categorydetailid?: number;
  photodataurl?: string;
};

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

  const searchParams = useSearchParams();
  const taskid = searchParams.get("taskid");
  const clientname = searchParams.get("clientname");
  const location = searchParams.get("location");
  const categoryid = searchParams.get("categoryid");
  const categoryname = searchParams.get("categoryname");

  let taskidInt: number;
  if (taskid) {
    taskidInt = parseInt(taskid);
  }

  const [fetchedCategoryDetailsData, setFetchedCategoryDetailsData] = useState<
    CategoryDetailObj[]
  >([]);
  const [taskPhotos, setTaskPhotos] = useState<taskPhotoObjTypes[]>([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [endTaskButton, setEndTaskButton] = useState(false);

  //page reload
  const toggleReloadPage = () => {
    setReloadPage((prv: boolean) => !prv);
  };

  // //get category detials as task
  // const getCategoryDetails = async () => {
  //   const fetchData = async () => {
  //     const all_cat_details = await fetch(
  //       pathname + "/api/category/get_cat_as_catid?categoryid=" + categoryid,
  //     );
  //     const res = await all_cat_details.json();
  //     setFetchedCategoryDetailsData(res.categoriesData);
  //     // console.log("getCategoryDetails - ",res.categoriesData.length)
  //     // setStaffid(selRowData?.staffid ?? "");
  //   };
  //   // call the function
  //   fetchData().catch(console.error);
  // }

  // //get task photo detials as task
  // const getTaskPhotoDetails = async () => {
  //   const fetchData = async () => {
  //     const taskPhotos = await fetch(
  //       pathname + "/api/task/upload_photos?taskid=" + taskid,
  //     );
  //     const res = await taskPhotos.json();
  //     // console.log("gggggggggggggggggg-----------", res.taskPhotos);
  //     setTaskPhotos(res.taskPhotos);
  //     // console.log("getTaskPhotoDetails - ",res.taskPhotos.length)

  //   };
  //   fetchData().catch(console.error);
  // }

  const endTaskClickEvent = async () => {
    const res_update_task = await fetch(
      pathname + "/api/task/get_task_as_staffid",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskid }),
      }
    );

    const res = await res_update_task.json();

    if (res == "SUCCESS") {
      toast.success("Task completed successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/dashboard");
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
  };

  useEffect(() => {
    fetch(pathname + "/api/category/get_cat_as_catid?categoryid=" + categoryid)
      .then((res) => res.json())
      .then(
        (resJson: { message: string; categoriesData: CategoryDetailObj[] }) => {
          // setFetchedCategoryDetailsData((p)=> [...p,...resJson.categoriesData]);
          setFetchedCategoryDetailsData(resJson.categoriesData);
          fetch(pathname + "/api/task/upload_photos?taskid=" + taskid)
            .then((res) => res.json())
            .then(
              (resJson: {
                message: string;
                taskPhotos: taskPhotoObjTypes[];
              }) => {
                // setTaskPhotos((t)=> [...t,...resJson.taskPhotos]);
                setTaskPhotos(resJson.taskPhotos);
              }
            );
        }
      );
  }, [reloadPage]);

  useEffect(() => {
    if (fetchedCategoryDetailsData.length == taskPhotos.length) {
      setEndTaskButton(true);
    } else {
      setEndTaskButton(false);
    }
  }, [fetchedCategoryDetailsData, taskPhotos]);

  return (
    <WithRole roles={["admin", "user"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <h1 className="text-xl md:text-2xl lg:text-base xl:text-4xl   uppercase text-purple-600 mr-auto">
            Task Submission
          </h1>
        </div>
        <div className="flex flex-wrap pt-4">
          <div className="ml-5 mr-5 w-full border-b-2 border-t-2 cursor-pointer border-purple-700">
            {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            Prev
          </button> */}
            <h5 className="font-semibold text-xl md:text-xl lg:text-base xl:text-2xl text-blueGray-700">
              {clientname} - {location}
            </h5>
            <h5 className="font-semibold text-sm md:text-sm lg:text-base xl:text-xl text-blueGray-700">
              Category: {categoryname}
            </h5>
          </div>
          <div></div>
        </div>
        <div className="flex flex-wrap pt-4">
          {fetchedCategoryDetailsData.map((task, index) => {
            const taskPhotoObject = taskPhotos.find(
              (p: taskPhotoObjTypes) =>
                p.categorydetailid == task.categorydetailid
            );
            // console.log("taskPhotoObject",taskPhotoObject?.taskphotoid)
            return (
              <div
                key={task.categorydetailid}
                className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4"
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xl mb-3">
                          {task.categorydetailname}
                        </h5>
                        <WebcamComponent
                          taskDetails={task}
                          taskid={taskidInt}
                          pathname={pathname}
                          taskphotoid={taskPhotoObject?.taskphotoid ?? 0}
                          photodataurl={taskPhotoObject?.photodataurl ?? ""}
                          setReloadPage={toggleReloadPage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {endTaskButton && (
          <div className="flex items-center justify-center">
            <ConfirmAlertbox
              buttonName="End Task"
              leftButtonAction={endTaskClickEvent}
              title="Are you sure?"
              description="Do you want to end task ?"
              buttonColour="bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600"
            />
          </div>
        )}

        {/* <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
      </div>
    </WithRole>
  );
}
