"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const currentRoute = usePathname();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  console.log("userRole", userRole);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const button = document.querySelector(
      "#menu-button"
    ) as HTMLButtonElement | null;
    const menu = document.querySelector("#menu") as HTMLElement | null;

    if (button && menu) {
      const clickHandler = () => {
        menu.classList.toggle("hidden");
      };

      button.addEventListener("click", clickHandler);

      // Clean up the event listener when the component unmounts
      return () => {
        button.removeEventListener("click", clickHandler);
      };
    }
  }, []);

  // styles for all links
  const commonStyles =
    "text-xl md:p-4 py-2 block hover:text-indigo-900 text-white";
  const activeStyle =
    // commonStyles + " rounded-t-lg bg-indigo-500 text-indigo-900";
    commonStyles + " overline";
  const nonActiveStyle = commonStyles + " text-white";

  //style for dropdown
  const dropCommonStyle =
    "hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ";
  const dropActiveStyle = dropCommonStyle + "bg-indigo-400";
  const dropNonActiveStyle = dropCommonStyle + "bg-indigo-300";
  return (
    <header>
      <nav
        className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-gradient-to-b from-indigo-600 to-blue-500
        "
      >
        <div>
          <a href="#">
            <h1 className="text-4xl text-red-100 italic">CeyInfo  Solutions</h1>
          </a>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li>
              <Link
                href="/dashboard"
                className={
                  currentRoute === "/dashboard" ? activeStyle : nonActiveStyle
                }
              >
                Dashboard
              </Link>
            </li>
            <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/staff"
                className={
                  currentRoute === "/staff" ? activeStyle : nonActiveStyle
                }
              >
                Staff
              </Link>
            </li>
            {/* <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/project"
                className={
                  currentRoute === "/project" ? activeStyle : nonActiveStyle
                }
              >
                Project
              </Link>
            </li> */}
            <div className={userRole == "admin" ? "dropdown inline-block relative rounded-lg z-50" : "hidden"}>
              <button className={nonActiveStyle + " inline-flex"}>
                <span className="mr-1">Project</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className={userRole == "admin" ? "" : "hidden"}>
                  <Link
                    href="/project/new-project"
                    className={
                      currentRoute === "/project/new-project"
                        ? dropActiveStyle
                        : dropNonActiveStyle
                    }
                  >
                    New Project
                  </Link>
                </li>
                <li className={userRole == "admin" ? "" : "hidden"}>
                  <Link
                    href="/project"
                    className={
                      currentRoute === "/project"
                        ? dropActiveStyle
                        : dropNonActiveStyle
                    }
                  >
                    Project Details
                  </Link>
                </li>
                <li className={userRole == "admin" ? "" : "hidden"}>
                  <Link
                    href="/project-assign"
                    className={
                      currentRoute === "/project-assign"
                        ? dropActiveStyle
                        : dropNonActiveStyle
                    }
                  >
                    Project Assign
                  </Link>
                </li>
              </ul>
            </div>
            <li className={(userRole == "admin" || userRole == "user") ? "" : "hidden"}>
              <Link
                href="/time-allocation"
                className={
                  currentRoute === "/time-allocation" ? activeStyle : nonActiveStyle
                }
              >
                Daily Achievements
              </Link>
            </li>
            {/* <li className={userRole == 'admin' ? "" : "hidden"}><Link href="/category" className={currentRoute === '/category' ? activeStyle : nonActiveStyle}>Category</Link></li> */}
            {/* <li className={userRole == 'admin' ? "" : "hidden"}><Link href="/task" className={currentRoute === '/task' ? activeStyle : nonActiveStyle}>Task</Link></li> */}
            {/* <li className={userRole == 'admin' ? "" : "hidden"}><Link href="/" className={currentRoute === '/' ? activeStyle : nonActiveStyle}>Report</Link></li> */}
            <button onClick={handleSignOut} className={commonStyles}>
              Logout
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
