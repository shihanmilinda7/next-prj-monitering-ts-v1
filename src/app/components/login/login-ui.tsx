"use client";

import { useGlobalContext } from "@/app/globalContext/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ApiResult } from "@/app/types";
import { UserType } from "../staff/types";
import Toast from "../common-comp/toast";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaKey, FaUser } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const { userId, setUserId, data, setData } = useGlobalContext();

  const router = useRouter();

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (response?.error) {
        toast.error("Username or Password Incorrect!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("System error please reload!", error);
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // const user_login = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });

    // const res = await user_login.json() as ApiResult;

    // if (res.message == "SUCCESS") {
    //   const tmpUser = res.data[0] as UserType;
    //   setIsLoggedIn(true)
    //   setUserId(tmpUser.userid ?? 0);
    //   setData([
    //     { staffid: tmpUser?.staffid, username: tmpUser?.username },
    //   ]);
    //   router.push('/dashboard')
    //   toast.success('Logged in successfully!', {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     });
    // } else {
    //   toast.error('Username or Password Incorrect!', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     }); RiLockPasswordFill
    // }
    // return res;
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-purple-600 to-purple-500 opacity-75 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-2xl xl:text-5xl font-bold leading-tight mb-6">
              Next Generation Project Monitering{" "}
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              {" "}
              "The Project Monitoring Web App is a powerful tool designed to
              streamline and enhance the process of overseeing and managing
              projects. It provides real-time visibility into project progress,
              performance, and key metrics, enabling project managers and
              stakeholders to make informed decisions and take timely actions.
              The web app offers a user-friendly interface and a range of
              features to facilitate efficient project monitoring."
            </div>
          </div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold italic text-purple-700">
                ProTrack
              </h2>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcom Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please sign in to your account
              </p>
            </div>
            <div className="mt-8 space-y-6 z-50">
              <div className="relative z-50">
                <div className="relative z-50">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Username
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 pr-2">
                      <FaUser className="inline-block h-5 w-5" />
                    </span>
                    <input
                      className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-purple-500"
                      value={username}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete=""
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-8 content-center z-50">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 pr-2">
                      <FaKey className="inline-block h-5 w-5" />
                    </span>
                    <input
                      className="z-50 w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-purple-500"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-10 mb-8">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-purple-400 hover:text-purple-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="z-0">
                  <button
                    type="button"
                    onClick={login}
                    className="z-50 w-full flex justify-center bg-gradient-to-r from-purple-500 to-purple-600  hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                  {/* {showToast && (
                  < Toast title="Wraning" description="Incorrect Username or Password!" buttonColour="bg-red-600 dark:bg-red-700" closeButtonAction={closeButtonAction}/>)} */}
                </div>
              </div>
              <div className="z-0">
                <ul className="circles1">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
