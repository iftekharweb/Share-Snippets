"use client";
import { FaShareAlt } from "react-icons/fa";

export default function Footer() {
    return <footer className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex justify-center text-teal-600 sm:justify-start">
          <FaShareAlt className="text-2xl" /> <span className="pl-1">ShareSnippets</span>
        </div>
  
        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
}