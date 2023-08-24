"use client";

import { useGlobalContext } from "@/app/globalContext/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ApiResult } from "@/app/types";
import { UserType } from "../staff/types";
import Toast from "../common-comp/toast";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";


const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
        toast.error('Username or Password Incorrect!', {
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
      toast.success('Logged in successfully!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push('/dashboard')
    } catch (error) {
      console.log("System error please reload!", error,)
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
    //     });
    // }
    // return res;
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Next Generation Task Monitering </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> "Discover streamlined productivity with NextTask - the ultimate task management solution. Effortlessly create, prioritize, and collaborate on tasks. Never miss a deadline again, stay organized, and achieve your goals with ease. Join the productivity revolution - sign up for NextTask today."</div>
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
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcom Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
            </div>
            <div className="mt-8 space-y-6" >
              <div className="relative">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Username</label>
                <input
                  className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  value={username}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete=""
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-indigo-400 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={login}
                  className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                  Sign in
                </button>
                {/* {showToast && (
                  < Toast title="Wraning" description="Incorrect Username or Password!" buttonColour="bg-red-600 dark:bg-red-700" closeButtonAction={closeButtonAction}/>)} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;