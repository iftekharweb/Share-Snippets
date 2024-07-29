"use client";
import { FaShareAlt } from "react-icons/fa";
import { useStateContext } from "@/contexts";
import { useCallback, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";

import * as actions from "@/actions";

export default function Header() {
  const { authToken, authEmail, authName, handleLogOut} = useStateContext();

  const handleLogin = () => {
    actions.goToLoginPage();
  };

  const handleRegister = () => {
    actions.goToRegisterPage();
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <button
              className="block text-teal-600"
              onClick={() => actions.goToHomePage()}
            >
              <span className="sr-only">Home</span>
              <span>
                <FaShareAlt className="text-2xl" />
              </span>
            </button>
          </div>

          {authToken !== "" && (
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-7 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      {" "}
                      My snippets{" "}
                    </a>
                  </li>

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => actions.goToCreatePage()}
                    >
                      {" "}
                      Create snippet{" "}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          {authToken === "" ? (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  className="rounded-md bg-teal-600 hover:bg-teal-700 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={handleLogin}
                >
                  Login
                </button>

                <div className="hidden sm:flex">
                  <button
                    className="rounded-md bg-gray-100 hover:bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-600"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <div className="rounded-md shadow-sm px-2 py-1 bg-gray-100">
                <p className="text-sm font-mono text-gray-400 font-semibold">
                  Hi, {authName}
                </p>
              </div>
                <button className="rounded-lg" onClick={handleLogOut}>
                  <IoMdLogOut className="text-2xl font-bold hover:text-red-500"/>
                </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
