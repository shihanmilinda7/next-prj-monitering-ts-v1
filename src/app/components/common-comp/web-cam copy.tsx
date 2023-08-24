"use client"

import { uploadFiles } from '@/app/utils/uploadthing';
import { useState, useEffect, useRef } from 'react';
import { CategoryDetailObj } from '../category/types';

// type taskPhotoObjTypes = {
//     taskphotoid?: number;
//     photodataurl:string;
// }


const WebcamComponent = ({ taskDetails, taskid, pathname, taskphotoid, photodataurl,setReloadPage }: { taskDetails: CategoryDetailObj, taskid: number, pathname: string, taskphotoid: number, photodataurl: string,setReloadPage: ()=> void }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [showDelButton, setShowDelButton] = useState(false);

    // const [taskPhoto, setTaskPhoto] = useState<taskPhotoObjTypes>();
    const format = 'image/jpeg'
    useEffect(() => {
        console.log("taskphotoid", taskphotoid,)
        if (photodataurl) {
            setCapturedImage(photodataurl);
            setShowDelButton(true);
        }
    }, [taskphotoid]);


    const cameraOnButtonClick = () => {
        // const constraints: MediaStreamConstraints = { video: true };
        const constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraActive(true);
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject as MediaStream;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }
        };
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const capturedDataURL = canvasRef.current.toDataURL('image/png');
                setCapturedImage(capturedDataURL);
                setCameraActive(false);
            }
        }
    };


    // const uploadImg = async () => {
    //     const dataBlob: Blob | null = await new Promise<Blob | null>(
    //         (resolve) => canvasRef.current?.toBlob(
    //             (blob) => resolve(blob),
    //             "image/png",
    //         ));

    //     if (dataBlob) {
    //         console.log("nnnnnnn1111nnnnssnnnnnnn",)
    //         const file = new File([dataBlob], "image.png");

    //        await uploadSomeFiles(file)
    //         //dload
    //         // const element = document.createElement("a");
    //         // element.href = URL.createObjectURL(file);
    //         // element.download = "myFile.png";
    //         // document.body.appendChild(element); // Required for this to work in FireFox
    //         // element.click();

    //         return null ;
    //     } else {
    //         return null
    //     }
    // };
    const uploadImg = async () => {
        const capturedDataURL = canvasRef.current?.toDataURL(format);
        const tmpCategoryId = taskDetails.categoryid;
        const tmpCategoryDetailId = taskDetails.categorydetailid;


        console.log("taskDetails", taskDetails,)

        //call for end point
        const response = await fetch(
            pathname + "/api/task/upload_photos",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskid, tmpCategoryId, tmpCategoryDetailId, capturedDataURL, taskphotoid }),
            }
        );

        const res = await response.json();
        console.log(res);

        if (res == "SUCCESS") {
            // if (params.setReloadTable) {
            //   params.setReloadTable();
            // }
            // // window.location.href = "/staff"
            // router.push("/staff");
        } else { }








        // console.log("capturedDataURL",capturedDataURL,)
        // if (capturedDataURL) {
        //     // Create a Blob from the data URL
        //     const blob = new Blob([atob(capturedDataURL.split(',')[1])], { type: format });

        //     // Create a File instance from the Blob
        //     const file = new File([blob], 'captured-image.jpeg', { type: format });
        //     // await uploadSomeFiles(file)
        //     const element = document.createElement("a");
        //     element.href = URL.createObjectURL(file);
        //     element.download = "myFile.jpeg";
        //     document.body.appendChild(element); // Required for this to work in FireFox
        //     element.click();
        // }

    };

    // const deleteImg = async () => {
    //     const res_del_cat = await fetch(
    //         "api/category",
    //         {
    //             method: "DELETE",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ categoryid, categoryValues }),
    //         }
    //     ); 
    // }


    // // const uploadSomeFiles = async (file: File) => {
    //     const files = [
    //         file,
    //     ];

    //     const res = await uploadFiles({
    //         files,
    //         endpoint: "imageUploader",
    //         //   input: {input:"imageUploader"}, // will be typesafe to match the input set for `imageUploader` in your FileRouter
    //     });
    // }

    return (
        <div>
            {/* <img src={photodataurl} alt="Captured" /> */}
            <div className={!cameraActive ? "flex ml-auto" : "flex ml-auto hidden"}>
                <button onClick={cameraOnButtonClick}
                    className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                    {capturedImage ? "Capture Again" : "Capture"}
                </button>
            </div>
            <div>
                <div className={cameraActive ? "flex flex-col ml-auto" : "flex ml-auto hidden"}>
                    <video ref={videoRef} autoPlay playsInline />
                    <button onClick={captureImage}
                        className="mt-3 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-indigo-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                        Capture
                    </button>
                </div>
                {capturedImage && !cameraActive && (
                    <div className="mt-3 ">
                        <img src={capturedImage} alt="Captured" />
                    </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className='flex'>
                {capturedImage && !cameraActive && (
                    <div className={!cameraActive ? "w-full flex ml-auto" : "flex ml-auto hidden"}>
                        <button onClick={uploadImg}
                            className="mt-3 w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Upload
                        </button>
                    </div>
                )}
                {showDelButton && (
                    <div className={!cameraActive ? "ml-4 w-full flex ml-auto" : "flex ml-auto hidden"}>
                        <button onClick={uploadImg}
                            className="mt-3 w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default WebcamComponent;
